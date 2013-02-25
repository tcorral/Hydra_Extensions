(function($, Hydra){
	'use strict';
	var DOM;
	function find(sSelector, oContext)
	{
		return $((oContext || document)).find(sSelector);
	}
	function toArray(oNodeList)
	{
		return $.makeArray(oNodeList);
	}

	/**
	 * DOM jQuery methods wrapper
	 * @type {Object}
	 */
	DOM = {
		/**
		 * Get element by Id
		 * @param {String} sId
		 * @param {Boolean} bBasicNode if true the element will be a DOM element, if false the element will be a jQuery object
		 * @return {Node/jQuery}
		 */
		byId: function(sId, bBasicNode)
    {
      var oNode = document.getElementById(sId);
      if(bBasicNode)
      {
        return oNode || null;
      }
      return $(oNode);
    },
		/**
		 * Return elements that have the classname provided as argument
		 * @param {String} sClassName
		 * @param {Element} oContext
		 * @param {Boolean} bBasicNode if true the element will be a NodeList of DOM elements, if false the element will be a jQuery object
		 * @return {NodeList}
		 */
		byClassName: function(sClassName, oContext, bToArray)
		{
			var $NodeList = find("." + sClassName, oContext);
			if(bToArray)
			{
				return toArray($NodeList);
			}
			return $NodeList;
		},
		/**
		 * Return elements of the same type as tag name provided as argument
		 * @param {String} sTagName
		 * @param {Element}oContext
		 * @param {Boolean} bBasicNode if true the element will be a NodeList of DOM elements, if false the element will be a jQuery object
		 * @return {NodeList}
		 */
		byTagName: function(sTagName, oContext, bToArray)
		{
			var $NodeList = find(sTagName, oContext);
			if(bToArray)
			{
				return toArray($NodeList);
			}
			return $NodeList;
		},
		/**
		 * Return elements provided by the css3 selector
		 * @param {String} sCss3Selector
		 * @param {Element} oContext
		 * @param {Boolean} bBasicNode if true the element will be a NodeList of DOM elements, if false the element will be a jQuery object
		 * @return {NodeList}
		 */
		byCssSelector: function(sCssSelector, oContext, bToArray)
		{
			var $NodeList = find(sCssSelector, oContext);
			if(bToArray)
			{
				return toArray($NodeList);
			}
			return $NodeList;
		}
	};
	Hydra.extend("dom", DOM);
}(jQuery, Hydra));