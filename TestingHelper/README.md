# TestingHelper
Is a testing extension helper that add some helper methods to make easy test all Hydra modules.
## Requirements
You will need to load it after the import of Hydra.js in your code.

Deferred and Promise objects make use of Hydra.action to listen and notify the 'complete' event to check that all Promise objects are resolved.
## Add it in your application
We have created TestingHelper to be used with and without require.js
### Simple
	<script type="text/javascript" src="Hydra.js"></script
	<script type="text/javascript" src="TestingHelper.js"></script>
### Using require.js
	require('testingHelper');
# Usage
TestingHelper add some methods to Hydra.js library.
## Hydra.setTestFramework
*This method is needed to set which test framework we will use. If the test framework is not set the other methods will not work.*
	Hydra.setTestFramework( oTestFramework );
## Hydra.module.getModule
This method returns a instance of the module is useful to use it when you want a module to be accessible in your tests.
	Hydra.module.getModule( sModuleId, sIdInstance );
## Hydra.module.test
This method returns a module that will not wrap any method allowing you to test it and get the errors.
	Hydra.module.test( sModuleId, function (oModule) {
		//Here you will have the not wrapped module to be used in your test
	});

TIP: You could set a variable where save the oModule in this way.

	var oModule = null;
	Hydra.module.test( 'moduleId', function(oMod) {
		oModule = oMod;
	});

# API
## Hydra
### setTestFramework - Params [Object - framework test]
This method expects an object [Jasmine, jstestdriver...]

## Hydra.module
### getModule - Params [String - identifier of Module, String - identifier of Instance]
### test - Params [String - identifier of Module, Function - callback where use Module]

*Tip: You can see how it can be used in the test file of Hydra.js [HydraTest](https://github.com/tcorral/Hydra.js/blob/master/test/HydraTest.js)*

# License
TestingHelper as Hydra.js extensions is licensed under MIT license. (see LICENSE file)