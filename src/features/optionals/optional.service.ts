import type { optionalFormSchema } from "@/lib/constant";
import { http } from "@/lib/http";
import type z from "zod";

export class OptionalService {
    static async list() {
        try {
            const res = await http.get('/optionals');
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

    static async create(data: z.infer<typeof optionalFormSchema>) {
        try {
            const res = await http.post('/optionals', data);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
}