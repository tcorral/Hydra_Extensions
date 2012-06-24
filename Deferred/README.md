# Deferred
Is an object that allow users to assign callback functions for success and error conditions for a task that may not complete immediately. The callbacks in Deferred object are only called when all the conditions are resolved.
# Promise
Deferred object delegates the resolution of the conditions to the Promise objects.
Promise object is the responsible of resolve or reject the condition.
While one of Promise objects is not resolved the execution of callbacks in Deferred object will wait until it does.
# Deferred as Hydra.js extension
## Requirements
You will only need to load it after the import of Hydra.js in your code.
## Add it in your code
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

#License
Deferred, Promise and When as Hydra.js extensions are licensed under MIT license. (see LICENSE file)