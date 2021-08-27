// For using async await in post method
//import regeneratorRuntime from "regenerator-runtime";
/* import "core-js/stable";
import "regenerator-runtime/runtime"; */

import userQueries from './queries/user';
import recipeQueries from './queries/recipes';
import salesQueries from './queries/sales';
import mealPlanQueries from './queries/mealPlan';
import post from './methods/post';

// https://sales-api-nm.herokuapp.com/

// HTTP toolbox for CRUD operations and creating queries
class HTTP {
    post = post.bind(this);
    requestUrl = 'http://localhost:8080/graphql';
    //requestUrl = 'https://nmserver.herokuapp.com/graphql';
    salesUrl = 'http://localhost:8090/sales';
    //this.salesUrl = 'https://sales-api-nm.herokuapp.com/sales';
    shoppingUrl = 'http://localhost:3001/shopping';

    sales = salesQueries;
    user = userQueries;
    recipes = recipeQueries;
    mealPlans = mealPlanQueries
}

export default new HTTP()

