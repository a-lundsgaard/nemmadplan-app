
function arla() {

  const ingrHeaders = $('.c-recipe__ingredients-inner th').get().map(el => el.innerText)
  console.log(ingrHeaders)
  const ingredientData = $('.c-recipe__ingredients-inner td').get();


  const quantity = ingredientData.map(el => {
    let test = el.innerText.split(' ');
    let quantity = Number(replaceFractions(test[0]))
    return quantity ? quantity : test[1]
  })

  const unit = ingredientData.map(el => {
    let test = el.innerText.split(' ');
    return Number(test[1]) ? test[2] : test[1]
  })

  const ingredients = ingrHeaders.map( (header, i)=> ({ name: header, unit: unit[i], quantity: quantity[i]}));

  return {
    title: $('h1').text(),
    description: $('.c-recipe__instructions-steps').get().text(),
    ingredients: ingredients,
  };
}

module.exports = arla;