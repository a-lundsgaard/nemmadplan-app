

const weekPlanSchema = {

  weekPlanTypes: `
  type WeekPlan {
      _id: ID
      name: String!
      customShoppingList: [Ingredient]
      plan: [dayPlan]!
      createdAt: String!
      updatedAt: String! 
    }
    
    type dayPlan {
      day: String!
      dish: Receipt
    }`,

  weekPlanInput: `
  input weekPlanInput {
      name: String!
      customShoppingList: [ingredientInput]
      plan: [dayPlanInput]!
    }
    
    input dayPlanInput {
      day: String!
      dish: ID
    }`
}

module.exports = weekPlanSchema;