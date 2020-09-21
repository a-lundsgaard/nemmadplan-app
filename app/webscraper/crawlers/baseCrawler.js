const puppeteer = require('puppeteer');

//const t = require('./helpers/helpers.js')
// For vs code
//const path = require('path');
//path.resolve('test 2 secure\\secure-electron-template\\app\\webscraper\\libraries\\jQuery.js')



async function runCrawler (url, pageFunction, waitFor) {

    console.log('Starting crawl...')
    try {

      console.log('Launching pupeteer...')
      const browser = await puppeteer.launch({headless: true});
      const page = await browser.newPage();

      // For caching css
    /*  const browser = await puppeteer.launch({
        userDataDir: './data',
      });*/

      // Blocks every other request than the one of type document
      //  await page.setRequestInterception(true);
     /* page.on('request', (request) => {
        if (request.resourceType() === 'document') {
          request.continue();
        } else {
          request.abort();
        }
      });*/
      console.log('Entering url: ' + url);
      await page.goto(url);
      console.log('Injecting scripts...');
      await page.addScriptTag({path: './libraries/jQuery.js'})
      await page.addScriptTag({path: "./libraries/scrapingLibrary.js"});
      //await page.addScriptTag({path: './helpers/helpers.js'})

      if (waitFor) {
        Number(waitFor) ?
          await page.waitForTimeout(waitFor) :
          await page.waitForSelector(waitFor, {timeout: 1000});
      }

      // runs custom javascript as if we were in the console
      console.log('Running page function...')
      const scrapedData = await page.evaluate(pageFunction);
     // console.log(`Found %d results`, scrapedData.length)

      console.log('Found result:' +scrapedData)
      await browser.close();
      console.log('Finishing webscraper...');
      return scrapedData;

    } catch (e) {
      return e;
    }
}

module.exports = runCrawler;
//runCrawler("https://www.arla.dk/opskrifter/boller-i-karry/").then(console.log).catch(console.error);