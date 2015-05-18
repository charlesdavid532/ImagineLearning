(function() {
	'use strict';
	ButtonModel = Backbone.Model.extend({
		/**
		 * Sets the default properties of the model
		 *
		 * @method defaults
		 * @returns {Object}
		 */
		'defaults' : function() {
			return {

				/**
				 * state of the button active or disabled
				 *
				 * @property state
				 * @type {String}
				 * @default null
				 */
				'state' : null,

				/**
				 * Options of button model.
				 *
				 * @property options
				 * @type {Object}
				 * @default null
				 */
				'options' : null
			};
		},

		/**
		 * Initialization of the model
		 *
		 * @method initialize
		 */
		'initialize': function() {
			if (this.get('options') === null) {
				this.set('options', {
					'modelClassName' : null,
					'viewClassName' : null
				});
			}
			if (this.getState() === null) {
				this.setState(ButtonModel.STATES.ACTIVE);
			}
		},

		/**
		 * Getter method for state
		 *
		 * @method getState
		 * @return {String} returns state of this button.
		 */
		'getState' : function getState() {
			return this.get('state');
		},

		/**
		 * Setter method for state
		 *
		 * @method setState
		 * @param {String} state
		 */
		'setState' : function setState(state) {
			this.set('state', state);
		},

		/**
		 * Getter method for options
		 *
		 * @method getOptions
		 * @return {Object} options.
		 */
		'getOptions' : function getOptions() {
			return this.get('options');
		},

		/**
		 * Setter method for options
		 *
		 * @method setOptions
		 * @param {Object} options
		 */
		'setOptions' : function setOptions(options) {
			return this.set('options', options);
		}
	}, {
		/**
		 * States of the button.
		 *
		 * @property STATES
		 * @type {Object}
		 */
		'STATES' : {
			'ACTIVE' : 'active',
			'DISABLED' : 'disabled'
		}
	});
})();
