import type { Optional } from "../optionals/optional.type";

export type OptionalIncompatibility = {
    "id": number;
    "optional_1_id": number;
    "optional_2_id": number;
    "optional1": Optional;
    "optional2": Optional;
}