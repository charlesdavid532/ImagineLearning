(function (Common) {
    Common.Views.AudioManager = Backbone.View.extend({
    /**
     * Initialize function of view.
     * @method initialize
     * @constructor
     */
    'initialize' : function initialize() {
    },
    /**
     * Renders the view of Audio Manager
     * @method render
     * @public
     **/
    'render' : function render() {
			this._loadTemplate();
      return this;
    },
    '_loadTemplate':function _loadTemplate(){
    	return this;
    },
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
    'stopAudio':function stopAudio(){
    	var audioId=this.model.getCurrentPlayingAudio(),
    			$audio=this.$('#'+audioId);
    	$audio.stop();
    	$audio.removeEventListener('timeupdate');
    } ,
    'recordSound':function recordSound(){
    	
    }  
	},{
		EVENTS:{
			TIME_UPDATE_EVENT:'time-update-event'
		}
	});
})(ImagineLearning.Common);
