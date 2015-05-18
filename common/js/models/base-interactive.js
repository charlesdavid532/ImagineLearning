
 (function(commonModels) {
 	
	'use strict';

	/**
	 * The Base Model from which all the interactives will be extended.
	 * @class BaseInteractive
	 * @constructor
	 * @extends Backbone.Model
	 */
	commonModels.BaseInteractive = Backbone.Model.extend({
		/**
		 * Initializes the model with default data. Child interactive should call the parent method.
		 * @constructor
		 * @private
		 */
		'initialize': function initialize(options) {
			// this is the common intialize for all model interactives
			// this.manager = new commonModels.Manager();
			this._setManager(options);
		},
		_setManager:function _setManager(options){
				 if(options&&options.manager){
					this.manager=options.manager;				
					this.unset('manager');
				}else{
					this.manager = new commonModels.Manager();
				}				
		},
		/**
		 * Returns Manager
		 * @method getManager
		 * @public
		 * @returns View
		 */		
		getManager:function getManager(){
			return this.manager;
		},
		/**
		 * Loads the json data inside the manager. Called from the preloader. Incase this method is overriden by child call the parent method.
		 * @method load
		 * @param {Object} jsonData The loc data that is loaded from the json file
		 * @private
		 */
		'load' : function load(jsonData) {
			this.manager.setLocData(jsonData);
		},
		/**
		 * Returns the message of the required element by calling the manager's getMessage method
		 * @method getMessage
		 * @param {String} locId The id of the element whose message is required
		 * @public
		 * @returns String
		 */
		'getMessage' : function getMessage(locId) {
			return this.manager.getMessage(locId);
		}
	});
 })(ImagineLearning.Common.Models);
