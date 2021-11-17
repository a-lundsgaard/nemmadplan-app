import { Ingredient } from "./mealPlan";


  export interface Recipe {
      _id: string
      name: string,
      type: string,
      persons: number,
      source: string,
      text: string,
      image: string,
      ingredients: Ingredient[],
      creator: string,
      createdAt: string,
      updatedAt: string
  }