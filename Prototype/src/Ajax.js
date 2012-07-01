(function(win, Hydra, ajax, $$){
	'use strict';
	var Ajax,
		id = 0,
		head = $$('head')[0],
		global = win;

	/**
	 * Ajax prototype methods wrapper
	 * @type {Object}
	 */
	Ajax = {
		/**
		 * Executes a simple and configurable ajax call
		 * @param oConfig
		 * @return {XMLHttpRequest}
		 */
		call: function(oConfig)
		{
			return new ajax.Request(oConfig.url, oConfig);
		},
		/**
		 * Sugar method to make an ajax call expecting a JSON.
		 * @param {String} sUrl
		 * @param {Function} fpOnSuccess
		 * @param {String} sData
		 * @return {XMLHttpRequest}
		 */
		getJSON: function(sUrl, fpOnSuccess, sData)
		{
			return new ajax.Request(sUrl, {
				method: 'get',
				requestHeaders: {Accept: 'application/json'},
				parameters: sData,
				onSuccess: function(response, json)
				{
					fpOnSuccess(json);
				}
			});
		},
		/**
		 * Sugar method to make an ajax call expecting a Script.
		 * @param {String} sUrl
		 * @param {Function} fpOnSuccess
		 */
		getScript: function(sUrl, fpOnSuccess)
		{
			return new ajax.Request(sUrl,{
				method: "get",
				evalJS: 'true',
				evalScripts: 'true',
				onSuccess: function(response)
				{
					fpOnSuccess();
				}
			});
		},
		jsonP: function(sUrl, fpJSONCallback, fpOnError)
		{
			var script = document.createElement('script'),
				token = '__jsonp' + id;

			// callback should be a global function
			global[token] = function()
			{
				try
				{
					fpJSONCallback();
				}catch(erError)
				{
					fpOnError();
				}
			}

			// url should have "?" parameter which is to be replaced with a global callback name
			script.src = sUrl.replace(/\?(&|$)/, '__jsonp' + id + '$1');

			// clean up on load: remove script tag, null script variable and delete global callback function
			script.onload = function() {
				script.remove();
				script = null;
				delete global[token];
			};
			head.appendChild(script);

			// callback name should be unique
			id++;
		}
	};

	Hydra.extend("ajax", Ajax);
}(window, Hydra, Ajax, $$));