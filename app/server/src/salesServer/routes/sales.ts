const express = require('express');
const router = express.Router();
const salesCrawler = require('../../crawlers/salesCrawler/salesCrawler');
const tilbudsugen = require('../../crawlers/salesCrawler/pageFunctions/tilbudsugen');

//Endpoint for adding user
router.post('/', async (req, res) => {
    try {
      //  const parsedJson = JSON.parse(req.body)
       // console.log(parsedJson)
        console.log(req.body);
        console.log('Endpoint hit');
        const results = await salesCrawler(tilbudsugen, req.body);
        return res.json(results);
      //  res.send('Endpoint hit');
    } catch (error) {
      console.log(error);
      return res.json(error)
    }
});

module.exports = router;