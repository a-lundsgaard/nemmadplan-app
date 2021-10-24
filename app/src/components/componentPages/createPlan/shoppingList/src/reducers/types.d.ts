
export interface NewIngredient {
    name: string,
    unit: string,
    quantity: number | null
    id: string;
    currentQuantity?: number
  }
  
export interface StateIngredient {
    name: string,
    unit: string,
    quantity: number | null
    id: string,
    task: string,
    completed: boolean,
    initiator?: string | undefined
    img?: string | undefined;
    currentQuantity?: number
  }
  
export interface IngredientHash {
    [key: string]: {
      task: string,
      index: number
    }
  }