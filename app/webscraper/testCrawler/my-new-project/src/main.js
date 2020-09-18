const Apify = require('apify');

//const Url = require('./trigger');

const Url = require('../callTrigger')


Apify.main(async () => {

  console.log('Found url:' + Url)
 // console.log(url1);

  const requestQueue = await Apify.openRequestQueue();
  await requestQueue.addRequest({ url: Url });

  //const result =[];

  const handlePageFunction = async ({ request, $ }) => {
    const title = $('title').text();
    //result.push(title);

   // console.log(`The title of "${request.url}" is: ${title}.`);

  //  console.log( {title: title})
    await Apify.pushData({title: title})
  };

  // Set up the crawler, passing a single options object as an argument.
  const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction,
  });

  await crawler.run();

  //console.log('Found new resultss manually!!')
// console.log(result);
 // module.exports = result;
  //return result;
});



