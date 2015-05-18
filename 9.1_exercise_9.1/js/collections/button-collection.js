(function() {
  'use strict';
  ImagineLearning.Interactives.Collections.ButtonCollection = Backbone.Collection.extend({
      model: ImagineLearning.Common.Models.ButtonModel,
    'initialize' : function initialize() {
        this.model = ImagineLearning.Common.Models.ButtonModel;
    },
    'fetch' : function(options) {
      options.reset = true;
      return Backbone.Collection.prototype.fetch.call(this, options);
    }
  });
})(); 