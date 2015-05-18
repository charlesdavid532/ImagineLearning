(function(CommonViews) {
  'use strict';
  ImagineLearning.Interactives.Views.ProblemSolveScreen = CommonViews.BaseInteractive.extend({
    /**
     * Stores Button Views
     * @property storeBtnArray
     * @type Array
     * @default null
     */
    storeQuestionArray : null,
    /**
     * Stores Button Views
     * @property storeBtnArray
     * @type Array
     * @default null
     */
    storeBtnArray : null,
    /**
     * Stores Result Button View
     * @property resultButton
     * @type view
     * @default null
     */
    resultButton : null,
    /**
     * Stores Stereogenic Btn View
     * @property stereogenicBtnView
     * @type view
     * @default null
     */
    stereogenicBtnView : null,
    /**
     * Stores Not Stereogenic Btn View
     * @property notStereogenicBtnView
     * @type view
     * @default null
     */
    notStereogenicBtnView : null,
    /**
     * Initialize function of view.
     * @method initialize
     * @constructor
     */
    initialize : function initialize() {
      this.render();
    },
    /**
     * Renders the view of Pearson Activity 1
     * @method render
     * @public
     **/
    'render' : function render() {
      this.storeBtnArray = [];
      this.storeQuestionArray = [];
      this._applyTemplate()._generateStereoButton()._generateFooterBtn()._createQuestions()._showQuestionScreen()._createResultButton()._bindEvents();
      return this;
    },
    /**
     * Bind Events
     * @method _bindEvents
     * @private
     **/
    '_bindEvents' : function _bindEvents() {
      var index = 0,
          currentModel = this.model;
      for (; index < this.storeBtnArray.length; index++) {
        this.listenTo(this.storeBtnArray[index], Concord.Common.Views.ButtonView.EVENTS.CLICKED, this._footerBtnClicked);
      }
      this.listenTo(currentModel, 'change:currentQuestion', this._showQuestionScreen);
      this.listenTo(currentModel, 'change:totalAnswered', this._showResults);
      this.listenTo(currentModel, 'change:resetGame', this._resetCompleteGame);
      this.listenTo(this.stereogenicBtnView, Concord.Common.Views.ButtonView.EVENTS.CLICKED, this._stereogenicBtnClick);
      this.listenTo(this.notStereogenicBtnView, Concord.Common.Views.ButtonView.EVENTS.CLICKED, this._notStereogenicBtnClick);
      this.listenTo(this.resultButton, Concord.Common.Views.ButtonView.EVENTS.CLICKED, this.resetGame);
    },
    /**
     * Apply Template
     * @method _applyTemplate
     * @private
     **/
    '_applyTemplate' : function _applyTemplate() {
      var namespace = Concord.Interactives.Templates,
          template = namespace.problemSolve({
        total : 8
      }),
          questionsTemplate = namespace.question({
        total : 7
      }),
      questionText = this.getMessage('common-question-text');
      this.$el.html(template);
      this.$('.question-area').html(questionsTemplate);
      this.$('.question-text').html(questionText);
      this.$('.footer-button-1,.footer-button-8').addClass('prev-next-btn');
      return this;
    },
    /**
     * Create Question Models
     * @method _createModels
     * @private
     **/
    '_createQuestions' : function _createQuestions() {
      var nameSpace = Concord.Interactives.Views.ProblemSolveScreen,
          questionNumbers = nameSpace.QUESTIONS,
          questionCollection = this.model.getQuestionCollection(),
          index = 0;
      for (; index < questionCollection.length; index++) {
        var $element = '.question-' + (index + 1) + '-area',
            questionModel = questionCollection.at(index),
            
        questionView = new Concord.Interactives.Views.QuestionView({
          model : questionModel,
          el : $element
        });
        questionCollection.push(questionModel);
        this.storeQuestionArray.push(questionView);
      }
      this.model.setQuestionCollection(questionCollection);
      return this;
    },
    /**
     * Generate Stereo Buttons
     * @method _generateStereoButton
     * @public
     **/
    '_generateStereoButton' : function _generateStereoButton() {
      var stereoBtnCollection = this.model.getStereoBtnCollection();
      this.stereogenicBtnView = new Concord.Common.Views.ButtonView({
        model : stereoBtnCollection.at(0),
        el : '.stereogenic-btn-container'
      });
      this.notStereogenicBtnView = new Concord.Common.Views.ButtonView({
        model : stereoBtnCollection.at(1),
        el : '.not-stereogenic-btn-container'
      });
      return this;
    },
    /**
     * Generate Footer Button
     * @method _generateFooterBtn
     * @private
     **/
    '_generateFooterBtn' : function _generateFooterBtn() {
      var footerBtnCollection = this.model.getFooterBtnCollection(),
          index = 1;
      for (; index <= footerBtnCollection.length; index++) {
        var btnContainer = '.footer-button-' + index;
        if(index === 1) {
          this.$(btnContainer).addClass('prev-next-btn');
        } else if(index === 8) {
          this.$(btnContainer).addClass('prev-next-btn');
        }

        this.storeBtnArray[index - 1] = new Concord.Common.Views.ButtonView({
          model : footerBtnCollection.at(index - 1),
          el : btnContainer
        });
      }
      return this;
    },
    /**
     * Stereogenic Button click
     * @method _stereogenicBtnClick
     * @public
     **/
    '_stereogenicBtnClick' : function _stereogenicBtnClick() {
      this._setStereogenicProperties();

    },
    /**
     * Not Stereogenic Button click
     * @method _notStereogenicBtnClick
     * @public
     **/
    '_notStereogenicBtnClick' : function _notStereogenicBtnClick() {
      this._setNonStereogenicProperties();
    },
    /**
     * Set Stereogenic Properties
     * @method _setStereogenicProperties
     * @public
     **/
    '_setStereogenicProperties' : function _setStereogenicProperties() {
      var model = this.model,
          currentQuestion = model.getCurrentQuestion(),
          questionCollection = model.getQuestionCollection(),
          currentQuestionModel = questionCollection.at(currentQuestion - 1),
          currentQuestionView = this.storeQuestionArray[currentQuestion - 1],
          $correctionText = this.$('.correction-text'),
          $stereogenicBtn = this.$('.stereogenic-button'),
          $explanationText = this.$('.explanation-text'),
          stereoExpTxt = this.getMessage('stereogenic-explanation-text'),
          nonStereoExpTxt = this.getMessage('not-stereogenic-explanation-text'),
          correctFeedbackTxt = this.getMessage('correct-feedback-text'),
          incorrectFeedbackTxt = this.getMessage('incorrect-feedback-text'),
          currentButton = currentQuestion + 1,
          $currentBtn = this.$('.footer-button-' + currentButton + '-btn');

      this._resetQuestionScreen();
      if(currentQuestionModel.getIsStereogenic()) {
        currentQuestionView.setIsAnswerCorrect(true);
        $correctionText.html(correctFeedbackTxt).addClass('answer-correct');
        $stereogenicBtn.addClass('answer-correct');
        $explanationText.html(stereoExpTxt).addClass('show stereogenic-exp');
      } else {
        currentQuestionView.setIsAnswerCorrect(false);
        $correctionText.html(incorrectFeedbackTxt).addClass('answer-incorrect');
        $stereogenicBtn.addClass('answer-incorrect');
        $explanationText.html(nonStereoExpTxt).addClass('show non-stereogenic-exp');
        currentQuestionView.showIdenticalText();
      }
      $correctionText.addClass('stereogenic-correct-text');
      if($currentBtn.hasClass('visited')) {
        $correctionText.css('visibility', 'visible');
      } else {
        $correctionText.css('visibility', 'visible').hide().fadeIn('slow');
      }
      $currentBtn.addClass('visited');
      currentQuestionView.showResultImage();
      this._disableStereoButtons();
    },
    /**
     * Set Non Stereogenic Properties
     * @method _setNonStereogenicProperties
     * @public
     **/
    '_setNonStereogenicProperties' : function _setNonStereogenicProperties() {
      var model = this.model,
          currentQuestion = model.getCurrentQuestion(),
          questionCollection = model.getQuestionCollection(),
          currentQuestionModel = questionCollection.at(currentQuestion - 1),
          currentQuestionView = this.storeQuestionArray[currentQuestion - 1],
          $correctionText = this.$('.correction-text'),
          $notStereogenicBtn = this.$('.not-stereogenic-button'),
          $explanationText = this.$('.explanation-text'),
          stereoExpTxt = this.getMessage('stereogenic-explanation-text'),
          nonStereoExpTxt = this.getMessage('not-stereogenic-explanation-text'),
          correctFeedbackTxt = this.getMessage('correct-feedback-text'),
          incorrectFeedbackTxt = this.getMessage('incorrect-feedback-text'),
          currentButton = currentQuestion + 1,
          $currentBtn = this.$('.footer-button-' + currentButton + '-btn');
      this._resetQuestionScreen();
      if(currentQuestionModel.getIsStereogenic()) {
        currentQuestionView.setIsAnswerCorrect(false);
        $correctionText.html(incorrectFeedbackTxt).addClass('answer-incorrect');
        $notStereogenicBtn.addClass('answer-incorrect');
        $explanationText.html(stereoExpTxt).addClass('show stereogenic-exp');
      } else {
        currentQuestionView.setIsAnswerCorrect(true);
        $correctionText.html(correctFeedbackTxt).addClass('answer-correct');
        $notStereogenicBtn.addClass('answer-correct');
        $explanationText.html(nonStereoExpTxt).addClass('show non-stereogenic-exp');
        currentQuestionView.showIdenticalText();
      }
      $correctionText.addClass('not-stereogenic-correct-text');
      if($currentBtn.hasClass('visited')) {
        $correctionText.css('visibility', 'visible');
      } else {
        $correctionText.css('visibility', 'visible').hide().fadeIn('slow');
      }
      currentQuestionView.showResultImage();
      $currentBtn.addClass('visited');
      this._disableStereoButtons();
    },
    /**
     * Set Question Screen
     * @method _setQuestionScreen
     * @private
     **/
    '_setQuestionScreen' : function _setQuestionScreen() {
      var model = this.model,
          currentQuestion = model.getCurrentQuestion(),
          questionCollection = model.getQuestionCollection(),
          currentQuestionModel = questionCollection.at(currentQuestion - 1),
          isStereogenic = currentQuestionModel.getIsStereogenic(),
          correctlyAnswered = currentQuestionModel.getCorrectlyAnswered();
      if(((isStereogenic === true) && (correctlyAnswered === true)) || ((isStereogenic === false) && (correctlyAnswered === false))) {
        this._setStereogenicProperties();
      } else {
        this._setNonStereogenicProperties();
      }

    },
    /**
     * Reset Question Screen
     * @method _resetQuestionScreen
     * @private
     **/
    '_resetQuestionScreen' : function _resetQuestionScreen() {
      var $notStereogenicBtn = this.$('.not-stereogenic-button'),
          $StereogenicBtn = this.$('.stereogenic-button'),
          $explanationText = this.$('.explanation-text'),
          $correctionText = this.$('.correction-text');
      $StereogenicBtn.removeClass('answer-incorrect answer-correct');
      $notStereogenicBtn.removeClass('answer-incorrect answer-correct');
      $explanationText.html('').removeClass('show non-stereogenic-exp stereogenic-exp');
      $correctionText.html('').removeClass('show stereogenic-correct-text show-visible not-stereogenic-correct-text answer-incorrect answer-correct');
    },
    /**
     * Enable stereo buttons
     * @method _enableStereoButtons
     * @private
     **/
    '_enableStereoButtons' : function _enableStereoButtons() {
      this.model.getStereoBtnCollection().at(0).setState(Concord.Common.Models.ButtonModel.STATES.ACTIVE);
      this.model.getStereoBtnCollection().at(1).setState(Concord.Common.Models.ButtonModel.STATES.ACTIVE);
    },
    /**
     * Disable stereo buttons
     * @method _disableStereoButtons
     * @private
     **/
    '_disableStereoButtons' : function _disableStereoButtons() {
      this.model.getStereoBtnCollection().at(0).setState(Concord.Common.Models.ButtonModel.STATES.DISABLED);
      this.model.getStereoBtnCollection().at(1).setState(Concord.Common.Models.ButtonModel.STATES.DISABLED);
    },
    /**
     * Footer Btn Clicked
     * @method _footerBtnClicked
     * @private
     **/
    '_footerBtnClicked' : function _footerBtnClicked(event) {
      var btnNum = parseInt($(event.currentTarget).attr('buttonNumber'));
      switch (btnNum) {
        case 1:
          this._backButtonClick();
          break;
        case 8:
          this._nextButtonClick();
          break;
        default:
          this.model.setCurrentQuestion(btnNum - 1);
          break;
      }
    },
    /**
     * Go to Previous Problem
     * @method _backButtonClick
     * @private
     **/
    '_backButtonClick' : function _backButtonClick() {
      var model = this.model,
          currentQuestion = parseInt(model.getCurrentQuestion());
      if(currentQuestion === 1) {
        this.storeBtnArray[currentQuestion - 1].setButtonState(Concord.Common.Views.ButtonView.BUTTON_STATE_DISABLED);
        return;
      } else {
        currentQuestion = currentQuestion - 1;
      }
      model.setCurrentQuestion(currentQuestion);
    },
    /**
     * Go to Next Problem
     * @method _nextButtonClick
     * @private
     **/
    '_nextButtonClick' : function _nextButtonClick() {
      var model = this.model,
          currentQuestion = model.getCurrentQuestion();
      if(currentQuestion === model.getQuestionCollection().length) {
        this.storeBtnArray[currentQuestion + 1].setButtonState(Concord.Common.Views.ButtonView.BUTTON_STATE_DISABLED);
        return;
      } else {
        currentQuestion = currentQuestion + 1;
      }
      model.setCurrentQuestion(currentQuestion);
    },
    /**
     * Show Current Problem
     * @method _showProblemOnClick
     * @private
     **/
    '_showQuestionScreen' : function _showQuestionScreen() {
      var model = this.model,
          currentQuestion = model.getCurrentQuestion(),
          currentButton = currentQuestion + 1,
          $currentBtn = this.$('.footer-button-' + currentButton + '-btn');

      this._hideAllQuestions();
      this.storeQuestionArray[currentQuestion - 1].show();
      if($currentBtn.hasClass('visited') === true) {
        this._setQuestionScreen();
        this._disableStereoButtons();
      } else {
        $currentBtn.addClass('button-selected');
        this._enableStereoButtons();
        this._resetQuestionScreen();
      }
      this.$('.question-number').html(currentQuestion);
      this._setFooterBtnState();
      return this;
    },
    /**
     * Set Footer Btn states
     * @method _setFooterBtnState
     * @private
     **/
    '_setFooterBtnState' : function _setFooterBtnState() {
      var model = this.model,
          currentQuestion = model.getCurrentQuestion(),
          totalQuestions = model.getQuestionCollection().length,
          footerBtnCollection = this.model.getFooterBtnCollection();
      this._enableAllFooterButtons();
      if(currentQuestion === totalQuestions) {
        footerBtnCollection.at(0).setState(Concord.Common.Models.ButtonModel.STATES.ACTIVE);
        footerBtnCollection.at(totalQuestions + 1).setState(Concord.Common.Models.ButtonModel.STATES.DISABLED);
      } else if(currentQuestion === 1) {
        footerBtnCollection.at(0).setState(Concord.Common.Models.ButtonModel.STATES.DISABLED);
        footerBtnCollection.at(totalQuestions + 1).setState(Concord.Common.Models.ButtonModel.STATES.ACTIVE);
      } else {
        footerBtnCollection.at(0).setState(Concord.Common.Models.ButtonModel.STATES.ACTIVE);
        footerBtnCollection.at(totalQuestions + 1).setState(Concord.Common.Models.ButtonModel.STATES.ACTIVE);
      }
      footerBtnCollection.at(currentQuestion).setState(Concord.Common.Models.ButtonModel.STATES.DISABLED);
      this.$('.footer-button-container').removeClass('selected');
      this.$('.footer-button-container-' + (currentQuestion+1)).addClass('selected');
    },
    /**
     * Enable All Footer Buttons
     * @method _enableAllFooterButtons
     * @private
     **/
    '_enableAllFooterButtons' : function _enableAllFooterButtons() {
      var footerBtnCollection = this.model.getFooterBtnCollection(),
          index = 0;
      for (; index < footerBtnCollection.length; index++) {
        footerBtnCollection.at(index).setState(Concord.Common.Models.ButtonModel.STATES.ACTIVE);
      }
    },
    /**
     * Hide all Questions
     * @method _hideAllQuestions
     * @private
     **/
    '_hideAllQuestions' : function _hideAllQuestions() {
      var counter = 0,
          totalQuestions = this.model.getQuestionCollection().length,
          currentButton = 2;
      for (; counter < totalQuestions; counter++) {
        this.storeQuestionArray[counter].hide();
        this.$('.footer-button-' + currentButton + '-btn').removeClass('button-selected');
        currentButton++;
      }
    },
    /**
     * Create Result Button
     * @method _createResultButton
     * @private
     **/
    '_createResultButton' : function _createResultButton() {
      var model = this.model,
          lowerText = this.getMessage('result-btn-lower-text'),
          resultBtnModel = model.getResultButtonModel();
      this.resultButton = new Concord.Common.Views.ButtonView({
        model : resultBtnModel,
        el : '.result-button'
      });
      this.$('.lower-text,.upper-text').addClass('common-result-text');
      this.$('.lower-text').html(lowerText);
      return this;
    },
    /**
     * Show Results
     * @method _showResults
     * @private
     **/
    '_showResults' : function _showResults() {
      var model = this.model,
          totalAnswered = model.getTotalAnswered(),
          totalCorrect = model.getTotalCorrect(),
          upperText = this.getMessage('result-btn-upper-left-text') + totalCorrect + this.getMessage('result-btn-upper-right-text');

      if(totalAnswered === model.getQuestionCollection().length) {
        model.getResultButtonModel().setState(Concord.Common.Models.ButtonModel.STATES.ACTIVE);
        this.$('.upper-text').html(upperText);
        this.$('.result-button').addClass('show-result');
      }
      this._updateButtonColor();
    },
    /**
     * Update Button Color
     * @method _updateButtonColor
     * @private
     **/
    '_updateButtonColor' : function _updateButtonColor() {
      var currentQuestion = this.model.getCurrentQuestion(),
          questionCorrect = this.storeQuestionArray[currentQuestion - 1].model.getCorrectlyAnswered(),
          currentButton = currentQuestion + 1,
          $currentBtn = this.$('.footer-button-' + currentButton + '-btn');
      if(questionCorrect) {
        $currentBtn.addClass('answer-correct');
      } else {
        $currentBtn.addClass('answer-incorrect');
      }
      $currentBtn.removeClass('button-selected');
    },
    /**
     * Reset Game
     * @method resetGame
     * @public
     **/
    'resetGame' : function resetGame() {
      var index = 0,
          questionLength = this.model.getQuestionCollection().length,
          totalButtonViews = this.storeBtnArray;
      for (; index < questionLength; index++) {
        this.storeQuestionArray[index].remove();
      }
      for ( index = 0; index < totalButtonViews.length; index++) {
        totalButtonViews[index].remove();
      }
      this.$('.result-button').removeClass('show-result');
      this.model.reset();
      this.model.setResetGame(true);
    },
    /**
     * Reset Complete Game
     * @method _resetCompleteGame
     * @private
     **/
    '_resetCompleteGame' : function _resetCompleteGame(model, value) {
      if(value) {
        this.render();
        this.model.setResetGame(false);
      }
    },
    /**
     * Show Problem Solve Screen
     * @method show
     * @public
     **/
    'show' : function show() {
      this.$el.show();
    },
    /**
     * Hide Problem Solve Screen
     * @method hide
     * @public
     **/
    'hide' : function hide() {
      this.$el.hide();
    }
  });
})(ImagineLearning.Common.Views);