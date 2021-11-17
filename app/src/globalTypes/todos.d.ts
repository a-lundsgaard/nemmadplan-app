export interface Todo {
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