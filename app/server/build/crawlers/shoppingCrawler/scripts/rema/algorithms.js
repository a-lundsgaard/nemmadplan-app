"use strict";
const productLookup = {
    'tomat': {
        keywords: ['hakk', 'rød', 'grøn', 'soltørr']
    },
    'kød': {
        keywords: ['hakk']
    }
};
const commonUnitsArray = ['stk', 'gram', 'liter', 'ltr', 'pakke', 'pk', 'dåse', 'ds', 'gr'];
async function getHits(productName) {
    console.log('searching for item from string: ' + productName);
    const res = await fetch("https://3i8g24dm3n-dsn.algolia.net/1/indexes/aws-prod-products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.21.1&x-algolia-application-id=3I8G24DM3N&x-algolia-api-key=f692051765ea56d2c8a55537448fa3a2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "params": "query=" + productName })
    });
    const jsonData = await res.json();
    const firstElements = jsonData.hits.slice(0, 10);
    const testIfRelevantProduct = (attribute) => new RegExp(`\\b${productName}\\b`).exec(attribute.toLowerCase());
    const filteredResults = firstElements.filter((hit) => {
        if (testIfRelevantProduct(hit.name) || testIfRelevantProduct(hit.declaration)) {
            return true;
        }
        else {
            return false;
        }
    });
    console.error('Found results');
    console.log(filteredResults);
    return filteredResults.length === 0 ? firstElements : filteredResults;
}
function getCheapest(hits) {
    const findNumbers = (str) => {
        const pricePerUnitMatch = str.match(/\d+\.?\d*/g);
        return pricePerUnitMatch ? parseFloat(pricePerUnitMatch[0]) : 50;
    };
    const getRealPricePerUnit = hits.map(item => {
        const { pricing, pricing: { price_per_unit } } = item;
        return { ...item, pricing: { ...pricing, price_per_unit: findNumbers(price_per_unit) } };
    });
    const sortedArray = getRealPricePerUnit.sort((a, b) => a.pricing.price_per_unit < b.pricing.price_per_unit ? -1 :
        (a.pricing.price_per_unit > b.pricing.price_per_unit ? 1 : 0));
    return sortedArray;
}
