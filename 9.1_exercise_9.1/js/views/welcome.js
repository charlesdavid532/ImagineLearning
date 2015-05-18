(function(CommonViews) {
  'use strict';
  ImagineLearning.Interactives.Views.WelcomeScreen = CommonViews.BaseInteractive.extend({
    /**
     * Stores Start Button  View
     * @property startBtnView
     * @type View
     * @default null
     */
    startBtnView : null,
    /**
     * Initialize function of view.
     * @method initialize
     * @constructor
     */
    'initialize' : function initialize() {
      this.render();
    },
    /**
     * Renders the view of Welcome Screen
     * @method render
     * @public
     **/
    'render' : function render() {
      this._applyTemplate()._createStartButton()._applyText()._bindEvents();
    },
    /**
     * Apply Template
     * @method _applyTemplate
     * @private
     **/
    '_applyTemplate' : function _applyTemplate() {
        var template = ImagineLearning.Interactives.Templates.welcome();
      this.$el.html(template);
      return this;
    },
    /**
     * Creates Start Button
     * @method _createStartButton
     * @private
     **/
    '_createStartButton' : function _createStartButton() {
      var startModel = this.model.getStartButtonModel();
      this.startBtnView = new Concord.Common.Views.ButtonView({
        model : startModel,
        el : '.start-button'
      });
      return this;
    },
    /**
     * Bind Events
     * @method _bindEvents
     * @private
     **/
    '_bindEvents' : function _bindEvents() {
      $(document).on('keyup', $.proxy(this._onKeyUp, this));
      this.listenTo(this.startBtnView, Concord.Common.Views.ButtonView.EVENTS.CLICKED, this._startBtnClick);
      return this;
    },
    /**
     * Apply Text
     * @method _applyText
     * @private
     **/
    '_applyText' : function _applyText() {
      this.$('.welcome-text').html(this.getMessage('question-text'));
      return this;
    },
    /**
     * Click Start Button
     * @method _startBtnClick
     * @private
     **/
    '_startBtnClick' : function _startBtnClick() {
      this.trigger(Concord.Interactives.Views.WelcomeScreen.EVENTS.START_BUTTON_CLICKED);
      return this;
    },
    /**
     * Handles On key Up event
     * @method _onKeyUp
     * @private
     **/
    '_onKeyUp' : function _onKeyUp(event) {
      if(event.keyCode === 13) {
        this._startBtnClick();
      }
    },
    /**
     * Show Welcome Screen
     * @method show
     * @public
     **/
    'show' : function show() {
      this.$el.show();
    },
    /**
     * Hide Welcome Screen
     * @method hide
     * @public
     **/
    'hide' : function hide() {
      this.$el.hide();
    }
  }, {
    EVENTS : {
      /*
       *Triggers Event went Start Button Click
       *@method START_BUTTON_CLICKED
       *@static
       */
      START_BUTTON_CLICKED : 'startButtonClicked'
    }
  });
})(ImagineLearning.Common.Views);