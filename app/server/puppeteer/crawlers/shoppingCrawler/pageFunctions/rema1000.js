
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