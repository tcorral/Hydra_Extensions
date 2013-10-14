var addEvent = function( oElement, sEvent, fpCallback )
{
	var sOnEvent = 'on' + sEvent;
	if ( oElement.addEventListener )
	{
		oElement.addEventListener( sEvent, fpCallback, false );
	}else if ( oElement.attachEvent )
	{
		oElement.attachEvent( sOnEvent, fpCallback);
	} else {
		oElement[sOnEvent] = fpCallback;
	}
	return fpCallback;
};