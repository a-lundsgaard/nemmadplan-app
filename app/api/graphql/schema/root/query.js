const rootQuery = `
type RootQuery {
        getSales(salesCrawlerInput: salesCrawlerInput!): [Product]
        weekPlans: [WeekPlan!]!
        receipts: [Receipt!]!
        login(email: String!, password: String!): AuthData!
    }`

module.exports = rootQuery;