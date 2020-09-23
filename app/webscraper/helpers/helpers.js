


// arr = alle the units listed in the google sheet
exports.checkIngredient = ( obj, arr )=> {
  obj.unit = arr.includes(obj.unit) ? obj.unit :
    obj.name.includes('hvidløg') ? 'fed' :
      !obj.quantity ? '' :
        'stk';

  return obj;
};


/*function addScript( src ) {
  let s = document.createElement( 'script' );
  s.setAttribute( 'src', src );
  s.setAttribute('type', 'module')
  document.body.appendChild( s );
}*/



