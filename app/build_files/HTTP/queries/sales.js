"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSales = void 0;
const requestBody_1 = require("../helpers/requestBody");
exports.default = {
    getSales,
};
function getSales(fieldsToQuery = '', variables = {}) {
    const query = `query($products: [String!]) {
            getSales(salesCrawlerInput: {
                products: $products
            }) {
                ${fieldsToQuery}
            } 
          }`;
    return new requestBody_1.RequestBody(query, variables);
}
exports.getSales = getSales;
