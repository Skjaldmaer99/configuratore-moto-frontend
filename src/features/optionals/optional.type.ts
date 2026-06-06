export type Optional = {
    id: number;
    name: string;
    description: string;
    price: number;
    type: string;
}

export type ModelOptional = {
    id: number;
    name: string;
    description: string;
    price: string;
    type: string;

    pivot: {
        model_id: number;
        optional_id: number;
    };
};