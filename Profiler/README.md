# Backbone wrapper
"Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface."
description in Backbone official [web](http://backbonejs.org/).
# Backbone wrapper as Hydra.js extension
This is only a wrapper to use Backbone object from inside Hydra.js.
### Requirements
You will need to load it after Backbone.js and Hydra.js in your code.
Remember that Backbone.js has some dependencies as:

* jQuery
* underscore

### Add it in your application
We have created Backbone wrapper to be used with and without require.js
#### Simple
	<script type="text/javascript" src="Hydra.js"></script>
	<script type="text/javascript" src="jQuery.js"></script>
	<script type="text/javascript" src="underscore.js"></script>
	<script type="text/javascript" src="backbone.js"></script>
	<!-- wrapper -->
	<script type="text/javascript" src="Backbone.js"></script>
#### Using require.js
	require('backbone_hydra_wrapper');
# Usage
Hydra.backbone is a wrapper for Backbone object and you can use it as you would if you used Backbone.js original object.
## Documentation
[See original documentation](http://backbonejs.org/)
# License
Backbone wrapper as Hydra.js extensions is licensed under MIT license. (see LICENSE file)