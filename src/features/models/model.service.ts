import type { modelFormSchema } from "@/lib/constant";
import { http } from "@/lib/http";
import type z from "zod";
import type { Model } from "./model.types";

export class ModelService {
    static async list() {
        try {
            const res = await http.get('/models');
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

    static async find(id: string): Promise<Model> {
        try {
            const res = await http.get(`/models/${+id}`);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

    static async create(data: z.infer<typeof modelFormSchema>) {
        try {
            const res = await http.post('/models', data);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
}