import type { engineVariantFormSchema } from "@/lib/constant";
import { http } from "@/lib/http";
import type z from "zod";

export class EngineVariantService {
    static async create(data: z.infer<typeof engineVariantFormSchema>) {
        try {
            const res = await http.post('/engine-variants', data);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
}