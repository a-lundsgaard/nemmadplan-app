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
        this.sales = sales_1.default;
        this.user = user_1.default;
        this.recipes = recipes_1.default;
        this.mealPlans = mealPlan_1.default;
    }
}
exports.default = new HTTP();
