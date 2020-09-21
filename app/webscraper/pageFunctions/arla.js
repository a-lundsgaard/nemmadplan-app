
function arla() {

  console.log('Running page function')

  const ingrHeaders = $('.c-recipe__ingredients-inner th').get().map(el => el.innerText)
  console.log(ingrHeaders)

  const ingrData = $('.c-recipe__ingredients-inner td').get();

  const ingrMaengde = ingrData.map(el => el.innerText.split(' ')[0])
  const ingrEnhed = ingrData.map(el => el.innerText.split(' ')[1])
  const ingrobjs = ingrHeaders.map( (header, i)=> ({ name: header, unit: ingrEnhed[i], quantity: ingrMaengde[i]}))


  return {
    title: $('h1').text(),
    description: $('.c-recipe__instructions-steps').get().text(),
    ingredients: ingrobjs,
  };

}

module.exports = arla;