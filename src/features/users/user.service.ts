import { http } from "@/lib/http";

export class UserService {
    static async list() {
        try {
            const res = await http.get('/users');
            return res.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
}