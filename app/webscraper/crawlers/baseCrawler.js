const puppeteer = require('puppeteer');
//const path = require('path')

const readGoogleSheet = require('../gsheet/index.js');
const { checkIngredient } = require('../helpers/helpers.js');

const jQueryPath = './libraries/jQuery.js';
const customLibraryPath = './libraries/scrapingLibrary.js';


async function runCrawler (url, pageFunction, waitFor) {
  console.log('Starting crawl...')
  try {
    console.log('Launching pupeteer...')
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    console.log('Entering url: ' + url);
    await page.goto(url, {timeout: 10000});
    console.log('Injecting scripts...');
    await page.addScriptTag({path: jQueryPath})
    await page.addScriptTag({path: customLibraryPath});

    if (waitFor) {
      Number(waitFor) ?
        await page.waitForTimeout(waitFor) :
        await page.waitForSelector(waitFor, {timeout: 1000});
    }

    // runs custom javascript as if we were in the console
    console.log('Running page function...')
    const scrapedData = await page.evaluate(pageFunction);

    console.log('Found result:' +scrapedData)
    await browser.close();

    console.log('Reading google sheets containing all known units:')
    const unitsArray = await readGoogleSheet();

    console.log('Finishing webscraper:');
    return {
      ...scrapedData,
      ingredients: await Promise.all(scrapedData.ingredients.map(obj => checkIngredient(obj, unitsArray) ))
    }

  } catch (e) {
    return e;
  }
}

module.exports = runCrawler;
//runCrawler("https://www.arla.dk/opskrifter/boller-i-karry/").then(console.log).catch(console.error);