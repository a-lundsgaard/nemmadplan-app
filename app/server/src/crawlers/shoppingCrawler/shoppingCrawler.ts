import { Preferences } from "./types/sharedTypes";

const { default: fetch } = require('node-fetch');
const puppeteer = require('puppeteer');
const nemlig = require('./pageFunctions/nemlig.com-ts');
const rema1000 = require('./pageFunctions/rema1000.js');
//const locateChrome = require('locate-chrome');

//const k = require('./scripts/rema/algorithms')

const path = require('path');
const chromePath = require('./locateChrome');
//const libPath = path.resolve('puppeteer/crawlers/algorithms')

//const libPath  = 'crawlers\\algorithms.js';

const libPath = path.join(__dirname, './scripts/rema/algorithms.js');


async function runShoppingListCrawler(url: string, pageFunction: () => Array<Object>, preferences: Preferences) {

  console.log('Starting crawler...');
  console.log(preferences);

  try {
    const foundChromePath = await chromePath();
    console.log('Launching pupeteer...')
    const browser = await puppeteer.launch({
      headless: false,
      //executablePath: foundChromePath,
      args: ['--start-maximized'],
      defaultViewport: null, // launches the browser in full screen
      ignoreDefaultArgs: ["--enable-automation"], // disabling "chrome is controlled by automated software" warning
      //userDataDir: "/Users/askelundsgaard/Library/Application Support/Google/Chrome"
    })


/*     const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", '--start-maximized'], // "--no-sandbox" === for heroku to use puppetteer [1] = starts browser maximized
      defaultViewport: null, // launches the browser in full screen
      ignoreDefaultArgs: ["--enable-automation"] // disabling "chrome is controlled by automated software" warning
    }); */
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
    await page.goto(url, { timeout: 30000 });

    console.log('Injecting scripts...')
    await page.addScriptTag({ path: libPath });

    // runs custom javascript as if we were in the console
    console.log('Running page function...')
    const scrapedData = await page.evaluate(pageFunction, preferences);

    console.log(scrapedData);
    // browser.disconnect();
    console.log('Finishing webscraper...');
    return scrapedData;

  } catch (e) {
    console.log(e)
    //throw e
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
    brand: {
      brands: [],
      wanted: true
    }
  }
};

//runShoppingListCrawler("https://www.nemlig.com/", nemlig, preferences).then(res => res).catch(console.error);
//runShoppingListCrawler("https://shop.rema1000.dk/", rema1000, preferences).then(res => res).catch(console.error);
module.exports = runShoppingListCrawler;

