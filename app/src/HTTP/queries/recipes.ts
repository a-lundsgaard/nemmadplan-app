import { RequestBody } from '../helpers/requestBody'

export default {
    getRecipesAndReturnFields,
    scrapeRecipesAndReturnFields,
    createRecipeAndReturnFields,
    saveWeekPlan,
    deleteRecipe,
    updateRecipeAndReturnFields
}

function getRecipesAndReturnFields(fieldsToQuery: string, variables = {}) {
    const query = `query {
        receipts {
            ${fieldsToQuery}
        }
    }`;
    return new RequestBody(query, variables)
}


function scrapeRecipesAndReturnFields(fieldsToQuery: string, variables = {}) {
    const query = `mutation($crawlerInput: String!) {
        scrapeReceipt(crawlerInput: $crawlerInput) {
            ${fieldsToQuery}
        }
    }`;
    return { query: query, variables: variables }
}

function updateRecipeAndReturnFields(string: string, variables = {}) {

    // Splitting the string to array
    const fieldsToQuery = string.split(' ');
    // auto filling ingredients fields
    const includeIngredients = fieldsToQuery.includes('ingredients') ? `ingredients { name unit quantity }` : '';

    // replacing "ingredients" with our includeIngredients variable
    if (includeIngredients) {
        let index = fieldsToQuery.indexOf('ingredients');
        fieldsToQuery.splice(index, 1);
    }

    const query = `mutation($_id: String!, $name: String!, $type: String!, $persons: Float!, $source: String,  $text: String!, $image: String, $favorite: Boolean, $ingredients: [ingredientInput]!) {
        updateRecipe(receiptInput: {
            _id: $_id
            name: $name, 
            type: $type,
            persons: $persons,
            source: $source,
            text: $text, 
            image: $image,
            favorite: $favorite,
            ingredients: $ingredients 
        }) {
                ${fieldsToQuery.join(' ')}
                ${includeIngredients}
            }
        }`

    //console.log(query)
    // return query;
    return new RequestBody(query, variables)
}

function createRecipeAndReturnFields(string: string, variables = {}) {

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


function deleteRecipe(fieldsToQuery: string, variables = {}) {
    const query = `mutation( $receiptId: ID! ) {
        deleteReceipt( receiptId: $receiptId) {
            ${fieldsToQuery}
        }
      }`
    return new RequestBody(query, variables)

}


function saveWeekPlan(string: string, variables = {}) {
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