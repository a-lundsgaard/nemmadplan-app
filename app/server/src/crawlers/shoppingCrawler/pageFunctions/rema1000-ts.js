"use strict";
// functions and variables from injected scripts 
/* declare const getHits: (searchWord: string)=> any[];
declare const getCheapest: (hits: any[])=> any;
declare const productLookup: ProductLookup; */
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
module.exports = function rema1000(preferences) {
    return __awaiter(this, void 0, void 0, function () {
        var functionsUsed, products_1, _a, price, algorithm_1, count_1, lsKey_1, lsObject_1, productsAddedToCart_1, productsNotAddedToCart_1, addedItems, results, error_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    document.write("Vent et \u00F8jeblik...");
                    functionsUsed = {
                        root: { getHits: getHits },
                        sortHits: {
                            'billigste': getCheapest
                        }
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    products_1 = preferences.products, _a = preferences.profile, price = _a.price, algorithm_1 = _a.algorithm;
                    count_1 = 1;
                    lsKey_1 = 'guest';
                    lsObject_1 = { name: "Min liste", primary: true, items: [], generics: [] };
                    productsAddedToCart_1 = [];
                    productsNotAddedToCart_1 = [];
                    addedItems = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _loop_1, _i, products_2, product, state_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _loop_1 = function (product) {
                                        var productName, initiator, quantity, unit, productToSearchForAlternative, productToSearchFor, foundProducts, notFoundProducts, items, prod, keyword, error_2, targetProduct, targetProductQuantity, amount, underline, amountMatch, lsItem;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    productName = product.task, initiator = product.initiator, quantity = product.quantity, unit = product.unit;
                                                    productToSearchForAlternative = productName
                                                        .replace(/\s?\d.*\*\s?/, '') // replacing amouunt and unit e.g. "1.5 spsk*"
                                                        .replace(/(\d)+\s(stk)/g, '').trimEnd();
                                                    productToSearchFor = productToSearchForAlternative;
                                                    foundProducts = [];
                                                    notFoundProducts = [];
                                                    // if product name is too complex
                                                    // DO THIS BASED ON THE INITIATOR INSTEAD
                                                    if (initiator !== 'USER') {
                                                        items = productToSearchFor
                                                            .replace(/\s*\(.*?\)\s*/g, '') // removing any parenthesis
                                                            .split(' ').reverse();
                                                        if (items[0].match(/\d/)) {
                                                            items.shift();
                                                        }
                                                        productToSearchFor = items[0];
                                                        // if statement for adding e.g. 'hakket' to 'oksekød'. So 'oksekød' turns into 'hakket oksekød' if 'hakket' is contained in the title
                                                        if (items[1]) {
                                                            prod = Object.keys(productLookup).find(function (key) { return productToSearchFor.includes(key); });
                                                            if (prod) {
                                                                keyword = productLookup[prod].keywords.find(function (keyword) { return productName.includes(keyword); });
                                                                if (keyword)
                                                                    productToSearchFor = items[1] + ' ' + productToSearchFor;
                                                                console.log('found new search string: ' + productToSearchFor);
                                                            }
                                                        }
                                                    }
                                                    // Opens information stream. This is what the user sees when the bot is shopping 
                                                    document.open();
                                                    document.write("Handler ind for dig. Vent venligst.. Varer behandlet: " + count_1 + "/" + products_1.length);
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 5, , 6]);
                                                    // automatically sorts irrelevant products out
                                                    console.warn('SEARCHING FOR : ' + productToSearchFor);
                                                    return [4 /*yield*/, getHits(productToSearchFor)];
                                                case 2:
                                                    foundProducts = _a.sent();
                                                    if (!!foundProducts.length) return [3 /*break*/, 4];
                                                    console.warn('SEARCHING AGAIN WITH NEW STRING : ' + productToSearchFor);
                                                    return [4 /*yield*/, getHits(productToSearchForAlternative)];
                                                case 3:
                                                    foundProducts = _a.sent();
                                                    _a.label = 4;
                                                case 4: return [3 /*break*/, 6];
                                                case 5:
                                                    error_2 = _a.sent();
                                                    reject(error_2);
                                                    return [3 /*break*/, 6];
                                                case 6:
                                                    // const foundProducts = await getHits(product);
                                                    if (!foundProducts.length) {
                                                        // alert('found no products on: ' + productName)
                                                        console.log(foundProducts);
                                                        productsNotAddedToCart_1.push(product);
                                                        notFoundProducts.push(productName);
                                                        count_1++;
                                                        return [2 /*return*/, "continue"];
                                                    }
                                                    productsAddedToCart_1.push(product);
                                                    targetProduct = functionsUsed.sortHits[algorithm_1](foundProducts)[0];
                                                    console.log('Found hits');
                                                    targetProductQuantity = 1;
                                                    amount = 1;
                                                    if (targetProduct.underline) {
                                                        underline = targetProduct.underline.toLowerCase();
                                                        amountMatch = underline.match(/\d+/) // e.g. "2 stk"
                                                        ;
                                                        //const goodUnitsArray = ['stk', 'dåse', 'pk', 'pakke'];
                                                        // finding the unit based on known units
                                                        //targetProductUnit = commonUnitsArray.find((unit) => underline.includes(unit)) || null;
                                                        // assigning the quantity of the product declaration as the amount of the productS
                                                        if (amountMatch) {
                                                            amount = +amountMatch[0];
                                                            //alert(amount);
                                                            // targetProductQuantity = +amountMatch[0];
                                                        }
                                                        if (!quantity)
                                                            alert('no quantity');
                                                        // Should probably check if same amount
                                                        targetProductQuantity = Math.ceil(quantity || 1 / amount);
                                                        // if same unit, and target amount is less than the quantity the user has specified
                                                        //if (unit && targetProductUnit ? targetProductUnit.includes(unit) : null) {
                                                        // if quantity exceeds 9 it is probably in gram
                                                        /*               if (quantity > 9) {
                                                                          // divides the user specified amount in the amount of the target product and rounds up to nearest integer
                                                                          targetProductQuantity = Math.ceil(quantity / amount);
                                                                      } */
                                                        //}
                                                    }
                                                    lsItem = {
                                                        amount: targetProductQuantity,
                                                        item_group_id: null,
                                                        store_id: 1,
                                                        store_item: targetProduct,
                                                        store_item_id: targetProduct.id
                                                    };
                                                    lsObject_1.items.push(lsItem);
                                                    console.log('Set the item : ' + productName);
                                                    console.log(count_1);
                                                    console.log(products_1.length);
                                                    if (count_1 === products_1.length) {
                                                        localStorage.setItem(lsKey_1, JSON.stringify(lsObject_1));
                                                        //alert('added all items')
                                                        console.log('Added ' + lsObject_1.items.length + ' to basket');
                                                        location.reload();
                                                        resolve(lsObject_1.items);
                                                        return [2 /*return*/, { value: void 0 }];
                                                    }
                                                    ;
                                                    count_1++;
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    _i = 0, products_2 = products_1;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < products_2.length)) return [3 /*break*/, 4];
                                    product = products_2[_i];
                                    return [5 /*yield**/, _loop_1(product)];
                                case 2:
                                    state_1 = _a.sent();
                                    if (typeof state_1 === "object")
                                        return [2 /*return*/, state_1.value];
                                    _a.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, addedItems];
                case 2:
                    results = _b.sent();
                    console.log('Found results');
                    console.log(results);
                    // return localStorage.getItem(lsKey);
                    return [2 /*return*/, {
                            addedToCart: results,
                            addedProducts: productsAddedToCart_1,
                            notFoundProducts: productsNotAddedToCart_1
                        }];
                case 3:
                    error_1 = _b.sent();
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
};
