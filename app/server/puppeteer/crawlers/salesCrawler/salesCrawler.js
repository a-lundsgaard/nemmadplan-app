const puppeteer = require('puppeteer');
const path = require('path')



async function runSalesCrawler (pageFunction, preferences) {


  let { products, chains } = preferences;

  // if request send from postman
  products = typeof products === 'string' ? JSON.parse(products) : products;
  chains = typeof chains === 'string' ? JSON.parse(chains) : chains;

  const urls = products.map(name => 'https://www.tilbudsugen.dk/tilbud/' + name )

  console.log('Starting crawler...');
  try {
    console.log('Launching pupeteer...')
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();

    console.log(urls)

    let results = [];

    for (let url of urls) {
      console.log('Entering url: ' + url);
      await page.goto(url, {timeout: 30000});
      console.log('Injecting scripts...');
     // await page.addScriptTag({path: jQueryPath})
    //  await page.addScriptTag({path: customLibraryPath});
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

      const waitFor = '.mx-0';
      console.log('Waiting for selector: "' + waitFor + '"...');

      try {
        await page.waitForSelector(waitFor, {timeout: 10000});
      }
      catch (e) {
        console.log(results)
        await browser.close();
        return results
      }

      // runs custom javascript as if we were in the console
      console.log('Running page function...')
      const scrapedData = await page.evaluate(pageFunction);
      results.push(...scrapedData);
    }


    await browser.close();
    console.log('Finishing webscraper...');

   /* if (chains) {
      console.log(chains)
      if(chains.wanted) results = results.filter(item => chains.chainNames.includes(item.chain.toLowerCase()) )
      if(!chains.wanted) results = results.filter(item => !chains.chainNames.includes(item.chain.toLowerCase()) )
    }*/

    console.log(results)
    console.log(`Found ${results.length} results`);
    return results;

  } catch (e) {
    console.log(e)
    throw e
  }
}

/*const preferences = {
  products: ['razer'],
  chains: {
    wanted: false,
    chainNames: ['løvbjerg']
  }
};*/

//runSalesCrawler(tilbudsugen, preferences).then(res => res).catch(console.error);

module.exports = runSalesCrawler;