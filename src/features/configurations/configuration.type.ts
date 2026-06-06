import type { EngineVariant } from "../engineVariants/engineVariant.type";
import type { Model } from "../models/model.types";
import type { Optional } from "../optionals/optional.type";
import type { Accessory } from "../accessories/accessory.type";
import type { Color } from "../colors/color.type";

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
    model: Model,
    engine: EngineVariant,
    color: Color,
    optionals: Optional[],
    accessories: Accessory[],
}