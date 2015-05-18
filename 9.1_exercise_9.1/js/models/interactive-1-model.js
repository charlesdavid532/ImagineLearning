(function(commonModels) {
  'use strict';
  ImagineLearning.Interactives.Models.ExerciseOne = commonModels.BaseInteractive.extend({
    defaults : function() {
      return {
        /**
         * Stores Current Screen
         * @property currentScreen
         * @type number
         * @default 0
         */
        currentScreen : 0,
        /**
         * Stores the Current Question user is solving
         * @property currentQuestion
         * @type number
         * @default 1
         */
        currentQuestion : 1,
        /**
         * Stores the model of each question
         * @property questionCollection
         * @type collection
         * @default null
         */
        questionCollection : null,
        /**
         * Stores number of questions answered
         * @property totalAnswered
         * @type number
         * @default 0
         */
        totalAnswered : 0,
        /**
         * Stores number of correct questions
         * @property totalCorrect
         * @type number
         * @default 0
         */
        totalCorrect : 0,
        /**
         * Footer Buttons Collection
         * @property footerBtnCollection
         * @type collection
         * @default null
         */
        footerBtnCollection : null,
        /**
         * Stereo Buttons Collection
         * @property stereoBtnCollection
         * @type collection
         * @default null
         */
        stereoBtnCollection : null,
        /**
         * Reset Game
         * @property resetGame
         * @type boolean
         * @default false
         */
        resetGame : false,
        /**
         * Start Button Model
         * @property startButtonModel
         * @type Model
         * @default null
         */
        startButtonModel : null,
        /**
         * Result Button Model
         * @property resultButtonModel
         * @type Model
         * @default null
         */
        resultButtonModel : null
      };
    },
    /**
     * Initialize function of model.
     * @method initialize
     * @constructor
     */
    'initialize' : function initialize() {
      commonModels.BaseInteractive.prototype.initialize.apply(this, arguments);
    },
    /**
     * Returns Start Button Model
     * @method getStartButtonModel
     * @public
     */
    'getStartButtonModel' : function getStartButtonModel() {
      return this.get('startButtonModel');
    },
    /**
     * Set Start Button Model
     * @method setStartButtonModel
     * @public
     */
    'setStartButtonModel' : function setStartButtonModel(startButtonModel) {
      this.set('startButtonModel', startButtonModel);
    },
    /**
     * Returns Result Button Model
     * @method getResultButtonModel
     * @public
     */
    'getResultButtonModel' : function getResultButtonModel() {
      return this.get('resultButtonModel');
    },
    /**
     * Set Result Button Model
     * @method setStartButtonModel
     * @public
     */
    'setResultButtonModel' : function setResultButtonModel(resultButtonModel) {
      this.set('resultButtonModel', resultButtonModel);
    },
    /**
     * Returns Current Screen
     * @method getCurrentScreen
     * @public
     */
    'getCurrentScreen' : function getCurrentScreen() {
      return this.get('currentScreen');
    },
    /**
     * Returns Current Question
     * @method getCurrentQuestion
     * @public
     */
    'getCurrentQuestion' : function getCurrentQuestion() {
      return this.get('currentQuestion');
    },
    /**
     * Returns Question Collection
     * @method getQuestionCollection
     * @public
     */
    'getQuestionCollection' : function getQuestionCollection() {
      return this.get('questionCollection');
    },
    /**
     * Returns Total Questions Answered
     * @method getTotalAnswered
     * @public
     */
    'getTotalAnswered' : function getTotalAnswered() {
      return this.get('totalAnswered');
    },
    /**
     * Returns Total Correct Questions
     * @method getTotalCorrect
     * @public
     */
    'getTotalCorrect' : function getTotalCorrect() {
      return this.get('totalCorrect');
    },
    /**
     * Returns Footer Btn Collection
     * @method getFooterBtnCollection
     * @public
     */
    'getFooterBtnCollection' : function getTotalCorrect() {
      return this.get('footerBtnCollection');
    },
    /**
     * Returns Stereo Button Collection
     * @method getStereoBtnCollection
     * @public
     */
    'getStereoBtnCollection' : function getStereoBtnCollection() {
      return this.get('stereoBtnCollection');
    },
    /**
     * Returns Reset Game
     * @method getResetGame
     * @public
     */
    'getResetGame' : function getResetGame() {
      return this.get('resetGame');
    },
    /**
     * Set Current Screen
     * @method setCurrentScreen
     * @public
     */
    'setCurrentScreen' : function setCurrentScreen(currentScreen) {
      this.set('currentScreen', currentScreen);
    },
    /**
     * Set Current Question
     * @method setCurrentQuestion
     * @public
     */
    'setCurrentQuestion' : function setCurrentQuestion(currentQuestion) {
      this.set('currentQuestion', currentQuestion);
    },
    /**
     * Set Question Collection
     * @method setQuestionCollection
     * @public
     */
    'setQuestionCollection': function setQuestionCollection(questionCollection) {
      this.set('questionCollection', questionCollection);
    },
    /**
     * Set Footer Button Collection
     * @method setFooterBtnCollection
     * @public
     */
    'setFooterBtnCollection' : function setFooterBtnCollection(footerBtnCollection) {
      this.set('footerBtnCollection', footerBtnCollection);
    },
    /**
     * Set Stereo Button Collection
     * @method setStereoBtnCollection
     * @public
     */
    'setStereoBtnCollection' : function setStereoBtnCollection(stereoBtnCollection) {
      this.set('stereoBtnCollection', stereoBtnCollection);
    },
    /**
     * Set Total Answered Questions
     * @method setTotalAnswered
     * @public
     */
    'setTotalAnswered' : function setTotalAnswered(totalAnswered) {
      this.set('totalAnswered', totalAnswered);
    },
    /**
     * Set Total Correct questions
     * @method setTotalCorrect
     * @public
     */
    'setTotalCorrect' : function setTotalCorrect(totalCorrect) {
      this.set('totalCorrect', totalCorrect);
    },
    /**
     * Set Reset Game
     * @method setResetGame
     * @public
     */
    'setResetGame' : function setResetGame(resetGame) {
      this.set('resetGame', resetGame);
    },
    /**
     * Bind Events
     * @method _bindEvents
     * @private
     **/
    '_bindEvents' : function _bindEvents() {
      this.listenTo(this.getQuestionCollection(), 'change', this._updateCorrectAnswer);
      return this;
    },
    /**
     * Create Question Collection
     * @method _createQuestionCollection
     * @private
     **/
    '_createQuestionCollection' : function _createQuestionCollection() {
      var questCollection = new Concord.Interactives.Collections.QuestionCollection();
      this.setQuestionCollection(questCollection);
      return this;
    },
    /**
     * Create Footer Button Collection
     * @method _createFooterBtnCollection
     * @private
     **/
    '_createFooterBtnCollection' : function _createFooterBtnCollection() {
      var footerBtnCollection = new Concord.Interactives.Collections.ButtonCollection();
      this.setFooterBtnCollection(footerBtnCollection);
      return this;
    },
    /**
     * Create Stereo Button Collection
     * @method _createStereoBtnCollection
     * @private
     **/
    '_createStereoBtnCollection' : function _createStereoBtnCollection() {
      var stereoBtncollection = new Concord.Interactives.Collections.ButtonCollection();
      this.setStereoBtnCollection(stereoBtncollection);
      return this;
    },
    /**
     * Create Stereo Button Models
     * @method _createStereoModels
     * @private
     **/
    '_createStereoModels' : function _createStereoModels() {
      var nameSpace = Concord.Interactives.Models.ExerciseOne,
          stereogenicModel,
          nonStereogenicModel;
      nameSpace.STEREOGENIC_BUTTON.options.viewprops.text = this.getMessage('stereogenic-btn-text');
      nameSpace.NON_STEREOGENIC_BUTTON.options.viewprops.text = this.getMessage('not-stereogenic-btn-text');
      stereogenicModel = new Concord.Common.Models.ButtonModel({
        options : nameSpace.STEREOGENIC_BUTTON.options.viewprops
      });
      nonStereogenicModel = new Concord.Common.Models.ButtonModel({
        options : nameSpace.NON_STEREOGENIC_BUTTON.options.viewprops
      });
      this.getStereoBtnCollection().push(stereogenicModel);
      this.getStereoBtnCollection().push(nonStereogenicModel);
      return this;
    },
    /**
     * Create Footer Button Models
     * @method _createFooterModels
     * @private
     **/
    '_createFooterModels' : function _createFooterModels() {
      var index = 0,
          footerBtnModelArray = [],
          footerButtonData = Concord.Interactives.Models.ExerciseOne.FOOTER_BUTTONS;
      for (; index < 8; index++) {
        var options;
        if(index === 0) {
          footerButtonData[index].options.viewprops.text = this.getMessage('back-btn-text');
        } else if(index === 7) {
          footerButtonData[index].options.viewprops.text = this.getMessage('next-btn-text');
        } else {
          footerButtonData[index].options.viewprops.text = (index);
        }
        options = footerButtonData[index].options.viewprops;
        footerBtnModelArray[index] = new Concord.Common.Models.ButtonModel({
          options : options
        });
      }
      this.getFooterBtnCollection().set(footerBtnModelArray);
      return this;
    },
    /**
     * Create Question Models
     * @method _createQuestionModels
     * @private
     **/
    '_createQuestionModels' : function _createQuestionModels() {
      var questionCollection = this.getQuestionCollection(),
          storeType = Concord.Interactives.Models.ExerciseOne.QUESTION_STEREOGENIC,
          questionModelArray = [],
          index = 0;
      for (; index < storeType.length; index++) {
        var questionModel = new Concord.Interactives.Models.QuestionModel({
          isStereogenic : storeType[index],
          questionNumber:(index+1),
          manager:this.manager
        });
        questionModelArray.push(questionModel);
      }
      questionCollection.set(questionModelArray);
      return this;
    },
    /**
     * Update Correct Answers and total questions answered
     * @method _updateCorrectAnswer
     * @param {model} modelChanged
     * @private
     **/
    '_updateCorrectAnswer' : function _updateCorrectAnswer(modelChanged) {
      var isQuestionCorrect = modelChanged.getCorrectlyAnswered(),
          totalCorrect = this.getTotalCorrect(),
          totalAnswered = this.getTotalAnswered();
      if(isQuestionCorrect) {
        this.setTotalCorrect(totalCorrect + 1);
      }
      this.setTotalAnswered(totalAnswered + 1);

      return this;
    },
    /**
     * Create Start Button Model
     * @method _createStartBtnModel
     * @private
     **/
    '_createStartBtnModel' : function _createStartBtnModel() {
      Concord.Interactives.Models.ExerciseOne.START_BUTTON.options.viewprops.text = this.getMessage('start-btn-text');
      var options = Concord.Interactives.Models.ExerciseOne.START_BUTTON.options.viewprops,
          welcomeBtnModel = new Concord.Common.Models.ButtonModel({
        options : options
      });
      this.setStartButtonModel(welcomeBtnModel);
      return this;
    },
    /**
     * Create Result Button Model
     * @method _createResultBtnModel
     * @private
     **/
    '_createResultBtnModel' : function _createResultBtnModel() {
      var options = Concord.Interactives.Models.ExerciseOne.RESULT_BUTTON.options.viewprops,
          resultBtnModel = new Concord.Common.Models.ButtonModel({
        options : options
      });
      this.setResultButtonModel(resultBtnModel);
      return this;
    },
    /**
     * Reset Model attributes
     * @method reset
     * @public
     **/
    'reset' : function reset() {
    	var stereoBtnCollection=this.getStereoBtnCollection(),
    			footerBtnCollection=this.getFooterBtnCollection(),
    			questionCollection=this.getQuestionCollection();
      this.setTotalAnswered(0);
      this.setTotalCorrect(0);
      stereoBtnCollection.reset();
      this._createStereoModels();
      footerBtnCollection.reset();
      this._createFooterModels();
      questionCollection.reset();
      this._createQuestionModels();
      this.setCurrentQuestion(1);
    },
    /**
     * Load Model after preloader
     * @method load
     * @public
     **/
    'load' : function load(jsonData) {
      commonModels.BaseInteractive.prototype.load.apply(this, arguments);
      this._createStartBtnModel()
		      ._createQuestionCollection()
		      ._createQuestionModels()
		      ._createFooterBtnCollection()
		      ._createFooterModels()
		      ._createStereoBtnCollection()
		      ._createStereoModels()
		      ._createResultBtnModel()
		      ._bindEvents();

    }
  }, {
    /*
     *Stores Answer is Stereogenic or not
     *@property QUESTION_STEREOGENIC
     *@type array
     *@static
     */
    QUESTION_STEREOGENIC : [true, true, false, false, true, false],
    START_BUTTON : {
      'options' : {
        'viewprops' : {
          'id' : 'start-button',
          'class' : ' interactive-common-button',
          'text' : ''
        }
      }
    },
    STEREOGENIC_BUTTON : {
      'options' : {
        'viewprops' : {
          'id' : 'stereogenic-button',
          'class' : 'stereogenic-button answer-button interactive-common-button',
          'text' : ''
        }
      }
    },
    NON_STEREOGENIC_BUTTON : {
      'options' : {
        'viewprops' : {
          'id' : 'not-stereogenic-button',
          'class' : 'not-stereogenic-button answer-button interactive-common-button',
          'text' : ''
        }
      }
    },
    RESULT_BUTTON : {
      'state' : 'active',
      'options' : {
        'viewprops' : {
          'id' : 'show-result-button',
          'class' : 'show-result-button interactive-common-button',
          'text' : '<div id="upper-text" class="upper-text"></div><div id="lower-text" class="lower-text"></div>'
        }
      }
    },
    FOOTER_BUTTONS : [{
      'options' : {
        'viewprops' : {
          'id' : 'footer-button-1',
          'class' : 'prev-btn inner-prev-next-btn interactive-common-button',
          'text' : ''
        }
      }
    }, {
      'options' : {
        'viewprops' : {
          'id' : 'footer-button-2',
          'class' : 'footer-button-2-btn footer-round-btn',
          'text' : ''
        }
      }
    }, {
      'options' : {
        'viewprops' : {
          'id' : 'footer-button-3',
          'class' : 'footer-button-3-btn footer-round-btn',
          'text' : ''
        }
      }
    }, {
      'options' : {
        'viewprops' : {
          'id' : 'footer-button-4',
          'class' : 'footer-button-4-btn footer-round-btn',
          'text' : ''
        }
      }
    }, {
      'options' : {
        'viewprops' : {
          'id' : 'footer-button-5',
          'class' : 'footer-button-5-btn footer-round-btn',
          'text' : ''
        }
      }
    }, {
      'options' : {
        'viewprops' : {
          'id' : 'footer-button-6',
          'class' : 'footer-button-6-btn footer-round-btn',
          'text' : ''
        }
      }
    }, {
      'options' : {
        'viewprops' : {
          'id' : 'footer-button-7',
          'class' : 'footer-button-7-btn footer-round-btn',
          'text' : ''
        }
      }
    }, {
      'options' : {
        'viewprops' : {
          'id' : 'footer-button-8',
          'class' : 'back-btn inner-prev-next-btn interactive-common-button',
          'text' : ''
        }
      }
    }]

  });
})(ImagineLearning.Common.Models);