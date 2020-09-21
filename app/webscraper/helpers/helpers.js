
function cleanIngredients(arr) {

  arr.forEach((obj, index)=> {
  //  let {name, unit, quantity} = obj;
    if (obj.unit) {
      if(Number(obj.unit) && !Number(obj.quantity)) obj.quantity = obj.unit;

    //    arr.splice(index, 1, )
    }
  })

  console.log(arr);
}

module.exports = cleanIngredients;


const units = [
  'dl',
  'g',
  'stk',
  'kk'
]