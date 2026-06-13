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
import { optionalIncompatibilitiesFormSchema } from "@/lib/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { OptionalService } from "../optionals/optional.service";
import type { Optional } from "../optionals/optional.type";
import { OptionalIncompatibilityService } from "./optionalIncompatibility.service";

export function OptionalIncompatibilitiesForm() {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof optionalIncompatibilitiesFormSchema>>({
        resolver: zodResolver(optionalIncompatibilitiesFormSchema),
    });

    const { data: optionals } = useQuery({
        queryFn: OptionalService.list,
        queryKey: ['optionals']
    });

    const mutation = useMutation({
        mutationFn: OptionalIncompatibilityService.create,
        mutationKey: ['optional-incompatibilities'],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["catalogs"],
            });
            queryClient.invalidateQueries({
                queryKey: ['optional-incompatibilities'],
            });
            form.reset();
            toast.success("Incompatibilità inserite con successo")
        },
        onError: () => {
            toast.error("Errore nel caricamento delle incompatibilità")
        }
    })

    function onSubmit(values: z.infer<typeof optionalIncompatibilitiesFormSchema>) {
        mutation.mutate(values)
    };

    return (
        <Dialog>
            <DialogTrigger render={
                <Button className={'border border-black bg-white text-black my-auto'}>Imposta incompatibilità</Button>}
            />
            <DialogContent className='rounded-4xl'>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="my-auto"
                >
                    <DialogHeader>
                        <DialogTitle>Incompatibilità degli Optionals</DialogTitle>
                        <DialogDescription className="mb-5">
                            Inserisci gli optionals incompatibili. In questo modo l'utente, selezionando gli optionals in fase di configurazione, non potrà inserire quelli incompatibili tra loro.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
                        <Controller
                            name="optional_1_id"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                const selectedOptional = optionals?.find((opt: Optional) => opt.id === field.value);
                                return (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                        className="gap-1 col-span-full"
                                    >
                                        <FieldLabel htmlFor="select-54c">Seleziona il primo optional</FieldLabel>

                                        <Select value={field.value}
                                            onValueChange={(val) => field.onChange(val)}
                                        >
                                            <SelectTrigger className="w-full border-black rounded-full">
                                                <SelectValue placeholder="Select an option">
                                                    {selectedOptional ? selectedOptional.name : null}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {optionals.map((option: Optional) => (
                                                    <SelectItem key={option.id}
                                                        value={option.id}
                                                    >
                                                        {option.name}
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

                        <Controller
                            name="optional_2_id"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                const selectedOptional = optionals?.find((opt: Optional) => opt.id === field.value);
                                return (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                        className="gap-1 col-span-full"
                                    >
                                        <FieldLabel htmlFor="select-0f1">Seleziona il secondo optional</FieldLabel>

                                        <Select value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full border-black rounded-full">
                                                <SelectValue placeholder="Select an option">
                                                    {selectedOptional ? selectedOptional.name : null}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {optionals.map((option: Optional) => (
                                                    <SelectItem key={option.id} value={option.id}>
                                                        {option.name}
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
                        {/* <DialogClose render={
                            }
                            /> */}
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
