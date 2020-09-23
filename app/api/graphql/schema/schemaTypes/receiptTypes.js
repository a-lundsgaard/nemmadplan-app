

const receiptSchema = {

  receiptTypes: `
     type Receipt {
      _id: ID!
      name: String!
      type: String!
      text: String!
      ingredients: [Ingredient!]
      creator: User!
      createdAt: String!
      updatedAt: String!      
    }
    
    type Ingredient {
      name: String
      unit: String
      quantity: Float
    }`,

  receiptInput: `
  input receiptInput {
      name: String!
      type: String!
      text: String!
      ingredients: [ingredientInput]!
    }
    
    input ingredientInput {
      name: String
      unit: String
      quantity: Float
    }`
}

module.exports = receiptSchema;