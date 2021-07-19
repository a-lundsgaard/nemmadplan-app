// For using async await in post method
import regeneratorRuntime from "regenerator-runtime"; 

import userQueries from './queries/user';
import recipeQueries from './queries/recipes';
import salesQueries from './queries/sales';

import mealPlanQueries from './queries/mealPlan';




import post from './methods/post';

// https://sales-api-nm.herokuapp.com/

// HTTP toolbox for CRUD operations and creating queries
 class HTTP {
    //constructor() {
        post = post.bind(this);
        testUrl = 'http://localhost:8080/graphql'
        prodUrl = 'https://nmserver.herokuapp.com/graphql',
        salesUrl = 'http://localhost:8090/sales';
        //this.salesUrl = 'https://sales-api-nm.herokuapp.com/sales';
        shoppingUrl = 'http://localhost:3001/shopping';

        sales = {
            getSales: salesQueries.getSales
        }
        
        user = {
            verifyUserAndReturnFields: userQueries.verifyUserAndReturnFields,
            signInAndReturnFields: userQueries.signInAndReturnFields,
            signUpAndReturnFields: userQueries.signUpAndReturnFields
        }

        recipes = {
            scrapeRecipesAndReturnFields: recipeQueries.scrapeRecipesAndReturnFields,
            getRecipesAndReturnFields: recipeQueries.getRecipesAndReturnFields,
            createRecipeQueryAndReturnFields: recipeQueries.createRecipeAndReturnFields,
            deleteRecipe: recipeQueries.deleteRecipe,
            saveWeekPlan: recipeQueries.saveWeekPlan
        };

        mealPlans = mealPlanQueries
   // };
}


export default new HTTP()

