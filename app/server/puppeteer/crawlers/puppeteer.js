const { default: fetch } = require('node-fetch');
const puppeteer = require('puppeteer');



async function runShoppingListCrawler (pageFunction, preferences) {


    // const { products, chains } = preferences;
    // const urls = products.map(name => 'https://www.nemlig.com/?search=' + name )

    console.log('Starting crawler...');
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
        //await page.setViewport({ width: 1366, height: 768});

        // console.log(urls)
        const url = "https://www.nemlig.com/";

        let results = [];

        //for (let url of urls) {
        console.log('Entering url: ' + url);
        await page.goto(url, {timeout: 30000});
        //console.log('Injecting scripts...');
        // await page.addScriptTag({path: jQueryPath})
        // await page.addScriptTag({path: customLibraryPath});


        // runs custom javascript as if we were in the console
        console.log('Running page function...')
        const scrapedData = await page.evaluate(async function nemlig(preferences) {

            const $ = (selector) =>  {
                const nodeList = Array.from(document.querySelectorAll(selector));
                return nodeList.length === 1 ? nodeList[0] : nodeList;
            };

            const { products, profile: {price} } = preferences;

            const urls = products.map(name => ( {name: name, url: `https://www.nemlig.com/webapi/AAAAAAAA-/-/1/0/Search/Search?query=${name}&take=20&skip=0&recipeCount=2&`} ))
                
            //`https://www.nemlig.com/webapi/AAAAAAAA-EIvZlM1q/2020100805-60-600/1/0/Search/Search?query=${name}&take=20&skip=0&recipeCount=2&`
            //"https://www.nemlig.com/webapi/AAAAAAAA-cEoFe4Jr/2020100823-300-300/1/0/Search/Search?query=leverpostej&take=20&skip=0&recipeCount=2&"

            console.log(urls)

            let items = [];

            for (let obj of urls) {

                try {
                    const response = await fetch(obj.url);
                    const jsonData = await response.json();
                    console.log('found json data')
                    console.log(jsonData);

                    const { Products } = jsonData.Products

                   /* console.log(Products)
                    let smallest = Products[0];
                    Products.forEach((product, i)=> {
                        if(product.UnitPriceCalc < smallest.UnitPriceCalc){
                            smallest = product;   
                        }                        
                    })*/

                    function sortByCheapest(arr) {

                        const sortedArray = arr.sort((a, b) => a.UnitPriceCalc < b.UnitPriceCalc ? -1 : (a.UnitPriceCalc > b.UnitPriceCalc ? 1 : 0));
                        console.log(sortedArray[0])
                        //const item = () => {

                        let cheap1 = sortedArray.find(item => {
                            const {Brand, Category, Name, SubCategory, Url} = item;
                            console.log([Brand, Category, Name, SubCategory, Url])

                           // const keywords = [Brand, Category, Name, SubCategory, Url]
                            const keywords = [Url]
                            const matchName = obj.name.toLowerCase().split(' ')[0]
                                                .replace(/æ/g, 'ae')
                                                .replace(/ø/g, 'oe')
                                                .replace(/å/g, 'aa')
                                                .replace(/-/g, '')

                            return keywords
                                  //  .filter(prop => !!prop)
                                    .map(el => el.toLowerCase().replace(/-/g, ''))
                                    .join()
                                    .match(new RegExp(`${matchName}`))

                                    //.includes(obj.name.toLowerCase())
                        })

                        /*let cheap2 = Products[0];
                        Products.forEach((product, i)=> {
                            if(product.UnitPriceCalc < cheap2.UnitPriceCalc){
                                cheap2 = product;   
                            }
                        })*/
                        
                        return cheap1 || sortedArray[0]
                        
                       // }
                        //return item() 
                    }

                    //objs.sort((a, b) => a.UnitPriceCalc.localeCompare(b.UnitPriceCalc));
                    console.log('Calculating smallest')

                    const smallest = sortByCheapest(Products)
                    console.log(smallest)
                    items.push(smallest);


                    
                } catch (error) {
                    throw error
                }
            }
            console.log('Found items in basket')
            console.log(items)


            items.forEach(async (item)=>{
                const body = {productId: item.Id, quantity: 1};
                try {
                    const data = await fetch("https://www.nemlig.com/webapi/basket/PlusOneToBasket", {
                        method:'post',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(body),
                    })
            
                    const jsonData = await data.json();
                    console.log('Found json data in after basket plus on')
                    console.log(jsonData);
                    
                } catch (error) {
                    throw error
                }
            })

           // location.reload();

    
      }, preferences);

      console.log(scrapedData)
     // results.push(...scrapedData);
   // }

    browser.disconnect();

   // await browser.close();
    console.log('Finishing webscraper...');

  /*  if (chains) {
      console.log(chains)
      if(chains.wanted) results = results.filter(item => chains.chainNames.includes(item.chain.toLowerCase()) )
      if(!chains.wanted) results = results.filter(item => !chains.chainNames.includes(item.chain.toLowerCase()) )
    }*/

    console.log(results)
    //console.log(`Found ${results.length} results`);
   // return results;

  } catch (e) {
    console.log(e)
    throw e
  }
}

const preferences = {
  products: ['pepsi max', 'granatæble frugt', 'sovsekulør', 'kondomer', 'tærte frost', 'vand 1.5'],
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

runShoppingListCrawler('', preferences).then(res => res).catch(console.error);

//module.exports = runSalesCrawler;