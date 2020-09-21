

// f.eks. https://www.valdemarsro.dk/pandekager/

function valdemarsro() {

  console.log('Running page function')

  const ingredientData = $('#recipe-intro').find('[itemprop="recipeIngredient"]').get();
  const ingrHeaders = ingredientData.map(el => el.innerText.split(' ').slice(2).join(' '))

  console.log(ingrHeaders)

  const quantity = ingredientData.map(el => el.innerText.split(' ')[0])

  console.log(quantity)
  const unit = ingredientData.map(el => el.innerText.split(' ')[1])

  console.log(unit)
  const ingredients = ingrHeaders.map( (header, i)=> ({ name: header, unit: unit[i], quantity: quantity[i]}))

  console.log(ingrHeaders)


  return {
    title: $('h1').text(),
    description: $('#recipe-intro div.content').get().text(),
    ingredients: ingredients,
  };

}

module.exports = valdemarsro;