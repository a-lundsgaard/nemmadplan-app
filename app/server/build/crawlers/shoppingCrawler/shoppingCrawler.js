"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { default: fetch } = require('node-fetch');
const puppeteer = require('puppeteer');
const nemlig = require('./pageFunctions/nemlig.com-ts');
const rema1000 = require('./pageFunctions/rema1000.js');
const path = require('path');
const libPath = path.join(__dirname, './scripts/rema/algorithms.js');
async function runShoppingListCrawler(url, pageFunction, preferences) {
    console.log('Starting crawler...');
    console.log(preferences);
    try {
        console.log('Launching pupeteer...');
        const browser = await puppeteer.launch({
            headless: false,
            args: ["--no-sandbox", '--start-maximized'],
            defaultViewport: null,
            ignoreDefaultArgs: ["--enable-automation"]
        });
        const page = await browser.newPage();
        browser.on('targetcreated', async function f() {
            let pages = await browser.pages();
            if (pages.length > 1) {
                await pages[0].close();
                browser.off('targetcreated', f);
            }
        });
        console.log('Entering url: ' + url);
        await page.goto(url, { timeout: 30000 });
        console.log('Injecting scripts...');
        await page.addScriptTag({ path: libPath });
        console.log('Running page function...');
        const scrapedData = await page.evaluate(pageFunction, preferences);
        console.log(scrapedData);
        console.log('Finishing webscraper...');
        return scrapedData;
    }
    catch (e) {
        console.log(e);
    }
}
const preferences = {
    products: [
        'olivenolie',
        'rugbrød',
        'vaskemiddel flydende hvid',
        'minimælk',
        'kyllingepålæg',
        'rødløg',
        'lagereddike',
        'leverpostej',
        'bønnespirer',
        'agurk',
        'halloumi',
        'mayonnaise',
        'chilifrugt',
        'spidskål',
        'cherrytomat',
        'æg',
        'purløg',
        'salatost',
        'tærtedej',
        'snackpeber',
        'hytteost',
        'avocado'
    ],
    profile: {
        price: 1,
        organic: '',
        form: '',
        brand: {
            brands: [],
            wanted: true
        }
    }
};
module.exports = runShoppingListCrawler;
