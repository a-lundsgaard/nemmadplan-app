export interface Preferences {
    products: Todo[],
    chain: string,
    profile: {
        algorithm: algorithmOptions,
        price: number,
        organic: string | '',
        form: string | '',
        brand: {
            brands: string[],
            wanted: boolean;
        }
    }
}

interface Todo {
    task: string,
    quantity: number,
    initiator: string,
    unit: string,
    img: string
}


type algorithmOptions = 'billigste';

