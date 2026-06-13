import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { optionalFormSchema } from "@/lib/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { OptionalService } from "../optionals/optional.service";

type OptionalFormValues = z.infer<typeof optionalFormSchema>;

export function OptionalCreationForm() {
    const queryClient = useQueryClient();

    const form = useForm<OptionalFormValues>({
        resolver: zodResolver(optionalFormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            type: 'comfort'
        }
    });

    const types = ['performance', 'touring', 'protection', 'comfort'];

    const mutation = useMutation({
        mutationFn: OptionalService.create,
        mutationKey: ['optionals'],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["catalogs"],
            });
            queryClient.invalidateQueries({
                queryKey: ["optionals"],
            });
            form.reset();
            toast.success("Optional creato con successo")
        },
        onError: () => {
            toast.error("Errore nella creazione dell'optional")
        }
    })

    const onSubmit: SubmitHandler<OptionalFormValues> = (values) => {
        mutation.mutate(values);
    };

    return (
        <Dialog>
            <DialogTrigger render={
                <Button className={'border border-black bg-white text-black my-auto'}>Crea Optional</Button>}
            />
            <DialogContent className='rounded-4xl'>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="my-auto"
                >
                    <DialogHeader>
                        <DialogTitle>Crea un nuovo Optional</DialogTitle>
                        <DialogDescription className="mb-5">
                            Crea un nuovo optional.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        type="text"
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Inserisci il nome"
                                        className="border-black rounded-full"
                                    />

                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="description">Descrizione </FieldLabel>
                                    <Textarea
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        id="description"
                                        placeholder="Inserisci la descrizione"
                                        className="border-black rounded-3xl"
                                    />

                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="price"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="price">Prezzo</FieldLabel>
                                    <Input
                                        {...field}
                                        id="price"
                                        type="number"
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Inserisci il prezzo"
                                        className="border-black rounded-full"
                                    />

                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="type"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                        className="gap-1 col-span-full"
                                    >
                                        <FieldLabel htmlFor="type">Tipo</FieldLabel>

                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full border-black rounded-full">
                                                <SelectValue placeholder="Seleziona il tipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {types.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                    </FieldGroup>
                    <DialogFooter className="flex justify-end items-center w-full mx-auto px-0 bg-transparent">
                        <Button
                            type="submit"
                            disabled={mutation.isPending}>
                            Salva
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
