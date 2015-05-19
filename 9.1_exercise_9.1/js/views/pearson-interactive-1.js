(function(CommonViews) {
  'use strict';
  ImagineLearning.Interactives.Views.ExerciseOne = CommonViews.BaseInteractive.extend({
    /**
     * Stores Welcome Screen View
     * @property welcomeScreenView
     * @type View
     * @default null
     */
    welcomeScreenView : null,
    /**
     * Stores Problem Solve View
     * @property problemSolveScreen
     * @type View
     * @default null
     */
    problemSolveScreen : null,
    /**
     * Initialize function of view.
     * @method initialize
     * @constructor
     */
    'initialize': function initialize(data) {
        this.player = data.player;
        this._bindEvents();
    },
    /**
     * Renders the view of Pearson Activity 1
     * @method render
     * @public
     **/
    'render': function render() {
        
        this._loadTemplate()._applyText()._createWelcomeScreen()._createProblemSolveScreen()._showCurrentScreen();
        
      return this;
    },
    /**
     * Bind Events
     * @method _bindEvents
     * @private
     **/
    '_bindEvents' : function _bindEvents() {
      //this.listenTo(this.welcomeScreenView, Concord.Interactives.Views.WelcomeScreen.EVENTS.START_BUTTON_CLICKED, this._startBtnClicked);
        //this.listenTo(this.model, 'change:currentScreen', this._showCurrentScreen);
        $('#play-1').on('click', $.proxy(this.loadSound1, this));
        $('#play-2').on('click', $.proxy(this.loadSound2, this));
      return this;
    },
    loadSound1: function loadSound1() {
        this.player.model.get('soundView').playAudio('sound');
    },
    loadSound2: function loadSound2() {
        this.player.model.get('soundView').playAudio('sound1');
    },
    /**
     * Load Template
     * @method _loadTemplate
     * @private
     **/
    '_loadTemplate' : function _loadTemplate() {
      var template = Concord.Interactives.Templates.main();
      this.$el.html(template);
      this.$el.attr('unselectable', 'on').addClass('remove-text-selection').on('selectstart', function() {
        return false;
      }).attr('draggable', 'false')// For moz and webkit, although Firefox 16
      // ignores this when -moz-user-select: none; is set, it's like these
      // properties are mutually exclusive, seems to be a bug.
      .on('dragstart', function() {
        return false;
      });
      return this;
    },
    /**
     * Apply Text
     * @method _applyText
     * @private
     **/
    '_applyText' : function _applyText() {
      this.$('.activity-text').html(this.getMessage('activity-text'));
      return this;
    },
    /**
     * Creates Welcome Screen
     * @method _createWelcomeScreen
     * @private
     **/
    '_createWelcomeScreen' : function _createWelcomeScreen() {
      this.welcomeScreenView = new Concord.Interactives.Views.WelcomeScreen({
        el : '.welcome-screen',
        model : this.model
      });
      return this;
    },
    /**
     * Create Problem Solve Screen
     * @method _startBtnClicked
     * @private
     **/
    '_createProblemSolveScreen' : function _createProblemSolveScreen() {
      this.problemSolveScreen = new Concord.Interactives.Views.ProblemSolveScreen({
        el : '.problem-solve-screen',
        model : this.model
      });
      return this;
    },
    /**
     * Start Button Clicked
     * @method _startBtnClicked
     * @private
     **/
    '_startBtnClicked' : function _startBtnClicked() {
      this.model.setCurrentScreen(1);
      return this;
    },
    /**
     * Show current Screen
     * @method _showCurrentScreen
     * @private
     **/
    '_showCurrentScreen' : function _showCurrentScreen() {
      var model = this.model,
          screenNum = model.getCurrentScreen(),
          problemSolveView = this.problemSolveScreen,
          welcomeScreenView = this.welcomeScreenView;
      switch (screenNum) {
        case 0:
          problemSolveView.hide();
          welcomeScreenView.show();
          model.setCurrentScreen(0);
          break;
        case 1:
          welcomeScreenView.hide();
          problemSolveView.show();
          model.setCurrentScreen(1);
          break;
        default:
          problemSolveView.hide();
          welcomeScreenView.show();
          model.setCurrentScreen(0);
          break;
      }
      return this;
    },
    /**
     * load View after preloader
     * @method load
     * @public
     **/
    'load' : function load() {
      this.render()._bindEvents();
    }
  });
})(ImagineLearning.Common.Views);