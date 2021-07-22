/* 

export interface MealPlan {
    data: {
        WeekPlans: [
            {
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
                    dish: {
                        name: string, 
                        ingredients: [{
                            name: string,
                            unit: string, 
                            quantity: number
                        }]
                    },
                    creator: string
                }]
            }
        ]
    }
} */


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
            dish: {
                name: string,
                image: string, 
                ingredients: [{
                    name: string,
                    unit: string, 
                    quantity: number
                }]
            },
            creator: string
        }]
}