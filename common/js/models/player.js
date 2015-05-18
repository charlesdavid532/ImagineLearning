(function(CommonModels) {
	'use strict';
	CommonModels.PlayerModel = Backbone.Model.extend({
		/**
		 * Sets the default properties of the model
		 *
		 * @method defaults
		 * @returns {Object}
		 */
		defaults : function() {
			return {
			    /**
                * Holds the id and paths of the audio which is passed to it by the engine. This is passed to the sound-manager to load the audio tag.
                * @property audioData
                * @type Object
                * @default null
                */
			    audioData: null,
			    /**
                * Holds the name of the interactive model
                * @property interactiveModelName
                * @type String
                * @default null
                */
			    interactiveModelName: null,
			    /**
                * Holds the name of the interactive view
                * @property interactiveViewName
                * @type String
                * @default null
                */
			    interactiveViewName: null,
			    /**
                * Holds the interactive model
                * @property interactiveModel
                * @type Backbone.Model
                * @default null
                */
			    interactiveModel: null,
			    /**
                * Holds the interactive view
                * @property interactiveView
                * @type Backbone.View
                * @default null
                */
			    interactiveView: null,
			    /**
                * Holds the sound model
                * @property soundModel
                * @type Backbone.Model
                * @default null
                */
			    soundModel: null,
			    /**
                * Holds the sound view
                * @property soundView
                * @type Backbone.View
                * @default null
                */
			    soundView: null
			};
		},

		/**
		 * Initialization of the model
		 *
		 * @method initialize
		 */
		initialize: function() {
			
		}

		
	});
})(ImagineLearning.Common.Models);
