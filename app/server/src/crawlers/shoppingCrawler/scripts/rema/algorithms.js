"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var productLookup = {
    'tomat': {
        keywords: ['hakk', 'rød', 'grøn', 'soltørr']
    },
    'kød': {
        keywords: ['hakk']
    }
};
var commonUnitsArray = ['stk', 'gram', 'liter', 'ltr', 'pakke', 'pk', 'dåse', 'ds', 'gr'];
// function to get all hits from a search word, this function runs every time
function getHits(productName) {
    return __awaiter(this, void 0, void 0, function () {
        var res, jsonData, firstElements, testIfRelevantProduct, filteredResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /*   const { task: productName, initiator } = product;
                      let productToSearchFor = productName.replace(/\s?\d.*\*\s?/, '').replace(/(\d)+\s(stk)/g, '').trimEnd(); // removing e.g. "1 stk" from productname
                   */
                    console.log('searching for item from string: ' + productName);
                    return [4 /*yield*/, fetch("https://3i8g24dm3n-dsn.algolia.net/1/indexes/aws-prod-products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.21.1&x-algolia-application-id=3I8G24DM3N&x-algolia-api-key=f692051765ea56d2c8a55537448fa3a2", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ "params": "query=" + productName })
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    jsonData = _a.sent();
                    firstElements = jsonData.hits.slice(0, 10);
                    testIfRelevantProduct = function (attribute) { return new RegExp("\\b" + productName + "\\b").exec(attribute.toLowerCase()); };
                    filteredResults = firstElements.filter(function (hit) {
                        if (testIfRelevantProduct(hit.name) || testIfRelevantProduct(hit.declaration)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    console.error('Found results');
                    console.log(filteredResults);
                    return [2 /*return*/, filteredResults.length === 0 ? firstElements : filteredResults];
            }
        });
    });
}
// algorithm to shop items based on the cheapest price per unit
function getCheapest(hits) {
    // function turn the string containing pricer per unit to a number for sorting
    var findNumbers = function (str) {
        var pricePerUnitMatch = str.match(/\d+\.?\d*/g);
        return pricePerUnitMatch ? parseFloat(pricePerUnitMatch[0]) : 50;
    };
    var getRealPricePerUnit = hits.map(function (item) {
        // destructuring the object
        var pricing = item.pricing, price_per_unit = item.pricing.price_per_unit;
        // the price_per_kilogram property is often showing the incorrect number, using the price per unit fixes the problem
        return __assign(__assign({}, item), { pricing: __assign(__assign({}, pricing), { price_per_unit: findNumbers(price_per_unit) }) });
    });
    // using sorting function to get cheapest product
    var sortedArray = getRealPricePerUnit.sort(function (a, b) { return a.pricing.price_per_unit < b.pricing.price_per_unit ? -1 :
        (a.pricing.price_per_unit > b.pricing.price_per_unit ? 1 : 0); });
    return sortedArray;
}
