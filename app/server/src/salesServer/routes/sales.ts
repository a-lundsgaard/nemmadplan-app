const express = require('express');
const router = express.Router();
const salesCrawler = require('../../crawlers/salesCrawler/salesCrawler');
const tilbudsugen = require('../../crawlers/salesCrawler/pageFunctions/tilbudsugen');

const fs = require('fs');
const path = require('path');


//Endpoint for adding user
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    console.log('Endpoint hit');

    let cachedData = [];
    try {
      const cachedResults = require('../salesData.json');
      const cachedResultsDate = new Date(cachedResults[0].date);
      const today = new Date();

      if (!firstDateIsPastDayComparedToSecond(cachedResultsDate, today)) {
        cachedData = cachedResults;
      }

    } catch (error) {
      console.log('Creating new file: salesDaa.json');
    }

    const productName = req.body.products[0];

    const productFoundInCache = cachedData.find((productObject) => productObject.productName === productName);
    if (productFoundInCache) {
      return res.json(productFoundInCache.results);
    }

    const results = await salesCrawler(tilbudsugen, req.body);
    const newData = {
      productName: productName,
      date: new Date(),
      results: results
    }

    if (results.length) {
      cachedData.push(newData)
      cacheResults(cachedData)
    }


    return res.json(results);

  } catch (error) {
    console.log(error);
    return res.json(error)
  }
});

module.exports = router;



function cacheResults(json) {
  fs.writeFile('salesData.json', JSON.stringify(json, null, 2), (err) => {
    if (err) {
      throw err
    }
    console.log('Data written to file salesData.json');
  });
}

const firstDateIsPastDayComparedToSecond = (firstDate, secondDate) => firstDate.setHours(0, 0, 0, 0) - secondDate.setHours(0, 0, 0, 0) < 0


