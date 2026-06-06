import type { ModelAccessory } from "../accessories/accessory.type";
import type { Color } from "../colors/color.type";
import type { EngineVariant } from "../engineVariants/engineVariant.type";
import type { ModelOptional } from "../optionals/optional.type";

export type Model = {
    id: number,
    name: string,
    brand: string;
    category: string;
    base_price: number;
    description: string;
    colors: Color[];
    engine_variants: EngineVariant[];
    optionals: ModelOptional[];
    accessories: ModelAccessory[];
};