"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipeAndReturnFields = exports.scrapeRecipesAndReturnFields = void 0;
const requestBody_1 = require("../helpers/requestBody");
exports.default = {
    getRecipesAndReturnFields,
    scrapeRecipesAndReturnFields,
    createRecipeAndReturnFields,
    saveWeekPlan
};
function getRecipesAndReturnFields(string, variables = {}) {
    const fieldsToQuery = string;
    const query = `query {
        receipts {
            ${fieldsToQuery}
        }
    }`;
    return new requestBody_1.RequestBody(query, variables);
}
function scrapeRecipesAndReturnFields(fieldsToQuery, variables = {}) {
    const query = `mutation($crawlerInput: String!) {
        scrapeReceipt(crawlerInput: $crawlerInput) {
            ${fieldsToQuery}
        }
    }`;
    return { query: query, variables: variables };
}
exports.scrapeRecipesAndReturnFields = scrapeRecipesAndReturnFields;
function createRecipeAndReturnFields(string, variables) {
    const fieldsToQuery = string.split(' ');
    const includeIngredients = fieldsToQuery.includes('ingredients') ? `ingredients { name unit quantity }` : '';
    if (includeIngredients) {
        let index = fieldsToQuery.indexOf('ingredients');
        fieldsToQuery.splice(index, 1);
    }
    const query = `mutation($name: String!, $type: String!, $persons: Float!, $source: String,  $text: String!, $image: String, $ingredients: [ingredientInput]!) {
            createReceipt(receiptInput: {
            name: $name, 
            type: $type, 
            persons: $persons,
            source: $source,
            text: $text, 
            image: $image
            ingredients: $ingredients 
        }) {
                ${fieldsToQuery.join(' ')}
                ${includeIngredients}
            }
        }`;
    console.log(query);
    return new requestBody_1.RequestBody(query, variables);
}
exports.createRecipeAndReturnFields = createRecipeAndReturnFields;
function saveWeekPlan(string, variables = {}) {
    const fieldsToQuery = string;
    const query = `mutation( $name: String!, $customShoppingList: [ingredientInput]!, $plan: [dayPlanInput]! ) {
        createWeekPlan(weekPlanInput: {
        name: $name, 
        customShoppingList: $customShoppingList
        plan: $plan
    }) {
            customShoppingList { name unit quantity }
            ${fieldsToQuery}
        }
    }`;
    return new requestBody_1.RequestBody(query, variables);
}
