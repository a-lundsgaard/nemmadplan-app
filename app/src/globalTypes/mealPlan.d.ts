import { Ingredient } from "./recipe";


export interface MealPlan {
    _id: string,
    name: string,
    createdAt: string,
    customShoppingList: [{
        name: string,
        unit: string,
        quantity: number
    }],
    plan: [{
        day: string,
        persons: number,
        dish: {
            name: string,
            persons: number,
            image: string,
            ingredients: Ingredient[]
        },
        creator: string
    }]
}
