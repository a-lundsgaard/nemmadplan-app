const puppeteer = require('puppeteer');

//const t = require('../libraries/jQuery')

const arla = require('../pageFunctions/pageFunction');




function runCrawler (url, pageFunction, waitFor) {

  return new Promise(async (resolve, reject) => {
    try {
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
      await page.goto(url);
      await page.addScriptTag({path: './libraries/jQuery.js'})
      await page.addScriptTag({path: './libraries/scrapingLibrary.js'});

      if (waitFor) {
        Number(waitFor) ?
          await page.waitForTimeout(waitFor) :
          await page.waitForSelector(waitFor, {timeout: 1000});
      }


      let results = [];
        // runs custom javascript as if we were in the console
      const scrapedData = await page.evaluate(pageFunction);
     // console.log(`Found %d results`, scrapedData.length)

      await browser.close();
      return resolve(scrapedData);

    } catch (e) {
      return reject(e);
    }
  })
}

module.exports = runCrawler;
//runCrawler("https://www.arla.dk/opskrifter/boller-i-karry/").then(console.log).catch(console.error);