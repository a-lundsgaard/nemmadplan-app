

// f.eks. https://www.arla.dk/opskrifter/boller-i-karry/

function arla() {

  console.log('Running page function')

  const ingrHeaders = $('.c-recipe__ingredients-inner th').get().map(el => el.innerText)
  console.log(ingrHeaders)

  const ingredientData = $('.c-recipe__ingredients-inner td').get();

  const quantity = ingredientData.map(el => el.innerText.split(' ')[0])
  const unit = ingredientData.map(el => el.innerText.split(' ')[1])
  const ingredients = ingrHeaders.map( (header, i)=> ({ name: header, unit: unit[i], quantity: quantity[i]}))


  return {
    title: $('h1').text(),
    description: $('.c-recipe__instructions-steps').get().text(),
    ingredients: ingredients,
  };

}

module.exports = arla;