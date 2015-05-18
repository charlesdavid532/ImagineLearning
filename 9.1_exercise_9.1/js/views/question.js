(function(CommonViews) {
  'use strict';
  ImagineLearning.Interactives.Views.QuestionView = CommonViews.BaseInteractive.extend({
    /**
     * Stores Screen Name
     * @property screenName
     * @type string
     * @default null
     */
    questionName : null,
    /**
     * Initialize function of view.
     * @method initialize
     * @constructor
     */
    'initialize' : function initialize() {
        this.questionName = ImagineLearning.Interactives.Views.QuestionView.QUESTION_PREFIX + this.model.getQuestionNumber();
      this.render();
    },
    /**
     * Renders the view of Pearson Activity 1
     * @method render
     * @public
     **/
    'render' : function render() {
      this._applyText()._applyImage()._applyImgText();
      return this;
    },
    /**
     * Apply Images to Questions
     * @method _applyText
     * @private
     **/
    '_applyImage' : function _applyImage() {
      var questionNumber = this.model.getQuestionNumber(),
          $questionImage = this.$('.display-image-' + questionNumber),
          $resultIamge = this.$('.result-image-' + questionNumber),
          nameSpaceStatic = ImagineLearning.Interactives.Models.QuestionModel,
          questionIndex = questionNumber - 1,
          questionImage = nameSpaceStatic.QUESTION_IMAGE[questionIndex].questionImage,
          resultImage = nameSpaceStatic.RESULT_IMAGE[questionIndex].resultImage;
      $questionImage.attr('src', questionImage);
      $resultIamge.attr('src', resultImage);
      return this;
    },
    /**
     * Apply Text
     * @method _applyText
     * @public
     **/
    '_applyText' : function _applyText() {
      var questionName = this.questionName;
      this.$('.display-image').addClass(questionName);
      this.$('.result-image').addClass(questionName);
      this.$('.identical-text').html(this.getMessage('identical-text')).addClass(questionName);
      return this;
    },
    /**
     * Apply Alternate Text for image
     * @method _applyImgText
     * @public
     **/
    '_applyImgText' : function _applyImgText() {
      var model=this.model,
      		chkIsStereogenic = model.getIsStereogenic(),
          questionNumber = model.getQuestionNumber(),
          $questionImage = this.$('.display-image-' + questionNumber),
          $resultIamge = this.$('.result-image-' + questionNumber),
          questImgMsgId = 'question-' + questionNumber + '-img-text',
          resultImgMsgId = 'result-' + questionNumber + '-img-text',
          questionMsg = this.getMessage(questImgMsgId),
          resultMsg;

      if(chkIsStereogenic) {
        resultMsg = this.getMessage(resultImgMsgId);
      } else {
        resultMsg = questionMsg;
      }
      $questionImage.attr('alt', questionMsg);
      $resultIamge.attr('alt', resultMsg);
      return this;
    },
    /**
     * Set answer is correct or not
     * @method setIsAnswerCorrect
     * @param {boolean} isStereogenic
     * @public
     **/
    'setIsAnswerCorrect' : function setIsAnswerCorrect(correctlyAnswered) {
      this.model.setCorrectlyAnswered(correctlyAnswered);
    },
    /**
     * Show Identical Text
     * @method showIdenticalText
     * @public
     **/
    'showIdenticalText' : function showIdenticalText() {
      this.$('.identical-text').addClass('show');
    },
    /**
     * Show Result Image
     * @method showResultImage
     * @public
     **/
    'showResultImage' : function showResultImage() {
      var $resultImage = this.$('.result-image-question-' + this.model.getQuestionNumber());
      if($resultImage.hasClass('visited')) {
        $resultImage.css('visibility', 'visible');
      } else {
        $resultImage.css('visibility', 'visible').hide().fadeIn('slow').addClass('visited');
      }
    },
    /**
     * Show Question screen
     * @method show
     * @public
     **/
    'show' : function show() {
      this.$el.show();
    },
    /**
     * Hide Question screen
     * @method hide
     * @public
     **/
    'hide' : function hide() {
      this.$el.hide();
    }
  }, {
    /*
     *Question Prefix
     *@property QUESTION_PREFIX
     *@type string
     *@static
     */
    QUESTION_PREFIX : 'question-'
  });
})(ImagineLearning.Common.Views);
