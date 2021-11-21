

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


  export interface Ingredient {
    name: string,
    unit: string,
    quantity: number
}