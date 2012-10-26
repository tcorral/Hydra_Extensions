# Sandbox
Is the old object that manages the events in Hydra.js
This extension must be used to maintain backward compatibility with lower version than 2.8.0
## How it works
Sandbox is used to manage global events, and this extension is needed to maintain compatibility with previous version to 2.8.0 of Hydra when the new Bus object has been implemented.
# Sandbox as Hydra.js extension
### Requirements
You will need to load it after the import of Hydra.js in your code.
We have created Sandbox to be used with an without require.js
#### Simple
	<script type="text/javascript" src="Hydra.js"></script>
	<script type="text/javascript" src="Sandbox.js"></script>
#### Using require.js
	require('sandbox');
#Usage
Remember that is needed that the body element in page must have an id that will be the route key.
## Listening an event
	new Hydra.action().listen( ['eventType'], callback, module );
## Triggering an event
	new Hydra.action().notify( { type: 'eventType', data: {} } );
## Stop Listening an event
	new Hydra.action().stopListen( ['eventType'], module );
# License
Sandbox as Hydra.js extensions is licensed under MIT license. (see LICENSE file)