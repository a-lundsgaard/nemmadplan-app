"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = async function nemlig(preferences) {
    document.write(`Vent et øjeblik...`);
    const { products, profile: { price } } = preferences;
    const urls = products.map(todo => ({ name: todo.task, url: `https://www.nemlig.com/webapi/AAAAAAAA-/-/1/0/Search/Search?query=${todo}&take=20&skip=0&recipeCount=2&` }));
    console.log(urls);
    let items = [];
    let productsNotFound = [];
    for (let obj of urls) {
        try {
            const response = await fetch(obj.url);
            const jsonData = await response.json();
            console.log('found json data');
            console.log(jsonData);
            const { Products } = jsonData.Products;
            function sortByCheapest(arr) {
                const sortedArray = arr.sort((a, b) => a.UnitPriceCalc < b.UnitPriceCalc ? -1 : (a.UnitPriceCalc > b.UnitPriceCalc ? 1 : 0));
                console.log(sortedArray[0]);
                let cheap1 = sortedArray.find(item => {
                    const { Brand, Category, Name, SubCategory, Url } = item;
                    console.log([Brand, Category, Name, SubCategory, Url]);
                    const keywords = [Url];
                    const matchName = obj.name.toLowerCase().split(' ')[0]
                        .replace(/æ/g, 'ae')
                        .replace(/ø/g, 'oe')
                        .replace(/å/g, 'aa')
                        .replace(/-/g, '');
                    return keywords
                        .map(el => el.toLowerCase().replace(/-/g, ''))
                        .join()
                        .match(new RegExp(`${matchName}`));
                });
                return cheap1 || arr || sortedArray[0] || obj.name;
            }
            console.log('Calculating smallest');
            const smallest = sortByCheapest(Products);
            console.log(smallest);
            typeof smallest !== 'string' ? items.push(smallest) : productsNotFound.push(smallest);
        }
        catch (error) {
            throw error;
        }
    }
    console.log('Found items in basket');
    console.log(items);
    let count = 1;
    let str = '';
    productsNotFound.forEach((name, index) => {
        str += `\n${index + 1}. ${name}`;
    });
    let addItems = new Promise((resolve, reject) => {
        items.forEach(async (item) => {
            const body = { productId: item.Id, quantity: 1 };
            try {
                const data = await fetch("https://www.nemlig.com/webapi/basket/PlusOneToBasket", {
                    method: 'post',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
                const jsonData = await data.json();
                console.log('Found json data in after basket plus on');
                console.log(jsonData);
                count++;
                document.open();
                document.write(`Handler ind for dig. Vent venligst.. Varer i kurv: ${count}`);
                if (count === items.length) {
                    alert(`Tilføjede ${items.length} varer til kurven. ${str ? '\nKunne ikke finde:' + str : 'Alle varer fundet'}`);
                    resolve(items);
                    location.reload();
                }
            }
            catch (error) {
                reject(error);
            }
        });
    });
    const finished = await addItems;
    return finished;
};
