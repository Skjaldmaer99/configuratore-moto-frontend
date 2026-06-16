import {
    Button
} from "@/components/ui/button"
import {
    Checkbox
} from "@/components/ui/checkbox"
import {
    Field,
    FieldError,
    FieldLabel
} from "@/components/ui/field"
import {
    Input
} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { AuthService } from "@/features/auth/auth.service"
import { registerFormSchema } from "@/lib/constant"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
    Controller,
    useForm
} from "react-hook-form"
import { Link, useNavigate } from "react-router"
import {
    toast
} from "sonner"
import {
    z
} from "zod"

export default function RegisterForm() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            privacy_policy: false,
        }
    })

    const mutation = useMutation({
        mutationFn: AuthService.register,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            toast.success("Registrazione avvenuta con successo");
            form.reset();
            navigate('/login');
        },
        onError: () => {
            toast.error("Errore nella registrazione");
        }
    })

    async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        mutation.mutate(values);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-md mx-auto py-10">
            <Field>
                <Input
                    id="name"
                    placeholder="Inserisci il nome"
                    className="rounded-full border-primary"

                    {...form.register("name")}
                />
                <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>
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
                <Controller
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="role" className="rounded-full border-primary">
                                <SelectValue placeholder="Ruolo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="customer">Customer</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <FieldError>{form.formState.errors.role?.message}</FieldError>
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
            <Field>
                <Input
                    id="password_confirmation"
                    placeholder="Conferma la password"
                    className="rounded-full border-primary"
                    type="password"

                    {...form.register("password_confirmation")}
                />
                <FieldError>{form.formState.errors.password_confirmation?.message}</FieldError>
            </Field>
            <Field className="flex flex-row items-start space-y-0 rounded-md">
                <Checkbox
                    id="privacy_policy"
                    className={"w-4! border-primary"}
                    checked={form.watch("privacy_policy")}
                    onCheckedChange={(value) =>
                        form.setValue("privacy_policy", value)
                    }
                    {...form.register("privacy_policy")}
                />
                <div className="space-y-1 leading-none">
                    <FieldLabel htmlFor="privacy_policy">Acconsento al trattamento dei dati secondo la Privacy Policy</FieldLabel>
                    <FieldError>{form.formState.errors.privacy_policy?.message}</FieldError>
                </div>
            </Field>
            <div>
                <Button type="submit" className="mb-3">Registrati</Button>
                <p className="text-sm">Sei già registrato? Vai alla pagina di <Link to={'/login'} className="underline">Login</Link></p>
            </div>
        </form>
    )
}