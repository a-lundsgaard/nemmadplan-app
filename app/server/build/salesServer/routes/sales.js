"use strict";
const express = require('express');
const router = express.Router();
const salesCrawler = require('../../crawlers/salesCrawler/salesCrawler');
const tilbudsugen = require('../../crawlers/salesCrawler/pageFunctions/tilbudsugen');
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        console.log('Endpoint hit');
        const results = await salesCrawler(tilbudsugen, req.body);
        return res.json(results);
    }
    catch (error) {
        console.log(error);
        return res.json(error);
    }
});
module.exports = router;
