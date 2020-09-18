const rootQuery = `
type RootQuery {
        weekPlans: [WeekPlan!]!
        receipts: [Receipt!]!
        login(email: String!, password: String!): AuthData!
    }`

module.exports = rootQuery;