import type { configurationFormSchema } from "@/lib/constant";
import { http } from "@/lib/http";
import type z from "zod";

export class ConfigurationService {
    static async show(id: number) {
        try {
            const res = await http.get(`/configurations/${id}`);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
    static async create(data: z.infer<typeof configurationFormSchema>) {
        try {
            const res = await http.post('/configurations', data);
            return res.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

    static async update(id: number, data: z.infer<typeof configurationFormSchema>) {
        try {
            const res = await http.patch(`/configurations/${id}`, data);
            return res.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

    static async delete(id: number) {
        try {
            await http.delete(`/configurations/${id}`);
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
}