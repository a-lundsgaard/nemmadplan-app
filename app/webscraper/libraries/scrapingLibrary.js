/*const $ = (selector) =>  {
  const nodeList = Array.from(document.querySelectorAll(selector));
  return nodeList.length === 1 ? nodeList[0] : nodeList;
};*/

Array.prototype.text = function () { return this.map(el=> el.innerText).join(' ')};
//Object.prototype.text = function () { return this.innerText || null};

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