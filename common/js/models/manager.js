(function(commonModels) {
	'use strict';

	/**
	 * The Manager Model which deals with the loc data
	 * @class BaseInteractive
	 * @constructor
	 * @extends Backbone.Model
	 */
	commonModels.Manager = Backbone.Model.extend({
		'defaults' : function() {

			return {

				/**
				 * Holds the elements of the loc data of the interactive
				 * @property elements
				 * @type Array
				 * @default null
				 */
				elements : null
			};
		},
		/**
		 * Initializes the manager model
		 * @constructor
		 * @private
		 */
		'initialize' : function initialize() {

		},
    /**
     * Returns Elements
     * @method getElements
     * @public
     */		
		getElements:function getElements(){
			return this.get('elements');
		},
    /**
     * Sets Elements
     * @method setElements
     * @public
     */		
		setElements:function setElements(elements){
			this.set('elements',elements);
		},		
		/**
		 * Sets the json data in the elements array
		 * @method  setLocData
		 * @param {Object} jsonData
		 * @public
		 */
		'setLocData' : function setLocData(jsonData) {
			this.elements = jsonData['loc-json'].elements;
			// Name is hardcoded
		},
		/**
		 * Returns the message of the required element
		 * @method  getMessage
		 * @param {String} locId The id of the element whose message is required
		 * @public
		 * @returns String
		 */
		'getMessage' : function getMessage(locId) {
			var element = $.grep(this.elements, function(e) {
				return e.id === locId;
			});
			if (element.length === 0) {
				// not found
				console.log('no such element found');
			} else if (element.length === 1) {
				// access the foo property using result[0].foo
				return element[0].messages;
				//Hard coded here
			} else {
				// multiple items found
				console.log('multiple such element found');
			}
		}
	});
})(ImagineLearning.Common.Models);