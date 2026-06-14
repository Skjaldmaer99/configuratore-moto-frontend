
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { resetPasswordFormSchema } from '@/lib/constant'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import z from 'zod'
import { AuthService } from './auth.service'

type ResetPasswordPayload = {
    email: string | null;
    token: string | null;
    password: string;
    password_confirmation: string;
}

const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
        resolver: zodResolver(resetPasswordFormSchema),
    });

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data: ResetPasswordPayload) => AuthService.resetPassword(data),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['configurations'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            toast.success("Password modificata con successo");
            form.reset();
            navigate('/success-password')
        },
        onError: () => {
            toast.error("Errore durante l'accesso");
        }
    })

    async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
        mutation.mutate({
            ...values,
            email,
            token
        });
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
            <Field>
                <FieldLabel>Password</FieldLabel>
                <Input placeholder="********"
                    type="password"
                    className="rounded-full border-primary"
                    {...form.register("password")} />
                <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>
            <Field>
                <FieldLabel>Conferma Password</FieldLabel>
                <Input placeholder="********"
                    type="password"
                    className="rounded-full border-primary"
                    {...form.register("password_confirmation")} />
                <FieldError>{form.formState.errors.password_confirmation?.message}</FieldError>
            </Field>
            <Button type="submit">Salva</Button>
        </form>
    )
}

export default ResetPasswordForm
