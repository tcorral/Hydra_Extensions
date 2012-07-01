(function ( win, Hydra, $$, Event, Element ) {
	'use strict';
	var Events,
		oEventData = {};
	/**
	 * Event.simulate(@element, eventName[, options]) -> Element
	 *
	 * - @element: element to fire event on
	 * - eventName: name of event to fire (only MouseEvents and HTMLEvents interfaces are supported)
	 * - options: optional object to fine-tune event properties - pointerX, pointerY, ctrlKey, etc.
	 *
	 *    $('foo').simulate('click'); // => fires "click" event on an element with id=foo
	 *
	 **/
	var eventMatchers = {
		'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
		'MouseEvents': /^(?:click|mouse(?:down|up|over|move|out))$/
	}
	var defaultOptions = {
		pointerX: 0,
		pointerY: 0,
		button: 0,
		ctrlKey: false,
		altKey: false,
		shiftKey: false,
		metaKey: false,
		bubbles: true,
		cancelable: true
	}

	Event.simulate = function(element, eventName) {
		var options = Object.extend(defaultOptions, arguments[2] || { });
		var oEvent, eventType = null;

		element = $(element);

		for (var name in eventMatchers) {
			if (eventMatchers[name].test(eventName)) { eventType = name; break; }
		}

		if (!eventType)
		{
			element.fire(eventName);
		}

		if (document.createEvent) {
			oEvent = document.createEvent(eventType);
			if (eventType == 'HTMLEvents') {
				oEvent.initEvent(eventName, options.bubbles, options.cancelable);
			}
			else {
				oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
					options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
					options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
			}
			element.dispatchEvent(oEvent);
		}
		else {
			options.clientX = options.pointerX;
			options.clientY = options.pointerY;
			oEvent = Object.extend(document.createEventObject(), options);
			element.fireEvent('on' + eventName, oEvent);
		}
		return element;
	};

	Element.addMethods({ simulate: Event.simulate });
	/**
	 * Events jQuery methods wrapper
	 * @type {Object}
	 */
	Events = {
		/**
		 * Binds an event handler to one element
		 * @param {String} sType
		 * @param {String/Element} sSelector
		 * @param {Function} fpCallback
		 * @param {Array} aData
		 */
		bind: function ( sType, sSelector, fpCallback, aData ) {
			aData = aData || [];
			var fpOnTrigger = function(event)
			{
				var oElement = event.element();
				event.data = aData;
				fpCallback.call(oElement, event);
			};
			if(typeof oEventData[sSelector] === 'undefined')
			{
				oEventData[sSelector] = [];
			}
			if(typeof oEventData[sSelector][sType] === 'undefined')
			{
				oEventData[sSelector][sType] = [];
			}
			oEventData[sSelector][sType].push(fpOnTrigger);
			$$(sSelector).observe(sType, fpOnTrigger);
		},
		/**
		 * Triggers an event hander in one element
		 * @param {String} sType
		 * @param {String/Element} sSelector
		 * @param {Array} aExtraParams
		 */
		trigger: function ( sType, sSelector ) {
			if(typeof oEventData[sSelector] === 'undefined')
			{
				return false;
			}
			if(typeof oEventData[sSelector][sType] === 'undefined')
			{
				return false;
			}
			$$(sSelector).simulate(sType);
		},
		/**
		 * Unbinds an event handler of one element
		 * @param {String} sType
		 * @param {String/Element} sSelector
		 * @param {Function} fpCallback
		 * @param {Array} aData
		 */
		unbind: function ( sType, sSelector, fpCallback ) {
			$$(sSelector).stopObserving(sType, oEventData[sSelector][sType]);
		}
	};
	Hydra.extend( "events", Events );
}( window, Hydra,  $$, Event, Element ));