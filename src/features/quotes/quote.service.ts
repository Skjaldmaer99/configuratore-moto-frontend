import { http } from "@/lib/http";

export class QuoteService {
    static async generate(configurationId: number) {
        try {
            const res = await http.post(`/configurations/${configurationId}/quote`);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico")
        }
    }

    static async download(quoteId: number) {
        try {
            const res = await http.get(`/quotes/${quoteId}/download`, { responseType: "blob" });
            return res.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico")
        }
    }
}