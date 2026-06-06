import type { configurationAccessoriesFormSchema } from "@/lib/constant";
import { http } from "@/lib/http";
import type z from "zod";

export class ConfigurationAccessory {
    static async create(data: z.infer<typeof configurationAccessoriesFormSchema>) {
        try {
            const res = await http.post('/configuration-accessories', data);
            return res.data.data
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

}