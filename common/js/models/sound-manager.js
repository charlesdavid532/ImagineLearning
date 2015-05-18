(function() {
	AudioManager = Backbone.Model.extend({
		defaults : function() {
			return {
				/**
				 * Sound id of current playing audio
				 * @property currentPlayingAudio
				 * @type String
				 */
				currentPlayingAudio : null,
				/**
				 * Audio Data stores sound objects
				 * @property audioData
				 * @type array
				 */
				audioData : null,
				/**
				 * Stores audio path
				 * @property audioPath
				 * @type String
				 */
				audioPath : null,
				/**
				 * Stores Recorded Audio
				 * @property recordedAudio
				 * @type audio
				 * @default null
				 */							
				recordedAudio:null,
				/**
				 * Boolean to check if is Recording
				 * @property isRecording
				 * @type Boolean
				 * @default false
				 */				
				isRecording:false
			};
		},
		/**
		 * Returns Current Playing Audio
		 * @method getCurrentPlayingAudio
		 * @public
		 */
		getCurrentPlayingAudio : function getCurrentPlayingAudio() {
			return this.get('currentPlayingAudio');
		},
		/**
		 * Returns Audio Data
		 * @method getAudioData
		 * @public
		 */
		getAudioData : function getAudioData() {
			return this.get('audioData');
		},
		/**
		 * Returns Audio Path
		 * @method getAudioPath
		 * @public
		 */
		getAudioPath : function getAudioPath() {
			return this.get('audioPath');
		},
		/**
		 * Returns Recorded Audio
		 * @method getRecordedAudio
		 * @public
		 */		
		getRecordedAudio:function getRecordedAudio(){
			return this.get('recordedAudio');
		},
		/**
		 * Returns Is audio recording or not
		 * @method getIsRecording
		 * @public
		 */		
		getIsRecording:function getIsRecording(){
			return this.get('isRecording');
		},				
		/**
		 * Set Current Playing Audio
		 * @method setCurrentPlayingAudio
		 * @public
		 */
		setCurrentPlayingAudio : function setCurrentPlayingAudio(currentPlayingAudio) {
			this.set('currentPlayingAudio', currentPlayingAudio);
			return this;
		},
		/**
		 * Set Audio Data
		 * @method setAudioData
		 * @public
		 */
		setAudioData : function setAudioData(audioData) {
			this.set('audioData', audioData);
			return this;
		},
		/**
		 * Set Audio Path
		 * @method setAudioPath
		 * @public
		 */
		setAudioPath : function setAudioPath(audioPath) {
			this.set('audioPath', audioPath);
			return this;
		},
		/**
		 * Sets Recorder Audio
		 * @method setRecordedAudio
		 * @public
		 */		
		setRecordedAudio:function setRecordedAudio(recordedAudio){
			this.set('recordedAudio',recordedAudio);
			return this;
		},
		/**
		 * Sets Is audio recording or not
		 * @method getIsRecording
		 * @public
		 */		
		setIsRecording:function setIsRecording(isRecording){
			this.set('isRecording',isRecording);
			return this;
		},
		/**
		 * Audio Manager Model constructor
		 * @method initialize
		 */
		initialize : function(audioData, audioPath) {
			this.setAudioData(audioData).setAudioPath(audioPath);
		}
	});
});
