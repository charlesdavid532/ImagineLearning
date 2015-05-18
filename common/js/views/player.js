/* globals $ */

(function(Common) {
	'use strict';
	Common.Views.PlayerView = Backbone.View.extend({
		/**
		 * Initialization of the view
		 *
		 * @method initialize
		 */
		initialize : function() {
		    // Create sound manager. Pass it the audio. Wait for it to load then ..
		    // Create interactive model view
		    this._createSoundManager();
		    this._createInteractive();
		},

		_createInteractive: function _createInteractive() {
		    var model = new ImagineLearning.Interactives.Models[this.model.get('interactiveModelName')](),
                view = new ImagineLearning.Interactives.Views[this.model.get('interactiveViewName')](
                    {
                        model: model
                    });

		    this.model.set({ 'interactiveModel': model, 'interactiveView': view });
            
		},

		_createSoundManager: function _createSoundManager() {
		    var model = new ImagineLearning.Common.Models.AudioManager({
		        audioData: this.model.get('audioData')
		    }),
                view = new ImagineLearning.Common.Views.AudioManager(
                    {
                        model: model
                    });

		    this.model.set({ 'soundModel': model, 'soundView': view });
		}

		
	}, {
		
	});
})(ImagineLearning.Common);
