import { RequestBody } from '../helpers/requestBody'

export default {
    getRecipesAndReturnFields,
    scrapeRecipesAndReturnFields,
    createRecipeAndReturnFields,
    saveWeekPlan
}

function getRecipesAndReturnFields(string, variables = {}) {
    const fieldsToQuery = string;
    const query = `query {
        receipts {
            ${fieldsToQuery}
        }
    }`;
    return new RequestBody(query, variables)
}


export function scrapeRecipesAndReturnFields(fieldsToQuery, variables = {}) {
    const query = `mutation($crawlerInput: String!) {
        scrapeReceipt(crawlerInput: $crawlerInput) {
            ${fieldsToQuery}
        }
    }`;
    return { query: query, variables: variables }
}

export function createRecipeAndReturnFields(string, variables) {

    // Splitting the string to array
    const fieldsToQuery = string.split(' ');
    // auto filling ingredients fields
    const includeIngredients = fieldsToQuery.includes('ingredients') ? `ingredients { name unit quantity }` : '';

    // replacing "ingredients" with our includeIngredients variable
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
        }`

    console.log(query)
    // return query;
    return new RequestBody(query, variables)
}

// $persons: Float!,
// persons: $persons,


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
    }`

    return new RequestBody(query, variables)
}