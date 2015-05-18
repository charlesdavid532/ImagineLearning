(function(CommonViews) {
  'use strict';
  /**
   * The Base View from which all the interactives will be extended.
   * @class BaseInteractive
   * @constructor
   * @extends Backbone.Model
   */
  CommonViews.BaseInteractive = Backbone.View.extend({

    'initialize' : function initialize() {
      // this is the common intialize for all interactives

    },
    'load' : function load() {

    },
    /**
     * Returns the message of the required element by calling the model's
     * getMessage
     * @method getMessage
     * @param {String} locId The id of the element whose message is required
     * @public
     * @returns String
     */
    'getMessage' : function getMessage(locId) {
      return this.model.getMessage(locId);
    }
  });
})(ImagineLearning.Common.Views);
