const { default: fetch } = require('node-fetch');
const puppeteer = require('puppeteer');
const nemlig = require('./pageFunctions/nemlig.com');
const rema1000 = require('./pageFunctions/rema1000');



async function runShoppingListCrawler (url, pageFunction, preferences) {

    console.log('Starting crawler...');
    console.log(preferences);

    try {
      console.log('Launching pupeteer...')
      const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox",'--start-maximized'], // "--no-sandbox" === for heroku to use puppetteer [1] = starts browser maximized
      defaultViewport: null, // launches the browser in full screen
      ignoreDefaultArgs: ["--enable-automation"] // disabling "chrome is controlled by automated software" warning

      });
      const page = await browser.newPage();

      // closes the first chromium tab
      browser.on('targetcreated', async function f() {
          let pages = await browser.pages();
          if (pages.length > 1) {
              await pages[0].close();
              browser.off('targetcreated', f);
          }
      });

      console.log('Entering url: ' + url);
      await page.goto(url, {timeout: 30000});

      // runs custom javascript as if we were in the console
      console.log('Running page function...')
      const scrapedData = await page.evaluate(pageFunction, preferences);

      console.log(scrapedData);
      // browser.disconnect();
      console.log('Finishing webscraper...');
      return scrapedData;

  } catch (e) {
    console.log(e)
    throw e
  }
}




const preferences = {
  products: [
      'olivenolie', 
      'rugbrød', 
      'vaskemiddel flydende hvid', 
      'minimælk',
      'kyllingepålæg',
      'rødløg',
      'lagereddike',
      'leverpostej',
      'bønnespirer',
      'agurk',
      'halloumi',
      'mayonnaise',
      'chilifrugt',
      'spidskål',
      'cherrytomat',
      'æg',
      'purløg',
      'salatost',
      'tærtedej',
      'snackpeber',
      'hytteost',
      'avocado'
    ],
 // products: ['vand'],
  profile: {
    price: 1, // prisniveau
    organic: '',
    form: '', // frost etc
    brand:  {
        brands : [],
        wanted: true
    }
  }
};

//runShoppingListCrawler("https://www.nemlig.com/", nemlig, preferences).then(res => res).catch(console.error);
//runShoppingListCrawler("https://shop.rema1000.dk/", rema1000, preferences).then(res => res).catch(console.error);
module.exports = runShoppingListCrawler;

