
const productLookup = {
    'tomat': {
        keywords: ['hakk', 'rød', 'grøn', 'soltørr']
    },

    'kød': {
        keywords: ['hakk']
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