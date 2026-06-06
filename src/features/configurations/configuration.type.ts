export type Configuration = {
    id?: number;
    user_id: number;
    model_id: number;
    engine_variant_id: number | null;
    color_id: number | null;
    total_price: number;
    current_step: number;
    status: string;
    optional_ids: number[],
    accessory_ids: number[],
}