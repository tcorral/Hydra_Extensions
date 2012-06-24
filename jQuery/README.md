# jQuery wrapper
"jQuery is a fast and concise JavaScript Library that simplifies HTML document traversing, event handling, animating, and Ajax interactions for rapid web development. jQuery is designed to change the way that you write JavaScript." description in jQuery official [web](http://jquery.com/)
# jQuery wrapper as Hydra.js extension
One of the benefits of Hydra.js is that is framework agnosthic and this type of wrappers are needed to maintain it this inside modules.
This wrapper is divided in three different files:

* DOM
* Ajax
* Events

These three parts are most used and most important to develop your modules, and will allow you to change the framework without having to change the code in the rest of modules.
I recommend you to add the three files but it's not mandatory.
### Requirements
You will need to load it after jQuery and Hydra.js in your code.
### Add it in your application
We have created jQuery wrapper to be used with and without require.js
#### Simple
	<script type="text/javascript" src="Hydra.js"></script>
	<script type="text/javascript" src="jQuery.js"></script>
	<!-- wrappers -->
	<script type="text/javascript" src="DOM.js"></script>
	<script type="text/javascript" src="Ajax.js"></script>
	<script type="text/javascript" src="Events.js"></script>
#### Using require.js
	require('ajax');
	require('dom');
	require('events');
# Usage
These files are wrappers for jQuery functionalities, but with a different API but so similar that anyone using jQuery could start working with these wrappers in no time.
# API
## Hydra.ajax
### call - Params [oConfig]
This method wraps $.ajax [original](http://api.jquery.com/jQuery.ajax/)
### getJSON - Params [sUrl, fpOnSuccess, sData]
This method wraps $.getJSON [original] (http://api.jquery.com/jQuery.getJSON/)
### getScript - Params [sUrl, fpOnSuccess]
This method wraps $.getScript [original] (http://api.jquery.com/jQuery.getScript/)
### jsonP - Params [sUrl, fpJSONCallback, fpOnError]
This method allows you to make Ajax calls to a different domain using jsonP.
Arguments:

* sUrl - [mandatory] Url where $.ajax will make the call.
* fpJSONCallback - [mandatory] Callback that will be executed when receiving the JSON object from server.
* fpOnError - [mandatory] Callback that will be executed if something is wrong when executing the call.

## Hydra.dom
### byId - Params [sId, oContext, bBasicNode]
Arguments:

* sId - [mandatory] String with the id of the DOM element you expect to get.
* oContext - [optional] Dom element/ jQuery object where start to search for the DOM element you expect to get.
* bBasicNode - [optional] If false a jQuery object is returned. If true a DOM element is returned.

### byClassName - Params [sClassName, oContext, bToArray]
Arguments:

* sClassName - [mandatory] String with the class name that we are searching in DOM.
* oContext - [optional] Dom element/ jQuery object where start to search for DOM elements.
* bToArray - [optional] If false a jQuery object is returned. If true an Array of elements is returned.

### byTagName - Params [sTagName, oContext, bToArray]
Arguments:

* sTagName - [mandatory] String with the tag name that we are searching in DOM.
* oContext - [optional] Dom element/ jQuery object where start to search for DOM elements.
* bToArray - [optional] If false a jQuery object is returned. If true an Array of elements is returned.

### byCssSelector - Params [sCssSelector, oContext, bToArray]
Arguments:

* sCssSelector - [mandatory] String with the selector that we are searching in DOM.
* oContext - [optional] Dom element/ jQuery object where start to search for DOM elements.
* bToArray - [optional] If false a jQuery object is returned. If true an Array of elements is returned.

## Hydra.events
### bind - Params [sType, sSelector, fpCallback, aData]
This method wraps $.fn.bind [original](http://api.jquery.com/bind/)
Arguments:

* sType - [mandatory] String with the event type to bind.
* sSelector - [mandatory] String with the selector or a DOM element.
* fpCallback - [mandatory] Callback to execute when the event is triggered.
* aData - [optional] Array of params to send to fpCallback when triggered.

### trigger - Params [sType, sSelector, aExtraParams]
This method wraps $.fn.trigger [original](http://api.jquery.com/trigger/)
Arguments:

* sType - [mandatory] String with the event type to trigger.
* sSelector - [mandatory] String with the selector or a DOM element.
* aExtraParams - [optional] Array of params being sent to the callback that will be executed.

### unbind - Params [sType, sSelector, fpCallback]
This method wraps $.fn.unbind [original](http://api.jquery.com/unbind/)
Arguments:

* sType - [mandatory] String with the event type to bind.
* sSelector - [mandatory] String with the selector or a DOM element.
* fpCallback - [optional] Callback to being removed from the event handler for this type of event. If this is not supplied all the bind callbacks will be removed.

# License
Deferred, Promise and When as Hydra.js extensions are licensed under MIT license. (see LICENSE file)