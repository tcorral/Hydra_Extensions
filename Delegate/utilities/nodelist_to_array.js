var getArray = function ( oNodeList )
{
  var nIndex, nLen = oNodeList.length, aNodes;
  try{
    return [].call( oNodeList );
  }catch( erError )
  {
    aNodes = [];
    for( nIndex = 0; nIndex < nLen; nIndex ++ )
    {
      aNodes.push( oNodeList[nIndex] );
    }
    return aNodes;
  }
};