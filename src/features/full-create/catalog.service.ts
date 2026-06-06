import type { fullCreateFormSchema } from "@/lib/constant";
import { http } from "@/lib/http";
import type z from "zod";

export class CatalogService {
    static async fullCreate(data: z.infer<typeof fullCreateFormSchema>) {
        const formData = new FormData();

        // MODEL
        formData.append("model[brand]", data.model.brand);
        formData.append("model[name]", data.model.name);
        formData.append("model[category]", data.model.category);
        formData.append("model[base_price]", String(data.model.base_price));
        formData.append(
            "model[description]",
            data.model.description ?? ""
        );

        // COLORS
        data.colors.forEach((color, index) => {
            formData.append(
                `colors[${index}][name]`,
                color.name
            );

            formData.append(
                `colors[${index}][hex_code]`,
                color.hex_code
            );

            formData.append(
                `colors[${index}][extra_price]`,
                String(color.extra_price)
            );

            if (color.image instanceof File) {
                formData.append(
                    `colors[${index}][image]`,
                    color.image
                );
            }
        });

        // ENGINE VARIANTS
        data.engine_variants.forEach((engine, index) => {
            formData.append(
                `engine_variants[${index}][name]`,
                engine.name
            );

            formData.append(
                `engine_variants[${index}][displacement_cc]`,
                String(engine.displacement_cc)
            );

            formData.append(
                `engine_variants[${index}][cylinders]`,
                String(engine.cylinders)
            );

            formData.append(
                `engine_variants[${index}][engine_type]`,
                engine.engine_type
            );

            formData.append(
                `engine_variants[${index}][horsepower]`,
                String(engine.horsepower)
            );

            formData.append(
                `engine_variants[${index}][gearbox]`,
                engine.gearbox
            );

            formData.append(
                `engine_variants[${index}][fuel_type]`,
                engine.fuel_type
            );

            formData.append(
                `engine_variants[${index}][extra_price]`,
                String(engine.extra_price)
            );
        });

        // OPTIONALS
        data.model_optional_compatibility.forEach((id, index) => {
            formData.append(
                `model_optional_compatibility[${index}][optional_id]`,
                String(id)
            );
        });

        // ACCESSORIES
        data.model_accessory_compatibility.forEach((id, index) => {
            formData.append(
                `model_accessory_compatibility[${index}][accessory_id]`,
                String(id)
            );
        });

        const res = await http.post(
            "/full-create",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return res.data.data;
    }
}