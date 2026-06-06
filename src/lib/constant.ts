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
});

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

/* export const configurationFormSchema = z.object({
    user_id: z.number(),
    model_id: z.number(),

    engine_variant_id: z.number().nullable().optional(),
    color_id: z.number().nullable().optional(),

    status: z.string(),
    current_step: z.number(),
    total_price: z.number(),

    optional_ids: z.array(z.number()).default([]),
    accessory_ids: z.array(z.number()).default([]),
}); */
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
        total_price: z.number().nullable(),
    });

export const configurationOptionalsFormSchema = z.object({

});

export const configurationAccessoriesFormSchema = z.object({

});






export const engineVariantFormSchema = z.object({

})

export const colorFormSchema = z.object({

})
export const optionalFormSchema = z.object({

})
export const accessoryFormSchema = z.object({

})