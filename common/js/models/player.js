(function(CommonModels) {
	'use strict';
	CommonModels.PlayerModel = Backbone.Model.extend({
		/**
		 * Sets the default properties of the model
		 *
		 * @method defaults
		 * @returns {Object}
		 */
		defaults : function() {
			return {
			    /**
                * Holds the id and paths of the audio which is passed to it by the engine. This is passed to the sound-manager to load the audio tag.
                * @property audioData
                * @type Object
                * @default null
                */
			    audioData: null,
			    /**
                * Holds the name of the interactive model
                * @property interactiveModelName
                * @type String
                * @default null
                */
			    interactiveModelName: null,
			    /**
                * Holds the name of the interactive view
                * @property interactiveViewName
                * @type String
                * @default null
                */
			    interactiveViewName: null,
			    /**
                * Holds the interactive model
                * @property interactiveModel
                * @type Backbone.Model
                * @default null
                */
			    interactiveModel: null,
			    /**
                * Holds the interactive view
                * @property interactiveView
                * @type Backbone.View
                * @default null
                */
			    interactiveView: null,
			    /**
                * Holds the sound model
                * @property soundModel
                * @type Backbone.Model
                * @default null
                */
			    soundModel: null,
			    /**
                * Holds the sound view
                * @property soundView
                * @type Backbone.View
                * @default null
                */
			    soundView: null,
			    nextBtnModel:null,
			    continueBtnModel:null,
			    exitBtnModel:null,
			    pauseBtnModel:null,
			    hintBtnModel:null			    
			    
			};
		},
		getNextBtnModel:function getNextBtnModel(){
			return this.get('nextBtnModel');
		},
		setNextBtnModel:function setNextBtnModel(nextBtnModel){
			this.set('nextBtnModel',nextBtnModel);
		},
		getContinueBtnModel:function getContinueBtnModel(){
			return this.get('continueBtnModel');
		},
		setContinueBtnModel:function setContinueBtnModel(continueBtnModel){
			this.set('continueBtnModel',continueBtnModel);
		},
		getExitBtnModel:function getExitBtnModel(){
			return this.get('exitBtnModel');
		},
		setExitBtnModel:function setExitBtnModel(exitBtnModel){
			this.set('exitBtnModel',exitBtnModel);
		},	
		getPauseBtnModel:function getPauseBtnModel(){
			return this.get('pauseBtnModel');
		},
		setPauseBtnModel:function setPauseBtnModel(pauseBtnModel){
			this.set('pauseBtnModel',pauseBtnModel);
		},
		getHintBtnModel:function getHintBtnModel(){
			return this.get('hintBtnModel');
		},
		setHintBtnModel:function setHintBtnModel(hintBtnModel){
			this.set('hintBtnModel',hintBtnModel);
		},						
		/**
		 * Initialization of the model
		 *
		 * @method initialize
		 */
		initialize: function() {
			this._createButtonModels();
		},
		_createButtonModels:function _createButtonModels(){
			this._createNextBtnModel()
					._createContinueBtnModel()
					._createExitBtnModel()
					._createPauseBtnModel()
					._createHintBtnModel();
		},
		_createNextBtnModel:function _createNextBtnModel(){			        
			var nextBtnModel=new ImagineLearning.Common.Models.ButtonModel({
					options : CommonModels.PlayerModel.BUTTON.NEXT_BUTTON.options.viewprops
				});
				this.setNextBtnModel(nextBtnModel);
				return this;
		},
		_createContinueBtnModel:function _createContinueBtnModel(){			        
			var continueBtnModel=new ImagineLearning.Common.Models.ButtonModel({
					options : CommonModels.PlayerModel.BUTTON.CONTINUE_BUTTON.options.viewprops
				});
				this.setContinueBtnModel(continueBtnModel);
				return this;
		},
		_createExitBtnModel:function _createExitBtnModel(){			        
			var exitBtnModel=new ImagineLearning.Common.Models.ButtonModel({
					options : CommonModels.PlayerModel.BUTTON.EXIT_BUTTON.options.viewprops
				});
				this.setExitBtnModel(exitBtnModel);
				return this;
		},
		_createPauseBtnModel:function _createPauseBtnModel(){			        
			var pauseBtnModel=new ImagineLearning.Common.Models.ButtonModel({
					options : CommonModels.PlayerModel.BUTTON.PAUSE_BUTTON.options.viewprops
				});
				this.setPauseBtnModel(pauseBtnModel);
				return this;
		},
		_createHintBtnModel:function _createHintBtnModel(){			        
			var hintBtnModel=new ImagineLearning.Common.Models.ButtonModel({
					options : CommonModels.PlayerModel.BUTTON.HINT_BUTTON.options.viewprops
				});
				this.setHintBtnModel(hintBtnModel);
				return this;
		}		
	},{
		BUTTON:{
    NEXT_BUTTON: {
      'options' : {
        'viewprops' : {
          'id' : 'top-right-next-button',
          'class' : 'top-right-next-button',
          'text' : ''
        }
      }
    },
    CONTINUE_BUTTON:{
      'options' : {
        'viewprops' : {
          'id' : 'left-panel-continue-btn',
          'class' : 'left-panel-continue-btn',
          'text' : 'Continue'
        }
      }    	
    },
    EXIT_BUTTON:{
      'options' : {
        'viewprops' : {
          'id' : 'left-panel-exit-btn',
          'class' : 'left-panel-exit-btn',
          'text' : 'Exit'
        }
      }    	
    },
    PAUSE_BUTTON:{
      'options' : {
        'viewprops' : {
          'id' : 'bottom-panel-pause-btn',
          'class' : 'bottom-panel-pause-btn',
          'text' : 'Pause'
        }
      }    	
    },
    HINT_BUTTON:{
      'options' : {
        'viewprops' : {
          'id' : 'bottom-panel-hint-btn',
          'class' : 'bottom-panel-hint-btn',
          'text' : 'Hint'
        }
      }    	
    }	
   }		
});
})(ImagineLearning.Common.Models);
