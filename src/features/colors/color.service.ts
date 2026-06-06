import type { colorFormSchema } from "@/lib/constant";
import { http } from "@/lib/http";
import type z from "zod";

export class ColorService {
    static async create(data: z.infer<typeof colorFormSchema>) {
        try {
            const res = await http.post('/colors', data);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
}