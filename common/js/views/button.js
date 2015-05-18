(function() {
	'use strict';
	
		ButtonView = Backbone.View.extend({
		/**
		 * Initialization of the view
		 *
		 * @method initialize
		 */
		'initialize' : function() {
			this.options = this.model.getOptions();
			this.render(this.options)._bindEvents();
		},

		/**
		 * Events of this view
		 *
		 * @method events
		 * @returns {Object} which contains the events.
		 */
		'events' : function() {
			return {
				'click' : '_onMouseClick',
				'touchstart' : '_onMouseOver',
				'mouseover' : '_onMouseOver',
				'touchend' : '_onMouseOut',
				'mouseout' : '_onMouseOut',
				'mousedown' : '_onMouseDown',
				'mouseup' : '_onMouseUp'
			};
		},
		/**
		 * Renders this view
		 * @method render
		 * @public
		 */
		'render' : function(options) {
			var $thisButton = this.$el,
			    text,
			    baseClass = this.options.class,
			    btnState = this.model.getState();
			if (baseClass !== null && baseClass !== undefined) {
				$thisButton.addClass('common-button ' + baseClass + ' ' + btnState);
			} else {
				$thisButton.addClass('common-button ' + btnState);
			}
			text = options.text;
			if (text) {
				this.$el.append("<div class ='button-text'>" + text + "</div> ");
			}
			this._stateChange();
			return this;
		},
		/**
		 * Bimd Events
		 * @method _bindEvents
		 * @private
		 */
		'_bindEvents' : function _bindEvents() {
			this.listenTo(this.model, "change:state", this._stateChange);
		},
		/**
		 * Callback function for mouse down event.
		 *
		 * @method _onMouseDown
		 * @private
		 */
		'_onMouseDown' : function _onMouseDown(event) {
			$(document).on({
				'mouseup.capture' : $.proxy(this._onMouseUp, this),
				'touchend.capture' : $.proxy(this._onMouseUp, this)
			});
			if (!this._isButtonActive()) {
				return;
			}
			this.$el.addClass('down');
		},

		/**
		 * Callback function for mouse up event.
		 *
		 * @method _onMouseUp
		 * @private
		 */
		'_onMouseUp' : function _onMouseUp(event) {

			if (!this._isButtonActive()) {
				return;
			}
			this.$el.removeClass('down');
			$(document).off('capture');

		},

		/**
		 * Callback function for mouseover event.
		 *
		 * @method _mouseover
		 * @private
		 */
		'_onMouseOver' : function _onMouseOver(event) {
			if (!this._isButtonActive()) {
				return;
			}
			this.$el.addClass('hover');
		},

		/**
		 * Callback function for mouseout event.
		 *
		 * @method _mouseout
		 * @private
		 */
		'_onMouseOut' : function _onMouseOut(event) {
			this.$el.removeClass('hover');

		},

		/**
		 * Callback function for mouse click event.
		 *
		 * @method _onMouseClick
		 * @private
		 */
		'_onMouseClick' : function _onMouseClick(event) {
			if (!this._isButtonActive()) {
				return;
			}
			this.trigger(ButtonView.EVENTS.CLICKED, event);
		},

		/**
		 * Returns button state.
		 *
		 * @method _isButtonActive
		 * @return {Boolean}
		 * @private
		 */
		'_isButtonActive' : function _isButtonActive() {
			if (this.model.getState() === ButtonModel.STATES.ACTIVE) {
				return true;
			}
			return false;
		},

		/**
		 * Changes the state of button
		 *
		 * @method _stateChange
		 * @private
		 */
		'_stateChange' : function _stateChange() {
			var state = this.model.getState(),
			    buttonStates = ButtonModel.STATES,
			    $el = this.$el;

			if (state === buttonStates.ACTIVE) {
				$el.removeClass('disabled');
				$el.addClass('active');
			} else if (state === buttonStates.DISABLED) {
				$el.removeClass('active ');
				$el.addClass('disabled');
			}

		}
	}, {
		/**
		 * Events of the button.
		 * @property EVENTS
		 * @type {Object}
		 */
		'EVENTS' : {
			'CLICKED' : 'clicked'
		}
	});
})();
