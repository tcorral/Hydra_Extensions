# BasicErrorHandler
ErrorHandler that logs in console, but if console is not active in your browser, logs in one layer that remains hidden until you want to open it.
To log in DOM BasicErrorHandler creates a list element and add an item for logged error.
# BasicErrorHandler as Hydra.js extension
## Requirements
You will need to load it after the import of Hydra.js in your code.
## Add it in your application
We have created BasicErrorHandler to be used with and without require.js
### Simple
	<script type="text/javascript" src="Hydra.js"></script
	<script type="text/javascript" src="BasicErrorHandler.js"></script>
### Using require.js
	require('basicErrorHandler');
# Usage
BasicErrorHandler usage is used 'only' internally by Hydra.js.
To create another ErrorHandler you  need an object with a 'log' and 'error' method.

# License
Deferred, Promise and When as Hydra.js extensions are licensed under MIT license. (see LICENSE file)