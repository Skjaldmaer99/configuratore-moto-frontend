import { http } from "@/lib/http"
import type z from "zod";
import { loginFormSchema, recuperoPasswordFormSchema, registerFormSchema, resetPasswordFormSchema } from "@/lib/constant"
import { isAxiosError } from "axios";

export class AuthService {

    static async register(data: z.infer<typeof registerFormSchema>) {
        try {
            const res = await http.post('/register', data);
            return res.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

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
            if (isAxiosError(error) && error.response) {
                // Prende il messaggio di errore inviato da Laravel
                throw new Error(error.response.data?.message || "Credenziali errate");
            }
            throw new Error("Errore di connessione al server");
        }
    }

    static async logout() {
        await http.post('/logout');
        localStorage.removeItem('authToken');
    }

    static async user() {
        try {
            const res = await http.get('/user');
            return res.data.user;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }

    static async forgotPassword(data: z.infer<typeof recuperoPasswordFormSchema>) {
        try {
            const res = await http.post('/forgot-password', data);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "errore generico");
        }
    }
    static async resetPassword(data: z.infer<typeof resetPasswordFormSchema>) {
        try {
            const res = await http.post('/reset-password', data);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "errore generico");
        }
    }
}