(function(CommonViews) {
	CommonViews.AudioManager = Backbone.View.extend({
		/**
		 * Audio Context
		 * @property audioContext
		 * @type object
		 */		
		audioContext:null,
		audioRecorder:null,
		inputPoint:null,
		realAudioInput:null,
		audioInput:null,		
    /**
     * Initialize function of view.
     * @method initialize
     * @constructor
     */
    'initialize' : function initialize() {
			this.render();
    },
    /**
     * Renders the view of Audio Manager
     * @method render
     * @public
     **/
    'render' : function render() {
    	this._initAudio();    	
      return this;
    },
    _initAudio: function _initAudio() {
        this._createAudioTags();
        this._initRecording();
    },
    _createAudioTags: function _createAudioTags() {
        var audioData = this.model.get('audioData'),
            audioId = audioData.id,
            audioSrc = audioData.src;
        if ($('#' + audioId).length !== 0) {
            $('#' + audioId).remove();
        }
        $('body').append('<audio id=' + audioId + '></audio>');
        $('#' + audioId).append('<source src=' + audioSrc + '.mp3 type="audio/mpeg"></source>');
        $('#' + audioId).attr('src', audioSrc + '.mp3').attr('type', 'audio/mpeg').attr('codecs', 'mp3');

        this.$audio = $('#' + audioId);
    },
    /**
     * Initialize Recording
     * @method _initRecording
     * @constructor
     */    
    '_initRecording': function _initRecording() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;
	    navigator.getUserMedia(
	        {
	            "audio": {
	                "mandatory": {
	                    "googEchoCancellation": "false",
	                    "googAutoGainControl": "false",
	                    "googNoiseSuppression": "false",
	                    "googHighpassFilter": "false"
	                },
	                "optional": []
	            },
	        }, this._createAudioNode, function(e) {
	            alert('Error getting audio');
	        });			
		}, 
		'_createAudioNode':function _createAudioNode(stream){
			this.audioContext = new AudioContext();					
			var self=this,
					zeroGain=null,
					analyserNode=null,
					audioContext=this.audioContext;
					
	    self.inputPoint = audioContext.createGain();	
	    // Create an AudioNode from the stream.
	    self.realAudioInput = audioContext.createMediaStreamSource(stream);
	    self.audioInput = self.realAudioInput;
	    self.audioInput.connect(inputPoint);
		
	    analyserNode = audioContext.createAnalyser();
	    analyserNode.fftSize = 2048;
	    self.inputPoint.connect( analyserNode );
	
	    self.audioRecorder = new Recorder( inputPoint );	
	    zeroGain = audioContext.createGain();
	    zeroGain.gain.value = 0.0;
	    self.inputPoint.connect( zeroGain );
	    zeroGain.connect( audioContext.destination );			
		} ,      
	  /**
	   * Play required Audio
	   * @method playAudio
	   * @public
	   **/    
    'playAudio':function playAudio(audioId){
    		var $audio=this.$('#'+audioId);
    		$audio.play();
    		this.model.setCurrentPlayingAudio(audioId);
    		$audio.removeEventListener('timeupdate').addEventListener('timeupdate', _onTimeUpdate, false);
    },
    '_onTimeUpdate':function _onTimeUpdate(){
    	this.trigger(AudioManager.EVENTS.TIME_UPDATE_EVENT,this.currentTime);
    },
	  /**
	   * Pause Current Playing Audio
	   * @method pauseAudio
	   * @public
	   **/    
    'pauseAudio':function pauseAudio(){
    	var audioId=this.model.getCurrentPlayingAudio();
    		this.$('#'+audioId).pause();
    },  
	  /**
	   * Stop Current Playing Audio
	   * @method stopAudio
	   * @public
	   **/        
    'stopAudio':function stopAudio(){
    	var audioId=this.model.getCurrentPlayingAudio(),
    			$audio=this.$('#'+audioId);
    	$audio.stop();
    	$audio.removeEventListener('timeupdate');
    } ,
	  /**
	   * Record Sound 
	   * @method recordSound
	   * @public
	   **/      
    'recordSound':function recordSound(){
    	var self=this;
	    if (!self.model.getIsRecording()) {
	        // start recording
	        if (!audioRecorder){
	            return;
	           }
	        self.model.setIsRecording(true);
	        self.audioRecorder.clear();
	        self.audioRecorder.record();
	    }    	
    },
    'stopRecord':function stopRecord(){
    	var self=this;    	
	    if (self.model.getIsRecording()) {
	        // stop recording
	        self.audioRecorder.stop();
	        self.model.setIsRecording(false);
	        self.audioRecorder.getBuffers( self._gotBuffers );
	    }     	
    },
	  /**
	   * Got Buffers setups up for download
	   * @method _gotBuffers
	   * @private
	   **/     
		'_gotBuffers':function _gotBuffers( buffers ) {
	    // the ONLY time _gotBuffers is called is right after a new recording is completed - 
	    // so here's where we should set up the download.
	    audioRecorder.exportWAV( doneEncoding );
		},
	  /**
	   * Sets the source file and setup downloading
	   * @method _doneEncoding
	   * @private
	   **/  		
		'_doneEncoding':function _doneEncoding( blob ) {
			this.model.setRecordedAudio(blob);
			var url = (window.URL || window.webkitURL).createObjectURL(blob);
		  	  audio = document.getElementById("audio");	
			audio.src=url;
			Recorder.setupDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
		  recIndex++;
		}  
	},{
		EVENTS:{
			TIME_UPDATE_EVENT:'time-update-event'
		}
	});
})(ImagineLearning.Common.Views);
