const express = require('express');
const router = express.Router();
const salesCrawler = require('../../puppeteer/crawlers/salesCrawler/salesCrawler');
const tilbudsugen = require('../../puppeteer/crawlers/salesCrawler/pageFunctions/tilbudsugen');

//Endpoint for adding user
router.post('/', async (req, res) => {
    try {
      //  const parsedJson = JSON.parse(req.body)
       // console.log(parsedJson)
        console.log(req.body);

       // const parsedObj = {...req.body, products: JSON.parse(req.body.products), chains: JSON.parse(req.body.chains.chainNames)}

        console.log('Endpoint hit');
        const results = await salesCrawler(tilbudsugen, req.body);
        return res.json(results);
      //  res.send('Endpoint hit');
    } catch (error) {
      return res.json({message: e})
        
    }
});

module.exports = router;