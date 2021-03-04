"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch = require('node-fetch').default;
var puppeteer = require('puppeteer');
var nemlig = require('./pageFunctions/nemlig.com-ts');
var rema1000 = require('./pageFunctions/rema1000.js');
//const k = require('./scripts/rema/algorithms')
var path = require('path');
//const libPath = path.resolve('puppeteer/crawlers/algorithms')
//const libPath  = 'crawlers\\algorithms.js';
var libPath = path.join(__dirname, './scripts/rema/algorithms.js');
function runShoppingListCrawler(url, pageFunction, preferences) {
    return __awaiter(this, void 0, void 0, function () {
        var browser_1, page, scrapedData, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Starting crawler...');
                    console.log(preferences);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    console.log('Launching pupeteer...');
                    return [4 /*yield*/, puppeteer.launch({
                            headless: false,
                            args: ["--no-sandbox", '--start-maximized'],
                            defaultViewport: null,
                            ignoreDefaultArgs: ["--enable-automation"] // disabling "chrome is controlled by automated software" warning
                        })];
                case 2:
                    browser_1 = _a.sent();
                    return [4 /*yield*/, browser_1.newPage()];
                case 3:
                    page = _a.sent();
                    // closes the first chromium tab
                    browser_1.on('targetcreated', function f() {
                        return __awaiter(this, void 0, void 0, function () {
                            var pages;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, browser_1.pages()];
                                    case 1:
                                        pages = _a.sent();
                                        if (!(pages.length > 1)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, pages[0].close()];
                                    case 2:
                                        _a.sent();
                                        browser_1.off('targetcreated', f);
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    });
                    console.log('Entering url: ' + url);
                    return [4 /*yield*/, page.goto(url, { timeout: 30000 })];
                case 4:
                    _a.sent();
                    console.log('Injecting scripts...');
                    return [4 /*yield*/, page.addScriptTag({ path: libPath })];
                case 5:
                    _a.sent();
                    // runs custom javascript as if we were in the console
                    console.log('Running page function...');
                    return [4 /*yield*/, page.evaluate(pageFunction, preferences)];
                case 6:
                    scrapedData = _a.sent();
                    console.log(scrapedData);
                    // browser.disconnect();
                    console.log('Finishing webscraper...');
                    return [2 /*return*/, scrapedData];
                case 7:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
var preferences = {
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
    // products: ['vand'],
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
//runShoppingListCrawler("https://www.nemlig.com/", nemlig, preferences).then(res => res).catch(console.error);
//runShoppingListCrawler("https://shop.rema1000.dk/", rema1000, preferences).then(res => res).catch(console.error);
module.exports = runShoppingListCrawler;
