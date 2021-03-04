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
module.exports = function nemlig(preferences) {
    return __awaiter(this, void 0, void 0, function () {
        var products, price, urls, items, productsNotFound, _loop_1, _i, urls_1, obj, count, str, addItems, finished;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    document.write("Vent et \u00F8jeblik...");
                    products = preferences.products, price = preferences.profile.price;
                    urls = products.map(function (todo) { return ({ name: todo.task, url: "https://www.nemlig.com/webapi/AAAAAAAA-/-/1/0/Search/Search?query=" + todo + "&take=20&skip=0&recipeCount=2&" }); });
                    //`https://www.nemlig.com/webapi/AAAAAAAA-EIvZlM1q/2020100805-60-600/1/0/Search/Search?query=${name}&take=20&skip=0&recipeCount=2&`
                    //"https://www.nemlig.com/webapi/AAAAAAAA-cEoFe4Jr/2020100823-300-300/1/0/Search/Search?query=leverpostej&take=20&skip=0&recipeCount=2&"
                    console.log(urls);
                    items = [];
                    productsNotFound = [];
                    _loop_1 = function (obj) {
                        /* console.log(Products)
                         let smallest = Products[0];
                         Products.forEach((product, i)=> {
                             if(product.UnitPriceCalc < smallest.UnitPriceCalc){
                                 smallest = product;
                             }
                         })*/
                        function sortByCheapest(arr) {
                            var sortedArray = arr.sort(function (a, b) { return a.UnitPriceCalc < b.UnitPriceCalc ? -1 : (a.UnitPriceCalc > b.UnitPriceCalc ? 1 : 0); });
                            console.log(sortedArray[0]);
                            //const item = () => {
                            var cheap1 = sortedArray.find(function (item) {
                                var Brand = item.Brand, Category = item.Category, Name = item.Name, SubCategory = item.SubCategory, Url = item.Url;
                                console.log([Brand, Category, Name, SubCategory, Url]);
                                // const keywords = [Brand, Category, Name, SubCategory, Url]
                                var keywords = [Url];
                                var matchName = obj.name.toLowerCase().split(' ')[0]
                                    .replace(/æ/g, 'ae')
                                    .replace(/ø/g, 'oe')
                                    .replace(/å/g, 'aa')
                                    .replace(/-/g, '');
                                return keywords
                                    //  .filter(prop => !!prop)
                                    .map(function (el) { return el.toLowerCase().replace(/-/g, ''); })
                                    .join()
                                    .match(new RegExp("" + matchName));
                                //.includes(obj.name.toLowerCase())
                            });
                            return cheap1 || arr || sortedArray[0] || obj.name;
                        }
                        var response, jsonData, Products, smallest, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, fetch(obj.url)];
                                case 1:
                                    response = _a.sent();
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    jsonData = _a.sent();
                                    console.log('found json data');
                                    console.log(jsonData);
                                    Products = jsonData.Products.Products;
                                    console.log('Calculating smallest');
                                    smallest = sortByCheapest(Products);
                                    console.log(smallest);
                                    typeof smallest !== 'string' ? items.push(smallest) : productsNotFound.push(smallest);
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_1 = _a.sent();
                                    throw error_1;
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, urls_1 = urls;
                    _a.label = 1;
                case 1:
                    if (!(_i < urls_1.length)) return [3 /*break*/, 4];
                    obj = urls_1[_i];
                    return [5 /*yield**/, _loop_1(obj)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('Found items in basket');
                    console.log(items);
                    count = 1;
                    str = '';
                    productsNotFound.forEach(function (name, index) {
                        str += "\n" + (index + 1) + ". " + name;
                    });
                    addItems = new Promise(function (resolve, reject) {
                        items.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var body, data, jsonData, error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        body = { productId: item.Id, quantity: 1 };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 4, , 5]);
                                        return [4 /*yield*/, fetch("https://www.nemlig.com/webapi/basket/PlusOneToBasket", {
                                                method: 'post',
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify(body),
                                            })];
                                    case 2:
                                        data = _a.sent();
                                        return [4 /*yield*/, data.json()];
                                    case 3:
                                        jsonData = _a.sent();
                                        console.log('Found json data in after basket plus on');
                                        console.log(jsonData);
                                        count++;
                                        document.open();
                                        document.write("Handler ind for dig. Vent venligst.. Varer i kurv: " + count);
                                        if (count === items.length) {
                                            alert("Tilf\u00F8jede " + items.length + " varer til kurven. " + (str ? '\nKunne ikke finde:' + str : 'Alle varer fundet'));
                                            //window.location = window.location.href + "#refresh";
                                            resolve(items);
                                            location.reload();
                                        }
                                        return [3 /*break*/, 5];
                                    case 4:
                                        error_2 = _a.sent();
                                        reject(error_2);
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                    });
                    return [4 /*yield*/, addItems];
                case 5:
                    finished = _a.sent();
                    //alert('i remove cookies')
                    return [2 /*return*/, finished];
            }
        });
    });
};
