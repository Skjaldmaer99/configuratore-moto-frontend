import z from "zod";

export const loginFormSchema = z.object({
    email: z.string(),
    password: z.string().min(1).min(8)
});
export const registerFormSchema = z.object({
    name: z.string().min(1),
    email: z.string(),
    role: z.string(),
    password: z.string().min(1).min(8),
    password_confirmation: z.string().min(1).min(8),
    privacy_policy: z.boolean().refine(val => val === true, {
        message: "Devi accettare i termini e le condizioni",
    })
}).refine((data) => data.password === data.password_confirmation, {
    message: "Le password non coincidono",
    path: ["password_confirmation"],
});;

export const fullCreateFormSchema = z.object({
    model: z.object({
        brand: z.string(),
        name: z.string().min(1),
        category: z.string(),
        base_price: z.number(),
        description: z.string().optional(),
    }),
    colors: z.array(
        z.object({
            name: z.string(),
            hex_code: z.string(),
            extra_price: z.number(),
            image: z.any().optional(),
        })
    ),
    engine_variants: z.array(
        z.object({
            name: z.string(),
            displacement_cc: z.number(),
            engine_type: z.string(),
            cylinders: z.number(),
            horsepower: z.number(),
            gearbox: z.enum([
                "manuale",
                "semi-automatico",
                "automatico",
                "dct",
            ]),
            fuel_type: z.enum([
                "benzina",
                "diesel",
                "elettrica",
            ]),
            extra_price: z.number(),
        })
    ),
    model_optional_compatibility: z.array(z.number()),
    model_accessory_compatibility: z.array(z.number()),
});

export const modelFormSchema = z.object({

});

export const configurationFormSchema =
    z.object({
        user_id: z.number(),
        model_id: z.number(),
        color_id: z.number().nullable(),
        engine_variant_id: z.number().nullable(),
        optional_ids: z.array(z.number()).default([]),
        accessory_ids: z.array(z.number()).default([]),
        status: z.string(),
        current_step: z.number(),
    });

export const configurationOptionalsFormSchema = z.object({

});

export const configurationAccessoriesFormSchema = z.object({

});

export const optionalIncompatibilitiesFormSchema = z.object({
    optional_1_id: z.number(),
    optional_2_id: z.number(),
}).refine((data) => data.optional_1_id !== data.optional_2_id, {
    "message": "Il primo optional deve essere diverso dal secondo.",
    "path": ["optional_2_id"]
})

export const engineVariantFormSchema = z.object({

})

export const colorFormSchema = z.object({

})

export const optionalFormSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.coerce.number(),
    type: z.enum(['performance', 'touring', 'protection', 'comfort']),
})

export const accessoryFormSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.coerce.number().min(0),
    category: z.enum(['tech', 'style']),
})

export const recuperoPasswordFormSchema = z.object({
    email: z.string().min(1).min(1).max(100),
});

export const resetPasswordFormSchema = z.object({
    password: z.string().min(1).min(8),
    password_confirmation: z.string().min(1).min(8),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Le password non coincidono",
    path: ["password_confirmation"],
});;