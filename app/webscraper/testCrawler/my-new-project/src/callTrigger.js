
const triggerWebScraper = require('./src/trigger');


// trigger funktion der skal læse i outputfilen


let url = 'https://www.arla.dk/opskrifter/boller-i-karry/';
module.exports = url;
triggerWebScraper().then(res => console.log(res) );


/*  (
async function hi() {

  const res = await triggerWebScraper()
  console.log(res)
}

  )();*/

//var saved;
/*triggerWebScraper(function (saved) {
  console.log('Calling from call back')
  console.log(saved)
})*/




