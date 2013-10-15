#Delegate
# Updated to version 1.0
Delegate is an extension that register a base module to delegate events to document instead of attach events to different elements in DOM.
This module will save a lot of memory in your applications.
## Requirements
You will need to load it after Hydra.js and after all the files stored in the utilities folder in this repo.
## Add it in your application
We have created Delegate to be used with and without require.js
### Simple
	<script type="text/javascript" src="Hydra.js"></script>
	// Crossbrowsing Array.prototype.indexOf implementation
	<script type="text/javascript" src="utilities/array_indexOf.js"></script>
	// Crossbrowsing function to convert NodeList to Array
	<script type="text/javascript" src="utilities/nodelist_to_array.js"></script>
	// Crossbrowsing function to attach events to DOM elements.
	<script type="text/javascript" src="utilities/events.js"></script>
### Using require.js
	require('utilities/events', 'utilities/array_indexOf', 'utilities/nodelist_to_array', 'delegate');
#Usage
To use Delegate you only need to extend the 'delegate-base-module'. See extend docs in [http://tcorral.github.io/Hydra.js/#documentation].
## Extending 'delegate-base-module'
	Hydra.module.extend( 'delegate-base-module', 'new-module-with-delegation', function ( oBus )
	{
		return {
			domEvents: {
				'click .test': function ( eEvent )
				{
					//The context of this function is the element that we expect trigger the event.
				}
			},
			init: function ()
			{
				this.__super__.__call__('init');	// Needed to execute the delegation of events.
				// Some start code.
			},
			onDestroy: function ()
			{
				// Some stop code.
				this.__super__.__call__('onDestroy');	// Needed to execute the unbind of events.
			}
		};
	} );
# License
Delegate as Hydra.js extensions are licensed under MIT license. (see LICENSE file)