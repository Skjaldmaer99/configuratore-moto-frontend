import type { optionalIncompatibilitiesFormSchema } from "@/lib/constant";
import { http } from "@/lib/http";
import type z from "zod";

export class OptionalIncompatibilityService {
    static async list() {
        try {
            const res = await http.get('/optional-incompatibilities');
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

    static async create(data: z.infer<typeof optionalIncompatibilitiesFormSchema>) {
        try {
            const res = await http.post('/optional-incompatibilities', data);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
}