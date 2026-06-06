import type { configurationOptionalsFormSchema } from "@/lib/constant";
import { http } from "@/lib/http";
import type z from "zod";

export class ConfigurationOptional {
    static async create(data: z.infer<typeof configurationOptionalsFormSchema>) {
        try {
            const res = await http.post('/configuration-optionals', data);
            return res.data.data
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
}