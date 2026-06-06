import { http } from "@/lib/http"
import type z from "zod";
import { loginFormSchema, registerFormSchema } from "@/lib/constant"

export class AuthService {
    static async login(data: z.infer<typeof loginFormSchema>) {
        try {
            const res = await http.post('/login', data);
            const token = res.data.token;
            const user = res.data.user;

            if (!token) {
                throw new Error('Token non valido');
            }

            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            return res.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

    static async register(data: z.infer<typeof registerFormSchema>) {
        try {
            const res = await http.post('/register', data);
            return res.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

    static async user() {
        try {
            const res = await http.get('/user');
            return res.data.user;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
}