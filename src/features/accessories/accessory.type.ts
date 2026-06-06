export type Accessory = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
}

export type ModelAccessory = {
    id: number;
    name: string;
    description: string;
    price: string;
    type: string;

    pivot: {
        model_id: number;
        accessory_id: number;
    };
};