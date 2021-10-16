"use strict";
const express = require('express');
const router = express.Router();
const salesCrawler = require('../../crawlers/salesCrawler/salesCrawler');
const tilbudsugen = require('../../crawlers/salesCrawler/pageFunctions/tilbudsugen');
const fs = require('fs');
const path = require('path');
router.post('/', async (req, res) => {
    try {
        const requestBody = req.body;
        console.log(req.body);
        console.log('Endpoint hit');
        let cachedData = [];
        try {
            const cachedResults = require('../salesData.json');
            const cachedResultsDate = new Date(cachedResults[0].date);
            const today = new Date();
            if (fromSameDate(today, cachedResultsDate)) {
                cachedData = cachedResults;
            }
        }
        catch (error) {
            console.log('Creating new file: salesData.json');
        }
        const productName = requestBody.products[0];
        const productFoundInCache = cachedData.find((productObject) => productObject.productName === productName);
        if (productFoundInCache) {
            return res.json(productFoundInCache.results);
        }
        const results = await salesCrawler(tilbudsugen, requestBody);
        const newData = {
            productName: productName,
            date: new Date(),
            results: results
        };
        if (results.length) {
            cachedData.push(newData);
            cacheResults(cachedData);
        }
        return res.json(results);
    }
    catch (error) {
        console.log(error);
        return res.json(error);
    }
});
module.exports = router;
function cacheResults(json) {
    try {
        fs.writeFile('salesData.json', JSON.stringify(json, null, 2), (err) => {
            if (err) {
                throw err;
            }
            console.log('Data written to file salesData.json');
        });
    }
    catch (error) {
        console.error('Could not write json file: ', error);
    }
}
function fromSameDate(today, cachedResultsDate) {
    return (cachedResultsDate.getDate() == today.getDate() &&
        cachedResultsDate.getMonth() == today.getMonth() &&
        cachedResultsDate.getFullYear() == today.getFullYear());
}
