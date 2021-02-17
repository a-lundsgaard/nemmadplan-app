//const productLookup = require('./algo.js')




module.exports = async function rema1000(preferences) {
    document.write(`Vent et øjeblik...`);

    try {

        const { products, profile: { price, algorithm } } = preferences;

        // All algorithms available for shop.rema100.dk. 
        // The key must match the algorithm property from preferences, as it is used for object lookup further down 
        const algoObject = {
            'billigste': getCheapest,
        }

        let count = 1
        const lsKey = 'guest';
        const lsObject = { name: "Min liste", primary: true, items: [], generics: [] }
        const productsAddedToCart = [];
        const productsNotAddedToCart = [];

        const addedItems = new Promise(async (resolve, reject) => {

            for (const product of products) {

                const { task: productName, initiator } = product;
                const amountMatch = productName.match(/(\d)+\s(stk)/) // e.g. "2 stk"


                let amount = 1;

                if(amountMatch) {
                    if(Number.isInteger(parseFloat(amountMatch[1]))) {
                        amount = parseInt(amountMatch[1])
                    }
                }

               // const amount = amountMatch ?  ? amountMatch[1] : 1 : 1;

                const productToSearchForAlternative = productName
                .replace(/\s?\d.*\*\s?/, '') // replacing amouunt and unit e.g. "1.5 spsk*"
                .replace(/(\d)+\s(stk)/g, '').trimEnd(); // removing e.g. "1 stk" from productname
                
                let productToSearchFor = productToSearchForAlternative; // removing e.g. "1 stk" from productname
                // locally scoped variables, only for current iteration
                let foundProducts = [];
                let notFoundProducts = [];

                console.log(productLookup)


                // if product name is too complex
                // DO THIS BASED ON THE INITIATOR INSTEAD
                if (initiator !== 'USER') {

                    const items = productToSearchFor
                    .replace(/\s*\(.*?\)\s*/g, '') // removing any parenthesis
                    .split(' ').reverse(); // setting la    st word first as it is often the essence of the product

                    if (items[0].match(/\d/)) {
                        items.shift();
                    }
                    productToSearchFor = items[0];

                    // if statement for adding e.g. 'hakket' to 'oksekød'. So 'oksekød' turns into 'hakket oksekød' if 'hakket' is contained in the title
                    if (items[1]) {
                        const prod = Object.keys(productLookup).find(key => productToSearchFor.includes(key));
                        if (prod) {
                            const keyword = productLookup[prod].keywords.find(keyword => productName.includes(keyword))
                            if (keyword) productToSearchFor = items[1] + ' ' + productToSearchFor;
                            console.log('found new search string: ' + productToSearchFor);
                        }
                    }
 
                }
                // Opens information stream. This is what the user sees when the bot is shopping 
                document.open()
                document.write(`Handler ind for dig. Vent venligst.. Varer behandlet: ${count}/${products.length}`)



                try {
                    // automatically sorts irrelevant products out
                    console.warn('SEARCHING FOR : ' + productToSearchFor)
                    foundProducts = await getHits(productToSearchFor);
                    if(!foundProducts.length) {
                        console.warn('SEARCHING AGAIN WITH NEW STRING : ' + productToSearchFor)

                        foundProducts = await getHits(productToSearchForAlternative);
                    } 
                    // console.log(foundProducts)
                } catch (error) {
                    reject(error)
                }


                // const foundProducts = await getHits(product);
                if (!foundProducts.length) {
                    // alert('found no products on: ' + productName)
                    console.log(foundProducts);
                    productsNotAddedToCart.push(product)
                    notFoundProducts.push(productName)
                    count++;
                    // skipping if no product is found
                    continue;
                }


                productsAddedToCart.push(product);
                // shopping algorithms goes here
                const desiredProduct = algoObject[algorithm](foundProducts)[0];
                console.log('Found hits')
                //  console.log(foundProducts)

                let lsItem = {
                    amount: amount,
                    item_group_id: null,
                    store_id: 1,
                    store_item: desiredProduct,
                    store_item_id: desiredProduct.id
                }

                lsObject.items.push(lsItem);
                console.log('Set the item : ' + productName)

                console.log(count)
                console.log(products.length)


                if (count === products.length) {
                    localStorage.setItem(lsKey, JSON.stringify(lsObject))
                    //alert('added all items')
                    console.log('Added ' + lsObject.items.length + ' to basket');                    
                    location.reload();
                    resolve(lsObject.items)
                    return;
                };

                count++;
            }
        })


        const results = await addedItems;
        console.log('Found results')
        console.log(results)
        // return localStorage.getItem(lsKey);
        return {
            addedToCart: results,
            addedProducts: productsAddedToCart,
            notFoundProducts: productsNotAddedToCart
        }

    } catch (error) {
        throw error
    }

}





// function to get all hits from a search word, this function runs every time
async function getHits(productName) {

    /*   const { task: productName, initiator } = product;
      let productToSearchFor = productName.replace(/\s?\d.*\*\s?/, '').replace(/(\d)+\s(stk)/g, '').trimEnd(); // removing e.g. "1 stk" from productname
   */
   
      console.log('searching for item from string: ' + productName);
      const res = await fetch("https://3i8g24dm3n-dsn.algolia.net/1/indexes/aws-prod-products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.21.1&x-algolia-application-id=3I8G24DM3N&x-algolia-api-key=f692051765ea56d2c8a55537448fa3a2", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ "params": "query=" + productName })
      });
      const jsonData = await res.json();
      const firstElements = jsonData.hits.slice(0, 10);
  
      const testIfRelevantProduct = (attribute) => new RegExp(`\\b${productName}\\b`).exec(attribute.toLowerCase());
      // const testIfRelevantProduct = (product) => product.toLowerCase().includes(item);
      const filteredResults = firstElements.filter(hit => {
          if (testIfRelevantProduct(hit.name) || testIfRelevantProduct(hit.declaration) ) {
              return true
          } else {
              return false;
          }
      })
      console.error('Found results')
      console.log(filteredResults)
      return filteredResults.length === 0 ? firstElements : filteredResults;
  }
  
  
  
  
  // algorithm to shop items based on the cheapest price per unit
  function getCheapest(hits) {
      // function turn the string containing pricer per unit to a number for sorting
      const findNumbers = (str) => parseFloat(str.match(/\d+\.?\d*/g)[0]);
  
      const getRealPricePerUnit = hits.map(item => {
          // destructuring the object
          const { pricing, pricing: { price_per_unit } } = item;
          // the price_per_kilogram property is often showing the incorrect number, using the price per unit fixes the problem
          return { ...item, pricing: { ...pricing, price_per_unit: findNumbers(price_per_unit) } }
      })
  
      // using sorting function to get cheapest product
      const sortedArray = getRealPricePerUnit.sort((a, b) => a.pricing.price_per_unit < b.pricing.price_per_unit ? -1 :
          (a.pricing.price_per_unit > b.pricing.price_per_unit ? 1 : 0));
  
      return sortedArray;
  }