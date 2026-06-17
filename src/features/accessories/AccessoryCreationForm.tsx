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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { accessoryFormSchema } from "@/lib/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { AccessoryService } from "./accessory.service";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type AccessoryFormValues = z.infer<typeof accessoryFormSchema>;

export function AccessoryCreationForm() {
    const queryClient = useQueryClient();

    const form = useForm<AccessoryFormValues>({
        resolver: zodResolver(accessoryFormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: 'tech'
        }
    });

    const categories = ['tech', 'style'];

    const mutation = useMutation({
        mutationFn: AccessoryService.create,
        mutationKey: ['accessories'],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["catalogs"],
            });
            queryClient.invalidateQueries({
                queryKey: ["accessories"],
            });
            form.reset();
            toast.success("Accessorio creato con successo")
        },
        onError: () => {
            toast.error("Errore nella creazione dell'Accessorio")
        }
    })

    const onSubmit: SubmitHandler<AccessoryFormValues> = (values) => {
        mutation.mutate(values)
    };


    return (
        <Dialog>
            <DialogTrigger render={
                <Button className={'border border-black bg-white text-black my-auto'}>Crea Accessorio</Button>}
            />
            <DialogContent className='rounded-4xl'>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="my-auto"
                >
                    <DialogHeader>
                        <DialogTitle>Crea un nuovo Accessorio</DialogTitle>
                        <DialogDescription className="mb-5">
                            Crea un nuovo accessorio.
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
                            name="category"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                        className="gap-1 col-span-full"
                                    >
                                        <FieldLabel htmlFor="type">Categoria</FieldLabel>

                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full border-black rounded-full">
                                                <SelectValue placeholder="Seleziona il tipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
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
