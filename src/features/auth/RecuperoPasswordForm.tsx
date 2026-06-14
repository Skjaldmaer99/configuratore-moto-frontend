import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { recuperoPasswordFormSchema } from '@/lib/constant'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import z from 'zod'
import { AuthService } from './auth.service'

const RecuperoPasswordForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof recuperoPasswordFormSchema>>({
        resolver: zodResolver(recuperoPasswordFormSchema),
    })

    const mutation = useMutation({
        mutationFn: AuthService.forgotPassword,
        mutationKey: ['user'],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            toast.success("Email di recupero inviata con successo");
            form.reset();
            navigate('/redirect-password')
        },
        onError: () => {
            toast.error("Errore nell'invio dei dati");
        }
    })

    const onSubmit = (values: z.infer<typeof recuperoPasswordFormSchema>) => {
        mutation.mutate(values)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
            <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                    placeholder="mario@rossi.it"
                    className="rounded-full border-primary"
                    {...form.register("email")}
                />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
            <Button type="submit">Invia</Button>
            <div>
                {/* <Button type="submit" className="mb-3">Recupera</Button> */}
                <p className="text-sm">Non hai un account? <Link to={'/register'} className="underline">Registrati</Link></p>
            </div>
        </form>
    )
}

export default RecuperoPasswordForm
