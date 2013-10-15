(function( win, doc, Hydra)
{
  Hydra.module.extend('delegate-base-module', 'example', function ( oBus )
  {
    return {
      domEvents: {
        'keydown document': function ( eEvent )
        {
          var list = document.getElementById( 'results' );
          var item = document.createElement( 'li' );
          item.innerHTML = 'keydown document ' + eEvent.keyCode;
          list.appendChild( item );
          eEvent.preventDefault();
        },
        'click a': function ( eEvent )
        {
          var list = document.getElementById( 'results' );
          var item = document.createElement( 'li' );
          item.innerHTML = 'click a ' + this.innerHTML;
          list.appendChild( item );
          eEvent.preventDefault();
        },
        'click a[href="#"]': function ( eEvent )
        {
          var list = document.getElementById( 'results' );
          var item = document.createElement( 'li' );
          item.innerHTML = 'click a[href="#"] ' + this.innerHTML;
          list.appendChild( item );
          eEvent.preventDefault();
        },
        'click th': function ( eEvent )
        {
          var list = document.getElementById( 'results' );
          var item = document.createElement( 'li' );
          item.innerHTML = 'click th ' + this.innerHTML;
          list.appendChild( item );
          eEvent.preventDefault();
        },
        'click td': function ( eEvent )
        {
          var list = document.getElementById( 'results' );
          var item = document.createElement( 'li' );
          item.innerHTML = 'click td ' + this.innerHTML;
          list.appendChild( item );
          eEvent.preventDefault();
        },
        'click tr:nth-child(even)': function ( eEvent )
        {
          var list = document.getElementById( 'results' );
          var item = document.createElement( 'li' );
          item.innerHTML = 'click tr:nth-child(even) ' + ( this.textContent || this.innerText );
          list.appendChild( item );
          eEvent.preventDefault();
        }
      },
      init: function()
      {
        this.__super__.__call__( 'init' );
      },
      onDestroy: function()
      {
        this.__super__.__call__( 'onDestroy' );
      }
    };
  } );
}(window, document, Hydra));