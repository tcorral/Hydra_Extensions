# Profiler
This plugin has been created to know how many events are consumed and how many modules are initialized.

### Requirements
Nothing more than Hydra.js version >= 3.2.0

### Add it in your application
We have created Profiler to be used with and without require.js
#### Simple
	<script type="text/javascript" src="Hydra.js"></script>
	<!-- profiler -->
	<script type="text/javascript" src="Profiler.js"></script>
#### Using require.js
	require('profiler_hydra');
# Usage
Profiler has two different methods that could be used to know the sanity of your Hydra.js application.

#### subscribersCount
This method accepts an optional argument. This argument is a boolean value, if this argument is true it will return an object else it will return a number.
##### With argument equals to true
	Hydra.profiler.subscribersCount(true);
###### It will return something like
	{
		'channel|event': 10 // This number is the number of subscribers that these event has.
		TOTAL: 10
	}
#### Without argument or with arguments equals to false
	Hydra.profiler.subscribersCount();
##### It will return a number
	10

#### modulesCount:
This method accepts an optional argument. This argument is a boolean value, if this argument is true it will return an object else it will return a number.
##### With argument equals to true
	Hydra.profiler.modulesCount(true);
###### It will return something like
	{
		'module_name': { "instances": {'id_instance_1': { ... } },
		TOTAL: 1
	}
##### Without argument or with arguments equals to false
	Hydra.profiler.modulesCount();
###### It will return a number
	1
# License
Profiler as Hydra.js extensions is licensed under MIT license. (see LICENSE file)
# Author
MeZKaL