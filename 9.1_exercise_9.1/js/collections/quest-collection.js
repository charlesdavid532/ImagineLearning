(function () {
    'use strict';
    ImagineLearning.Interactives.Collections.QuestionCollection = Backbone.Collection.extend({
        model: ImagineLearning.Interactives.Models.QuestionModel,
        'initialize': function initialize() {
            this.model = ImagineLearning.Interactives.Models.QuestionModel;
        },
        'fetch': function (options) {
            options.reset = true;
            return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });
})();