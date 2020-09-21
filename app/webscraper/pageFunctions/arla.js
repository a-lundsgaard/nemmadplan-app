

// f.eks. https://www.arla.dk/opskrifter/boller-i-karry/

//const cleanIngredients = require('./helpers/helpers');




//module.exports = cleanIngredients;


function arla() {
  function cleanIngredients(arr) {

    arr.forEach((obj, index)=> {
      //  let {name, unit, quantity} = obj;
      if (obj.unit) {
        if(Number(obj.unit) && !Number(obj.quantity)) {
          obj.quantity = obj.unit;
          obj.unit='';
        }
        //    arr.splice(index, 1, )
      }
    })

    console.log(arr);
  }

  console.log('Running page function')

  const ingrHeaders = $('.c-recipe__ingredients-inner th').get().map(el => el.innerText)
  console.log(ingrHeaders)

  const ingredientData = $('.c-recipe__ingredients-inner td').get();

  const convertQuantities = {
    "½" : 0.5,
    '¾' : 0.75,
    "¾ " : 0.25
  }


  const replace = el => el.replace(/½/gi, ".5").replace(/¾/gi, ".75").replace(/¼ /gi, ".25")

  const quantity = ingredientData.map(el => {
    let test = el.innerText.split(' ');
    let quantity = Number(replace(test[0]))
    return quantity ? quantity : test[1]
  })

  const unit = ingredientData.map(el => {
    let test = el.innerText.split(' ');
    return Number(test[1]) ? test[2] : test[1]
  })

  const ingredients = ingrHeaders.map( (header, i)=> ({ name: header, unit: unit[i], quantity: quantity[i]}))

  return {
    title: $('h1').text(),
    description: $('.c-recipe__instructions-steps').get().text(),
    ingredients: ingredients,
  };

}

module.exports = arla;