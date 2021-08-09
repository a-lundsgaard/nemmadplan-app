"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./queries/user"));
const recipes_1 = __importDefault(require("./queries/recipes"));
const sales_1 = __importDefault(require("./queries/sales"));
const mealPlan_1 = __importDefault(require("./queries/mealPlan"));
const post_1 = __importDefault(require("./methods/post"));
class HTTP {
    constructor() {
        this.post = post_1.default.bind(this);
        this.requestUrl = 'http://localhost:8080/graphql';
        this.salesUrl = 'http://localhost:8090/sales';
        this.shoppingUrl = 'http://localhost:3001/shopping';
        this.sales = {
            getSales: sales_1.default.getSales
        };
        this.user = {
            verifyUserAndReturnFields: user_1.default.verifyUserAndReturnFields,
            signInAndReturnFields: user_1.default.signInAndReturnFields,
            signUpAndReturnFields: user_1.default.signUpAndReturnFields
        };
        this.recipes = {
            scrapeRecipesAndReturnFields: recipes_1.default.scrapeRecipesAndReturnFields,
            getRecipesAndReturnFields: recipes_1.default.getRecipesAndReturnFields,
            createRecipeQueryAndReturnFields: recipes_1.default.createRecipeAndReturnFields,
            deleteRecipe: recipes_1.default.deleteRecipe,
            saveWeekPlan: recipes_1.default.saveWeekPlan
        };
        this.mealPlans = mealPlan_1.default;
    }
}
exports.default = new HTTP();
