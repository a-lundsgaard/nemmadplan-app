
export interface NewIngredient {
    name: string,
    unit: string,
    quantity: number | null
    id: string
  }
  
export interface StateIngredient {
    name: string,
    unit: string,
    quantity: number | null
    id: string,
    task: string,
    completed: boolean,
    initiator?: string | undefined
    img?: string | undefined
  }
  
export interface IngredientHash {
    [key: string]: {
      task: string,
      index: number
    }
  }