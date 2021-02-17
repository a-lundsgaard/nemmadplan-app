"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = async function rema1000(preferences) {
    document.write(`Vent et øjeblik...`);
    const functionsUsed = {
        root: { getHits: getHits },
        sortHits: {
            'billigste': getCheapest
        }
    };
    try {
        const { products, profile: { price, algorithm } } = preferences;
        let count = 1;
        const lsKey = 'guest';
        const lsObject = { name: "Min liste", primary: true, items: [], generics: [] };
        const productsAddedToCart = [];
        const productsNotAddedToCart = [];
        const addedItems = new Promise(async (resolve, reject) => {
            for (const product of products) {
                const { task: productName, initiator, quantity, unit } = product;
                const productToSearchForAlternative = productName
                    .replace(/\s?\d.*\*\s?/, '')
                    .replace(/(\d)+\s(stk)/g, '').trimEnd();
                let productToSearchFor = productToSearchForAlternative;
                let foundProducts = [];
                let notFoundProducts = [];
                if (initiator !== 'USER') {
                    const items = productToSearchFor
                        .replace(/\s*\(.*?\)\s*/g, '')
                        .split(' ').reverse();
                    if (items[0].match(/\d/)) {
                        items.shift();
                    }
                    productToSearchFor = items[0];
                    if (items[1]) {
                        const prod = Object.keys(productLookup).find((key) => productToSearchFor.includes(key));
                        if (prod) {
                            const keyword = productLookup[prod].keywords.find((keyword) => productName.includes(keyword));
                            if (keyword)
                                productToSearchFor = items[1] + ' ' + productToSearchFor;
                            console.log('found new search string: ' + productToSearchFor);
                        }
                    }
                }
                document.open();
                document.write(`Handler ind for dig. Vent venligst.. Varer behandlet: ${count}/${products.length}`);
                try {
                    console.warn('SEARCHING FOR : ' + productToSearchFor);
                    foundProducts = await getHits(productToSearchFor);
                    if (!foundProducts.length) {
                        console.warn('SEARCHING AGAIN WITH NEW STRING : ' + productToSearchFor);
                        foundProducts = await getHits(productToSearchForAlternative);
                    }
                }
                catch (error) {
                    reject(error);
                }
                if (!foundProducts.length) {
                    console.log(foundProducts);
                    productsNotAddedToCart.push(product);
                    notFoundProducts.push(productName);
                    count++;
                    continue;
                }
                productsAddedToCart.push(product);
                const targetProduct = functionsUsed.sortHits[algorithm](foundProducts)[0];
                console.log('Found hits');
                let targetProductQuantity = 1;
                let amount = 1;
                if (targetProduct.underline) {
                    const underline = targetProduct.underline.toLowerCase();
                    const amountMatch = underline.match(/\d+/);
                    if (amountMatch) {
                        amount = +amountMatch[0];
                    }
                    if (!quantity)
                        alert('no quantity');
                    targetProductQuantity = Math.ceil(quantity || 1 / amount);
                }
                let lsItem = {
                    amount: targetProductQuantity,
                    item_group_id: null,
                    store_id: 1,
                    store_item: targetProduct,
                    store_item_id: targetProduct.id
                };
                lsObject.items.push(lsItem);
                console.log('Set the item : ' + productName);
                console.log(count);
                console.log(products.length);
                if (count === products.length) {
                    localStorage.setItem(lsKey, JSON.stringify(lsObject));
                    console.log('Added ' + lsObject.items.length + ' to basket');
                    location.reload();
                    resolve(lsObject.items);
                    return;
                }
                ;
                count++;
            }
        });
        const results = await addedItems;
        console.log('Found results');
        console.log(results);
        return {
            addedToCart: results,
            addedProducts: productsAddedToCart,
            notFoundProducts: productsNotAddedToCart
        };
    }
    catch (error) {
        throw error;
    }
};
