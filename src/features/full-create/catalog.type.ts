import type { Color } from "../colors/color.type"
import type { EngineVariant } from "../engineVariants/engineVariant.type"
import type { Model } from "../models/model.types"

export type Catalog = {
    'model': Model,
    'colors': Color[],
    'engine_variants': EngineVariant[],
    'model_optional_compatibility': number[], //optional_id
    'model_accessory_compatibility': number[], //accessory_id
}