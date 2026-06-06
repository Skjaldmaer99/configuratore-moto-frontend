import type { accessoryFormSchema } from "@/lib/constant";
import { http } from "@/lib/http";
import type z from "zod";

export class AccessoryService {
    static async list() {
        try {
            const res = await http.get('/accessories');
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
    static async create(data: z.infer<typeof accessoryFormSchema>) {
        try {
            const res = await http.post('/accessories', data);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

}