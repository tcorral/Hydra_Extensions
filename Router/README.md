# Router
Is an object that will execute a specific callback to initialize the current page. Similar to Backbone.js.
## What's different with Backbone.Router?
The difference is that Backbone.Router check the hash change in the url and Router check the id of the body element.
This allows to use this in pages that have a strong dependency of S.E.O.
## How it works
Router executes the defined callback when the browser launch the DOM ready event.
To execute any callback you need to add the new route before, then when the DOM ready is called Router search the id of the body element and search this id in the defined routes.
Only the defined routes and matched routes will be execute their callbacks.
# Router as Hydra.js extension
### Requirements
You will need to load it after the import of Hydra.js in your code.
Router also needs some event handler to manage the DOM ready event.
The only think that is required for this event handler is that must implement a 'ready' method to define the callback to be executed when the event is triggered.

Examples of allowed event handlers:

	//https://gist.github.com/1376157 by alessioalex
		DomReady.ready(function(){});

	//http://api.jquery.com/ready/
		$(document).ready(function(){});
### Add it in your code
We have created Router to be used with an without require.js
#### Simple
	<script type="text/javascript" src="Hydra.js"></script>
	<script type="text/javascript" src="Router.js"></script>
#### Using require.js
	require('router');
#Usage
Remember that is needed that the body element in page must have an id that will be the route key.
## Add Route
	Hydra.router.add('home', function()
	{
		alert('Hello world');
	});
#License
Router as Hydra.js extensions is licensed under MIT license. (see LICENSE file)