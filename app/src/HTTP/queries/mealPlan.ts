import { RequestBody } from '../helpers/requestBody'



class MealPlanRequests {
    saveMealPlan(fieldsToQuery: string, variables = {}) {
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

        return new RequestBody(query, variables = {})
    };

    getMealPlans(fieldsToQuery: string, variables = {}) {
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
          }`

        return new RequestBody(query, variables)
    };

    deleteMealPlan(fieldsToQuery: string, variables = {}) {
        const query = `mutation( $weekPlanId: ID! ) {
            deleteWeekPlan( weekPlanId: $weekPlanId) {
                ${fieldsToQuery}
            }
          }`
        return new RequestBody(query, variables)
    
    }

}


export default new MealPlanRequests();
