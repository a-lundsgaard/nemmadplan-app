"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestBody_1 = require("../helpers/requestBody");
class MealPlanRequests {
    saveMealPlan(fieldsToQuery, variables = {}) {
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
        return new requestBody_1.RequestBody(query, variables = {});
    }
    ;
    getMealPlans(fieldsToQuery, variables = {}) {
        const query = `query {
            weekPlans {
              _id
              name
              createdAt
              customShoppingList {
                name
                unit
                quantity
              }
              plan {
                day
                dish {
                  name
                  image
                  text
                  ingredients {
                    name
                    unit
                    quantity
                  }
                  creator {
                    email
                  }
                }
              }
            }
          }`;
        return new requestBody_1.RequestBody(query, variables);
    }
    ;
    deleteMealPlan(fieldsToQuery, variables = {}) {
        const query = `mutation( $weekPlanId: ID! ) {
            deleteWeekPlan( weekPlanId: $weekPlanId) {
                ${fieldsToQuery}
            }
          }`;
        return new requestBody_1.RequestBody(query, variables);
    }
}
exports.default = new MealPlanRequests();
