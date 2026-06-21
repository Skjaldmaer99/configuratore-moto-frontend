import {
    Button
} from "@/components/ui/button"
import {
    Field,
    FieldError
} from "@/components/ui/field"
import {
    Input
} from "@/components/ui/input"
import { AuthService } from "@/features/auth/auth.service"
import { loginFormSchema } from "@/lib/constant"
import { http } from "@/lib/http"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
    useForm
} from "react-hook-form"
import { Link, useNavigate } from "react-router"
import {
    toast
} from "sonner"
import {
    z
} from "zod"

export default function LoginForm() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
    })

    const mutation = useMutation({
        mutationFn: AuthService.login,
        onSuccess: async (data) => {
            const user = data.user;
            const token = localStorage.getItem('authToken');
            queryClient.invalidateQueries({
                queryKey: ['configurations']
            })
            queryClient.invalidateQueries({
                queryKey: ['catalogs']
            })
            queryClient.invalidateQueries({
                queryKey: ['models']
            })
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            toast.success("Login effettuato con successo");
            // se l'utente non ha verificato la mail, finisco nella pagina di verifica
            if (user.email_verified_at === null) {
                await http.post('/email/verification-notification', null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                window.location.href = '/verify-email';
            }
            navigate('/');
            window.location.href = '/';
        },
        onError: () => {
            toast.error("Credenziali errate");
        }
    })

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        mutation.mutate(values);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
            <Field>
                <Input
                    id="email"
                    placeholder="Inserisci la mail"
                    className="rounded-full border-primary"

                    {...form.register("email")}
                />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
            <Field>
                <Input
                    id="password"
                    placeholder="Inserisci la password"
                    className="rounded-full border-primary"
                    type="password"

                    {...form.register("password")}
                />
                <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>
            <div>
                <Button type="submit" className="mb-3">Accedi</Button>
                <p className="text-sm">Password dimenticata? <Link to={'/recupero-password'} className="underline">Recupera password</Link></p>
                <p className="text-sm">Non hai un account? <Link to={'/register'} className="underline">Registrati</Link></p>
            </div>
        </form>
    )
}