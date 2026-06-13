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
import {
    zodResolver
} from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

    const { data: user } = useQuery({
        queryFn: AuthService.user,
        queryKey: ['user']
    });

    const mutation = useMutation({
        mutationFn: AuthService.login,
        onSuccess: () => {
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
            if (user?.role === "admin") {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        },
        onError: () => {
            toast.error("Errore nel login");
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