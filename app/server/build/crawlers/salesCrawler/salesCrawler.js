"use strict";
const puppeteer = require('puppeteer');
const path = require('path');
async function runSalesCrawler(pageFunction, preferences) {
    let { products, chains } = preferences;
    products = typeof products === 'string' ? JSON.parse(products) : products;
    chains = typeof chains === 'string' ? JSON.parse(chains) : chains;
    const urls = products.map(name => 'https://www.tilbudsugen.dk/tilbud/' + name);
    console.log('Starting crawler...');
    try {
        console.log('Launching pupeteer...');
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox"]
        });
        const page = await browser.newPage();
        console.log(urls);
        let results = [];
        for (let url of urls) {
            console.log('Entering url: ' + url);
            await page.goto(url, { timeout: 30000 });
            console.log('Injecting scripts...');
            await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' });
            const waitFor = '.search_result_list';
            console.log('Waiting for selector: "' + waitFor + '"...');
            try {
                await page.waitForSelector(waitFor, { timeout: 8000 });
            }
            catch (e) {
                console.log(results);
                await browser.close();
                return results;
            }
            console.log('Running page function...');
            let scrapedData;
            try {
                scrapedData = await page.evaluate(pageFunction);
                results.push(...scrapedData);
            }
            catch (e) {
                await browser.close();
                return results;
            }
        }
        await browser.close();
        console.log('Finishing webscraper... ' + page.url);
        console.log(results);
        console.log(`Found ${results.length} results`);
        return results;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
module.exports = runSalesCrawler;
