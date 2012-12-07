# Deferred
# Updated to version 2.0 now using Bus instead of Action
Is an object that allow users to assign callback functions for success and error conditions for a task that may not complete immediately. The callbacks in Deferred object are only called when all the conditions are resolved successfully.
# Promise
Deferred object delegates the resolution of the conditions to the Promise objects.
Promise object is the responsible of resolve or reject the condition.
While one of Promise objects is not resolved the execution of callbacks in Deferred object will wait until it does.
Promise and Deferred objects are used to defer the execution of depending asynchronous callbacks to the execution of all the callbacks, to be sure that all goes well.
# Deferred as Hydra.js extension
## Requirements
You will need to load it after the import of Hydra.js in your code.

Deferred and Promise objects make use of Hydra.action to listen and notify the 'complete' event to check that all Promise objects are resolved.
## Add it in your application
We have created Deferred to be used with and without require.js
### Simple
	<script type="text/javascript" src="Hydra.js"></script
	<script type="text/javascript" src="Deferred.js"></script>
### Using require.js
	require('deferred');
# Usage
To use Deferred we have two different ways:
## Instance Deferred and Promise objects
	var oDeferred = new Hydra.deferred(),
		oPromise1 = new Hydra.promise(),
		oPromise2 = new Hydra.promise();

	oDeferred.add(oPromise1)
			  .add(oPromise2)
			  .then(function(){alert('success');}, function(){alert('error');});

	setTimeout(function(){ oPromise1.resolve(); }, 500);
	setTimeout(function(){ oPromise2.resolve(); }, 1000);
## Use When
	var oPromise1 = new Hydra.promise(),
		oPromise2 = new Hydra.promise();

	Hydra.when(oPromise1, oPromise2).then(function(){alert('success');}, function(){alert('error');});

	setTimeout(function(){ oPromise1.resolve(); }, 500);
	setTimeout(function(){ oPromise2.resolve(); }, 1000);

# API
## Hydra.deferred
### add - Params [Promise]
This method expects a Promise object to be added to the Deferred object.

Chainable method.
### then - Params [sucessCallback, errorCallback]
This method expects two different callbacks.

* successCallback - This callback will be executed when all the Promise objects are resolved successfully.
* errorCallback - This callback will be executed if at least one of the Promise objects have failed.

Chainable method.

## Hydra.promise
### then - Params [sucessCallback, errorCallback]
This method expects two different callback, similar to Deferred method with the same name (see above)

* successCallback - This callback will be executed, before the successCallback defined in Deferred, when all the Promise objects are resolved successfully and  object.
* errorCallback - This callback will be executed, before the successCallback defined in Deferred, if at least one of the Promise objects have failed.

Chainable method.
### resolve - Params  [oResult]
This method resolves the Promise object successfully, must be called when the execution is right.
When this method is called the 'complete' event is called on Deferred object to check if all the Promises are resolved.
### reject - Params [oResult]
This method resolves the Promise object as failed, must be called when the execution is wrong.
When this method is called the 'complete' event is called on Deferred object to check if all the Promises are resolved.
## Hydra.when
This static method creates internally a Deferred object, so that When have the same API methods. It's important to pass at least one Promise object to this method.
### Hydra.when - Params [oPromise, [oPromiseN]]
Returns a Deferred object.

# License
Deferred, Promise and When as Hydra.js extensions are licensed under MIT license. (see LICENSE file)