// For using async await in post method
import regeneratorRuntime from "regenerator-runtime"; 

import userQueries from './queries/user';
import recipeQueries from './queries/recipes';
import salesQueries from './queries/sales';

import post from './methods/post';


// HTTP toolbox for CRUD operations and creating queries
 class HTTP {
    constructor() {
        this.testUrl = 'http://localhost:8080/graphql'
        this.prodUrl = 'https://nmserver.herokuapp.com/graphql'
        this.post = post.bind(this);

        this.sales = {
            getSales: salesQueries.getSales
        },
        
        this.user = {
            verifyUserAndReturnFields: userQueries.verifyUserAndReturnFields,
            signInAndReturnFields: userQueries.signInAndReturnFields,
            signUpAndReturnFields: userQueries.signUpAndReturnFields
        }

        this.recipes = {
            scrapeRecipesAndReturnFields: recipeQueries.scrapeRecipesAndReturnFields,
            getRecipesAndReturnFields: recipeQueries.getRecipesAndReturnFields,
            createRecipeQueryAndReturnFields: recipeQueries.createRecipeAndReturnFields
        };
    };
}


export default new HTTP()

