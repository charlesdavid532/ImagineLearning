(function (Common) {
    Common.Views.AudioManager = Backbone.View.extend({
        /**
		 * Audio Context
		 * @property audioContext
		 * @type object
		 */
        audioContext: null,
        audioRecorder: null,
        inputPoint: null,
        realAudioInput: null,
        audioInput: null,
        /**
         * Initialize function of view.
         * @method initialize
         * @constructor
         */
        'initialize': function initialize(data) {
            this.player = data.player;
            this.render();
        },
        /**
         * Renders the view of Audio Manager
         * @method render
         * @public
         **/
        'render': function render() {
            this._initAudio();
            return this;
        },
        _initAudio: function _initAudio() {
            this._createAudioTags();
            //this._initRecording();
        },
        _createAudioTags: function _createAudioTags() {
            var audioData = this.model.get('audioData').audioData, // TODO What if no audiodata??
                audioId, audioSrc, audioType;


            this.totalAudioFiles = audioData.length;
            this.audioFilesLoaded = 0;
            this.$audio = [];
            console.log('show preloader');
            this._bindEvents();
            this._showPreloader();
            for (var i = 0; i < audioData.length; i++) {
                audioId = audioData[i].id;
                audioSrc = audioData[i].src;
                audioType = audioData[i].type;
                if ($('#' + audioId).length !== 0) {
                    $('#' + audioId).remove();
                }
                $('body').append('<audio id=' + audioId + '></audio>');
                $('#' + audioId).append('<source src=' + audioSrc + ' type=' + audioType + '></source>');
                $('#' + audioId).attr('src', audioSrc).attr('type', audioType).attr('codecs', 'mp3'); // later take codecs

                this.$audio.push($('#' + audioId));
                this._bindLoadEvent(this.$audio[i]);
            }
        },
        _bindEvents: function _bindEvents() {
            this.listenTo(this, Common.Views.AudioManager.EVENTS.AUDIO_FILES_LOADED, this._hidePreloader);
        },
        /**
        * Binds the load event on the passed audio and checks if all the audio files have been loaded
        * @method _bindLoadEvent
        * @param $audio{DOM Object} The audio tag
        * @private
        */
        _bindLoadEvent: function _bindLoadEvent($audio) {
            var self = this;
            this._canPlayThrough($audio, function () {
                self.audioFilesLoaded++;
                if (self.audioFilesLoaded === self.totalAudioFiles) {
                    console.log('all audio files have been loaded');
                    self.trigger(Common.Views.AudioManager.EVENTS.AUDIO_FILES_LOADED);
                }
            });
        },
        /**
        * Check if audio file is ready to play using the can play through event
        *
        * @method _canPlayThrough
        */
        _canPlayThrough: function _canPlayThrough($audio, callback) {
            $audio.on('canplaythrough', callback);
        },
        /**
        * Shows audio preloader.
        *
        * @method _showPreloader
        */
        _showPreloader: function () {
            var player = this.player;

            if (player.$el.find('.audio-mgr-modal').length === 0) {
                var preloadModal = $('<div/>', { class: "audio-mgr-modal" }).css({ position: "absolute", top: "0px", left: '0px', width: player.$el.width(), height: player.$el.height(), 'z-index': 980, opacity: 0.56, 'background-color': '#000' });
                var preloader = $('<div/>', { class: "audio-mgr-preloder" }).css({ position: "absolute", top: "0", left: '0', width: "100%", height: "100%", "background": 'url("data:image/png;base64,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") 50% 50% no-repeat' });
                preloadModal.append(preloader);
                player.$el.append(preloadModal);
                //player.setModalPresent(true);

            }

        },

        /**
        * Hides audio preloader.
        *
        * @method _hidePreloader
        */
        _hidePreloader: function () {
            var player = this.player;

            if (player.$el.find('.audio-mgr-modal').length !== 0) {
                player.$el.find('.audio-mgr-modal').remove();
            }

            this.player.trigger(Common.Views.AudioManager.EVENTS.AUDIO_FILES_LOADED);
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
                }, this._createAudioNode, function (e) {
                    alert('Error getting audio');
                });
        },
        '_createAudioNode': function _createAudioNode(stream) {
            this.audioContext = new AudioContext();
            var self = this,
					zeroGain = null,
					analyserNode = null,
					audioContext = this.audioContext;

            self.inputPoint = audioContext.createGain();
            // Create an AudioNode from the stream.
            self.realAudioInput = audioContext.createMediaStreamSource(stream);
            self.audioInput = self.realAudioInput;
            self.audioInput.connect(inputPoint);

            analyserNode = audioContext.createAnalyser();
            analyserNode.fftSize = 2048;
            self.inputPoint.connect(analyserNode);

            self.audioRecorder = new Recorder(inputPoint);
            zeroGain = audioContext.createGain();
            zeroGain.gain.value = 0.0;
            self.inputPoint.connect(zeroGain);
            zeroGain.connect(audioContext.destination);
        },
        /**
         * Play required Audio
         * @method playAudio
         * @public
         **/
        'playAudio': function playAudio(audioId) {
            var $audio = $('#' + audioId);
            $audio[0].play();
            this.model.setCurrentPlayingAudio(audioId);
            //$audio[0].removeEventListener('timeupdate').addEventListener('timeupdate', _onTimeUpdate, false);
        },
        '_onTimeUpdate': function _onTimeUpdate() {
            this.trigger(AudioManager.EVENTS.TIME_UPDATE_EVENT, this.currentTime);
        },
        /**
         * Pause Current Playing Audio
         * @method pauseAudio
         * @public
         **/
        'pauseAudio': function pauseAudio() {
            var audioId = this.model.getCurrentPlayingAudio();
            this.$('#' + audioId).pause();
        },
        /**
         * Stop Current Playing Audio
         * @method stopAudio
         * @public
         **/
        'stopAudio': function stopAudio() {
            var audioId = this.model.getCurrentPlayingAudio(),
                    $audio = this.$('#' + audioId);
            $audio.stop();
            $audio.removeEventListener('timeupdate');
        },
        /**
         * Record Sound 
         * @method recordSound
         * @public
         **/
        'recordSound': function recordSound() {
            var self = this;
            if (!self.model.getIsRecording()) {
                // start recording
                if (!audioRecorder) {
                    return;
                }
                self.model.setIsRecording(true);
                self.audioRecorder.clear();
                self.audioRecorder.record();
            }
        },
        'stopRecord': function stopRecord() {
            var self = this;
            if (self.model.getIsRecording()) {
                // stop recording
                self.audioRecorder.stop();
                self.model.setIsRecording(false);
                self.audioRecorder.getBuffers(self._gotBuffers);
            }
        },
        /**
         * Got Buffers setups up for download
         * @method _gotBuffers
         * @private
         **/
        '_gotBuffers': function _gotBuffers(buffers) {
            // the ONLY time _gotBuffers is called is right after a new recording is completed - 
            // so here's where we should set up the download.
            audioRecorder.exportWAV(doneEncoding);
        },
        /**
         * Sets the source file and setup downloading
         * @method _doneEncoding
         * @private
         **/
        '_doneEncoding': function _doneEncoding(blob) {
            this.model.setRecordedAudio(blob);
            var url = (window.URL || window.webkitURL).createObjectURL(blob);
            audio = document.getElementById("recordedAudio");
            audio.src = url;
            Recorder.setupDownload(blob, "myRecording" + ((recIndex < 10) ? "0" : "") + recIndex + ".wav");
            recIndex++;
        }
    }, {
        EVENTS: {
            TIME_UPDATE_EVENT: 'time-update-event',
            AUDIO_FILES_LOADED: 'audio-files-loaded'
        }
    });
})(ImagineLearning.Common);
