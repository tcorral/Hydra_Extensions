define(['hydra'], function(Hydra){
	'use strict';
  var ErrorHandler, oConsole, _null_, doc;

  /**
   * Property that contains the access to the global.console object.
   * @private
   * @type {Object}
   */
  oConsole = global.console;

  /**
   * Assign global.document (window.document) to a local variable.
   */
  if ( global.document )
  {
    doc = global.document;
  }

  /**
   * Converts objects like node list to real array.
   * @private
   * @param {Object} oLikeArray
   * @param {Number} nElements
   * @return {Array}
   */
  function slice( oLikeArray, nElements )
  {
    return [].slice.call( oLikeArray, nElements || 0 );
  }

  /**
   * Contains a reference to null object to decrease final size
   * @type {Object}
   * @private
   */
  _null_ = null;

  /**
   * Class to manage the errors in modules
   * @constructor
   * @class ErrorHandler
   * @name ErrorHandler
   */
  ErrorHandler = function ()
  {
  };

  /**
   * type is a property to be able to know the class type.
   * @member ErrorHandler
   * @static
   * @type String
   */
  ErrorHandler.type = 'ErrorHandler';

  /**
   * list is a property that will store the DOM object list reference.
   * Null by default.
   * @member ErrorHandler
   * @static
   * @type Object
   */
  ErrorHandler.list = _null_;

  /**
   * create_dom is the method that will create the hidden layer to log the errors
   * on system without console.
   * @member ErrorHandler
   * @private
   * @static
   */
  ErrorHandler._create_dom = function ()
  {
    var oLayer, oList, oLayerStyle;
    oLayer = doc.createElement( "div" );
    oList = doc.createElement( "ul" );
    oLayerStyle = oLayer.style;
    this.list = oList;

    oLayerStyle.display = 'none';
    oLayerStyle.position = "fixed";
    oLayerStyle.height = "100px";
    oLayerStyle.width = "100%";
    oLayerStyle.bottom = "0px";
    oLayer.appendChild( oList );
    doc.body.appendChild( oLayer );

    oLayer = _null_;
    oList = _null_;
    oLayerStyle = _null_;
  };

  /**
   * addItem is the method that will add a new item to the list to log the errors
   * on system without console.
   * @member ErrorHandler
   * @static
   * @param {String} sModuleId
   * @param {String} sMethod
   * @param {Error} erError
   */
  ErrorHandler.addItem = function ( sModuleId, sMethod, erError )
  {
    var oItem;
    oItem = doc.createElement( "li" );

    oItem.appendChild( doc.createTextNode( sModuleId + "/" + sMethod + ": " + erError.message ) );
    this.list.appendChild( oItem );

    oItem = _null_;
  };

  /**
   * Methods storage system.
   * @type {{}}
   */
  ErrorHandler.methods = {};
  ErrorHandler.methods.error = [];
  ErrorHandler.methods.error[0] = function ()
  {
    var aArgs = slice( arguments, 0 ).concat();
    if ( this.list === _null_ )
    {
      ErrorHandler._create_dom();
    }
    ErrorHandler.addItem.apply( this, aArgs );
  };
  ErrorHandler.methods.error[1] = function ()
  {
    var aArgs = slice( arguments, 0 ).concat();
    oConsole.error.apply( oConsole, aArgs );
  };
  /**
   * Log methods array
   * @type {Array}
   */
  ErrorHandler.methods.log = [];
  /**
   * Log method if there is no console or console.log
   * Creates a list and add log items to it.
   */
  ErrorHandler.methods.log[0] = function ()
  {
    var aArgs = slice( arguments, 0 ).concat();
    if ( this.list === _null_ )
    {
      ErrorHandler._create_dom();
    }
    ErrorHandler.addItem.apply( this, aArgs );
  };
  /**
   * Log method if there is a console and console.log
   * Use the native console.log to log items in console.
   */
  ErrorHandler.methods.log[1] = function ()
  {
    var aArgs = slice( arguments, 0 ).concat();
    oConsole.log.apply( oConsole, aArgs );
  };

  /**
   * error is the method that will differentiate the system if they had console or not.
   * if global.console exist console.error will be called
   * if global.console not exist then the error on layer will be activated.
   * Arguments are sent to the methods that will be applied.
   * @param {String} sModuleId
   * @param {String} sName
   * @param {Error} erError
   * @member ErrorHandler
   * @static
   */
  ErrorHandler.error = function ( sModuleId, sName, erError )
  {
    var aArgs = slice( arguments, 0 ).concat();
    var bExistConsoleLog = typeof oConsole !== "undefined" && typeof oConsole.error !== "undefined";
    ErrorHandler.methods.error[Number( bExistConsoleLog )].apply( ErrorHandler, aArgs );
  };
  /**
   * log is the method that will differentiate the system if they had console or not.
   * if global.console exist console.log will be called
   * if global.console not exist then the log on layer will be activated.
   * Arguments are sent to the methods that will be applied.
   * @param {String} sModuleId
   * @param {String} sName
   * @param {Error} erError
   * @member ErrorHandler
   * @static
   */
  ErrorHandler.log = function ( sModuleId, sName, erError )
  {
    var aArgs = slice( arguments, 0 ).concat();
    var bExistConsoleLog = typeof oConsole !== "undefined" && typeof oConsole.log !== "undefined";
    ErrorHandler.methods.log[Number( bExistConsoleLog )].apply( ErrorHandler, aArgs );
  };

  Hydra.setErrorHandler( ErrorHandler );
});