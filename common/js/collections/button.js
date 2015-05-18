(function(CommonCollections) {
	'use strict';
	CommonCollections.ButtonCollection = Backbone.Collection.extend({
		/**
		 *
		 * @property model The model whose collection is to be stored in this structure.
		 * @type {Object} Backbone model
		 */
	    'model': ImagineLearning.Common.Models.ButtonModel,

		/**
		 * Add model to collection.
		 *
		 * @method addToCollection
		 * @param {Object} model model to be added
		 */
		'addToCollection' : function addToCollection(model) {
			this.add(model);
		}
	});
})(ImagineLearning.Common.Collections);
