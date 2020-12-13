module.exports = async function rema1000(preferences) {

    const $ = (selector) =>  {
        const nodeList = Array.from(document.querySelectorAll(selector));
        return nodeList.length === 1 ? nodeList[0] : nodeList;
    };

    try {

            async function getHits(product) {

                const res = await fetch("https://3i8g24dm3n-dsn.algolia.net/1/indexes/aws-prod-products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.21.1&x-algolia-application-id=3I8G24DM3N&x-algolia-api-key=f692051765ea56d2c8a55537448fa3a2", {
                                    method:"POST",
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify({"params":"query="+product})
                                });
                const jsonData = await res.json();
                return jsonData.hits;
            }
            
            
            const hits1 = await getHits('cornflakes');

            console.log('Found hits')
            console.log(hits1)



        const lsKey = 'guest';
        const lsObject = {name: "Min liste", primary: true, items: [], generics: []}

        let lsItem = {
            amount: 1, 
            item_group_id: null,
            store_id: 1,
            store_item: hits1[0],
            store_item_id: hits1[0].id
        } 

        lsObject.items.push(lsItem);

        localStorage.setItem(lsKey, JSON.stringify(lsObject))

        console.log('Added ' + lsObject.items.length + ' to basket')

        location.reload();

        return localStorage.getItem(lsKey);




   // const { products, profile: {price} } = preferences;

   // const urls = products.map(name => ( {name: name, url: `https://www.nemlig.com/webapi/AAAAAAAA-/-/1/0/Search/Search?query=${name}&take=20&skip=0&recipeCount=2&`} ))
        
    //`https://www.nemlig.com/webapi/AAAAAAAA-EIvZlM1q/2020100805-60-600/1/0/Search/Search?query=${name}&take=20&skip=0&recipeCount=2&`
    //"https://www.nemlig.com/webapi/AAAAAAAA-cEoFe4Jr/2020100823-300-300/1/0/Search/Search?query=leverpostej&take=20&skip=0&recipeCount=2&"

   // console.log(urls)

    //let items = [];

  //  for (let obj of urls) {
            
    } catch (error) {
        throw error
    }
 //   }

}