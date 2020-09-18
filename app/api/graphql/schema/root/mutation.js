const rootMutation = `type RootMutation {
        createWeekPlan(weekPlanInput: weekPlanInput): WeekPlan
        deleteWeekPlan(weekPlanId: ID!): WeekPlan!
        createReceipt(receiptInput: receiptInput): Receipt
        deleteReceipt(receiptId: ID!): Receipt!
        createUser(userInput: UserInput): User
    }`

module.exports = rootMutation;