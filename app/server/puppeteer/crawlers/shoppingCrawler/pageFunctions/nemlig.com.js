module.exports = async function nemlig(preferences) {
    document.write(`Vent et øjeblik...`);

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
    let productsNotFound = [];

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
                
                return cheap1 || sortedArray[0] || obj.name
                
            }

            console.log('Calculating smallest');
            const smallest = sortByCheapest(Products);

            console.log(smallest)
            typeof smallest !== 'string' ? items.push(smallest) : productsNotFound.push(smallest)

        } catch (error) {
            throw error
        }
    }


    console.log('Found items in basket')
    console.log(items)

    let count = 1
    let str = '';
    productsNotFound.forEach((name, index )=> {
        str += `\n${index+1}. ${name}`
    });

    let addItems = new Promise((resolve, reject) => {
        
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

                count++
                document.open()
                document.write(`Handler ind for dig. Vent venligst.. Varer i kurv: ${count}`)
                
                if(count === items.length) {
                    alert(`Tilføjede ${items.length} varer til kurven. ${str ? '\nKunne ikke finde:' + str : 'Alle varer fundet'}`);
                    //window.location = window.location.href + "#refresh";
                    resolve(items)
                    location.reload();
                } 
                
            } catch (error) {
                reject(error)
            }
        })

    }) 

   // alert('i remove cookies')
   //if(location.href.includes('refresh')) alert('Page includes refresh')
   const finished = await addItems;
   //alert('i remove cookies')

    return finished
}