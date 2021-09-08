"use strict";
const { default: fetch } = require('node-fetch');
const bodyParser = require('body-parser');
const pageFunction = require('../crawlers/shoppingCrawler/pageFunctions/index');
const shoppingCrawler = require('../crawlers/shoppingCrawler/shoppingCrawler');
async function app() {
    console.log('Starting server...');
    const express = require('express');
    const app = express();
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    });
    app.get('/', function (req, res) {
        res.send("Local shopping server is running...");
    });
    app.post('/shopping', async function (req, res) {
        const { chain, algorithm, preferences } = req.body;
        console.log(req.body);
        const foundChain = pageFunction[Object.keys(pageFunction).find(key => chain.includes(key))];
        const results = await shoppingCrawler(foundChain.url, foundChain.pageFunction, req.body);
        return res.json(results);
    });
    try {
        await fetch('http://localhost:3001/');
    }
    catch (error) {
        console.error('Could not fetch from local server, starting new server and displays error:');
        console.error(error);
        let localServer = app.listen(3001, function () {
            console.log('Express server listening on port ' + localServer.address().port);
        });
    }
}
app().then(res => console.log(res));
