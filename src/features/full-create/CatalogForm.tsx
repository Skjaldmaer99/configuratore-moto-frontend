import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldError,
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
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTrigger } from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import { fullCreateFormSchema } from "@/lib/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { AccessoryService } from "../accessories/accessory.service";
import type { Accessory } from "../accessories/accessory.type";
import { OptionalService } from "../optionals/optional.service";
import type { Optional } from "../optionals/optional.type";
import { CatalogService } from "./catalog.service";

type Schema = z.infer<typeof fullCreateFormSchema>;

// DATI MOCK
const brands = ["Yamaha", "Honda", "KTM", "Kawasaki", "Aprilia", "Ducati"];
const categories = ["Sport", "Naked", "Touring", "Adventure"];

const steps = [1, 2, 3, 4];

export function CatalogForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const queryClient = useQueryClient();

    const { data: optionals } = useQuery<Optional[]>({
        queryFn: OptionalService.list,
        queryKey: ['optionals']
    });
    const { data: accessories } = useQuery<Accessory[]>({
        queryFn: AccessoryService.list,
        queryKey: ['accessories']
    });


    const form = useForm<Schema>({
        resolver: zodResolver(fullCreateFormSchema),
        defaultValues: {
            model: {
                brand: "",
                name: "",
                category: "",
                base_price: 0,
                description: "",
            },
            colors: [
                {
                    name: "",
                    hex_code: "",
                    extra_price: 0,
                },
            ],
            engine_variants: [
                {
                    name: "",
                    displacement_cc: 0,
                    engine_type: "",
                    cylinders: 0,
                    horsepower: 0,
                    gearbox: "manuale",
                    fuel_type: "benzina",
                    extra_price: 0,
                },
            ],
            model_optional_compatibility: [],
            model_accessory_compatibility: [],
        },
    });

    const nextStep = async () => {
        let valid = false;

        switch (currentStep) {
            case 1:
                valid = await form.trigger([
                    "model.brand",
                    "model.name",
                    "model.category",
                    "model.base_price",
                ]);
                break;

            case 2:
                valid = await form.trigger("colors");
                break;

            case 3:
                valid = await form.trigger("engine_variants");
                break;

            case 4:
                valid = true;
                break;
        }

        if (valid) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const {
        fields: colorFields,
        append: appendColor,
        remove: removeColor,
    } = useFieldArray({
        control: form.control,
        name: "colors",
    });

    const {
        fields: engineFields,
        append: appendEngine,
        remove: removeEngine,
    } = useFieldArray({
        control: form.control,
        name: "engine_variants",
    });

    // MUTATION
    const mutation = useMutation({
        mutationFn: CatalogService.fullCreate,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["catalogs"],
            });
            form.reset();
        },
    });

    function onSubmit(values: z.infer<typeof fullCreateFormSchema>) {
        console.log(values.model.brand);
        mutation.mutate(values)
    }


    // SUCCESS
    if (mutation.isSuccess) {
        return (
            <div className="p-8 border rounded-lg">
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex justify-center mb-4">
                        <Check className="size-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-center">
                        Catalog creato correttamente
                    </h2>
                </motion.div>
            </div>
        );
    }

    // FORM
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stepper
                value={currentStep}
                onValueChange={setCurrentStep}
            >
                <StepperNav>
                    {steps.map((step) => (
                        <StepperItem
                            key={step}
                            step={step}
                        >
                            <StepperTrigger asChild>
                                <StepperIndicator>
                                    {step}
                                </StepperIndicator>
                            </StepperTrigger>

                            {step < steps.length && (
                                <StepperSeparator />
                            )}
                        </StepperItem>
                    ))}
                </StepperNav>

                <StepperPanel>
                    <StepperContent value={1}>
                        <div className="grid gap-4">
                            {/* BRAND */}
                            <Controller
                                name="model.brand"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Brand</FieldLabel>

                                        <Select
                                            value={String(field.value)}
                                            onValueChange={(value) =>
                                                field.onChange(value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Brand" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {brands.map((brand) => (
                                                    <SelectItem
                                                        key={brand}
                                                        value={brand}
                                                    >
                                                        {brand}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FieldError errors={[fieldState.error]} />
                                    </Field>
                                )}
                            />
                            {/* MODEL NAME */}
                            <Controller
                                name="model.name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Modello</FieldLabel>
                                        <Input {...field} placeholder="R1" />
                                        <FieldError errors={[fieldState.error]} />
                                    </Field>
                                )}
                            />

                            {/* CATEGORY */}
                            <Controller
                                name="model.category"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Categoria</FieldLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Categoria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.toLowerCase()}
                                                        value={category.toLowerCase()}
                                                    >
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <FieldError errors={[fieldState.error]} />
                                    </Field>
                                )}
                            />
                            {/* BASE PRICE */}
                            <Controller
                                name="model.base_price"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Prezzo base</FieldLabel>
                                        <Input
                                            type="number"
                                            value={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.valueAsNumber)
                                            }
                                        />
                                        <FieldError errors={[fieldState.error]} />
                                    </Field>
                                )}
                            />
                            {/* DESCRIPTION */}
                            <Controller
                                name="model.description"
                                control={form.control}
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel>Descrizione</FieldLabel>

                                        <Textarea {...field} />
                                    </Field>
                                )}
                            />
                        </div>
                    </StepperContent>

                    <StepperContent value={2}>
                        <div className="space-y-4">
                            {colorFields.map((color, index) => (
                                <div
                                    key={color.id}
                                    className="border rounded-lg p-4 space-y-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">
                                            Colore #{index + 1}
                                        </h3>

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => removeColor(index)}
                                        >
                                            Rimuovi
                                        </Button>
                                    </div>
                                    {/* NAME */}
                                    <Controller
                                        name={`colors.${index}.name`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Nome colore</FieldLabel>

                                                <Input {...field} />
                                            </Field>
                                        )}
                                    />
                                    {/* HEX */}
                                    <Controller
                                        name={`colors.${index}.hex_code`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Hex color</FieldLabel>

                                                <Input {...field} placeholder="#FFFFFF" />
                                            </Field>
                                        )}
                                    />

                                    {/* EXTRA PRICE */}
                                    <Controller
                                        name={`colors.${index}.extra_price`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Prezzo extra</FieldLabel>

                                                <Input
                                                    type="number"
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.valueAsNumber
                                                        )
                                                    }
                                                />
                                            </Field>
                                        )}
                                    />
                                    {/* IMAGE */}
                                    <Controller
                                        name={`colors.${index}.image`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Immagine</FieldLabel>

                                                <Input
                                                    type="file"
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.files?.[0]
                                                        )
                                                    }
                                                />
                                            </Field>
                                        )}
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() =>
                                    appendColor({
                                        name: "",
                                        hex_code: "",
                                        extra_price: 0,
                                        image: undefined,
                                    })
                                }
                            >
                                Aggiungi colore
                            </Button>
                        </div>
                    </StepperContent>

                    <StepperContent value={3}>
                        <div className="space-y-4">
                            {engineFields.map((engine, index) => (
                                <div
                                    key={engine.id}
                                    className="border rounded-lg p-4 space-y-4"
                                >
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">
                                            Variante #{index + 1}
                                        </h3>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => removeEngine(index)}
                                        >
                                            Rimuovi
                                        </Button>
                                    </div>
                                    <Controller
                                        name={`engine_variants.${index}.name`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Nome variante</FieldLabel>
                                                <Input {...field} />
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name={`engine_variants.${index}.displacement_cc`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>CC</FieldLabel>
                                                <Input
                                                    type="number"
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.valueAsNumber
                                                        )
                                                    }
                                                />
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name={`engine_variants.${index}.engine_type`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Tipo motore</FieldLabel>
                                                <Input {...field} />
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name={`engine_variants.${index}.cylinders`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Cilindri</FieldLabel>
                                                <Input
                                                    type="number"
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.valueAsNumber
                                                        )
                                                    }
                                                />
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name={`engine_variants.${index}.horsepower`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Cavalli</FieldLabel>

                                                <Input
                                                    type="number"
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(e.target.valueAsNumber)
                                                    }
                                                />
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name={`engine_variants.${index}.gearbox`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Cambio</FieldLabel>

                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleziona cambio" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectItem value="manuale">Manuale</SelectItem>
                                                        <SelectItem value="semi-automatico">Semi-automatico</SelectItem>
                                                        <SelectItem value="automatico">Automatico</SelectItem>
                                                        <SelectItem value="dct">DCT</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name={`engine_variants.${index}.fuel_type`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Alimentazione</FieldLabel>

                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Tipo carburante" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectItem value="benzina">Benzina</SelectItem>
                                                        <SelectItem value="diesel">Diesel</SelectItem>
                                                        <SelectItem value="elettrica">Elettrica</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name={`engine_variants.${index}.extra_price`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Prezzo extra</FieldLabel>
                                                <Input
                                                    type="number"
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.valueAsNumber
                                                        )
                                                    }
                                                />
                                            </Field>
                                        )}
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() =>
                                    appendEngine({
                                        name: "",
                                        displacement_cc: 0,
                                        engine_type: "",
                                        cylinders: 0,
                                        horsepower: 0,
                                        gearbox: "manuale",
                                        fuel_type: "benzina",
                                        extra_price: 0,
                                    })
                                }
                            >
                                Aggiungi variante
                            </Button>
                        </div>
                    </StepperContent>

                    <StepperContent value={4}>
                        <div className="space-y-8">
                            {/* OPTIONALS */}
                            <Controller
                                name="model_optional_compatibility"
                                control={form.control}
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel>Optional</FieldLabel>
                                        <div className="space-y-2">
                                            {optionals?.map((optional) => (
                                                <div
                                                    key={optional.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Checkbox
                                                        checked={field.value.includes(
                                                            optional.id
                                                        )}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                field.onChange([
                                                                    ...field.value,
                                                                    optional.id,
                                                                ]);
                                                            } else {
                                                                field.onChange(
                                                                    field.value.filter(
                                                                        (id) =>
                                                                            id !== optional.id
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <span>{optional.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Field>
                                )}
                            />

                            {/* ACCESSORIES */}
                            <Controller
                                name="model_accessory_compatibility"
                                control={form.control}
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel>Accessori</FieldLabel>

                                        <div className="space-y-2">
                                            {accessories?.map((accessory) => (
                                                <div
                                                    key={accessory.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Checkbox
                                                        checked={field.value.includes(
                                                            accessory.id
                                                        )}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                field.onChange([
                                                                    ...field.value,
                                                                    accessory.id,
                                                                ]);
                                                            } else {
                                                                field.onChange(
                                                                    field.value.filter(
                                                                        (id) =>
                                                                            id !== accessory.id
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    />

                                                    <span>{accessory.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Field>
                                )}
                            />
                        </div>
                    </StepperContent>

                </StepperPanel>

                <div className="flex justify-between">
                    <Button
                        type="button"
                        onClick={() =>
                            setCurrentStep((prev) => prev - 1)
                        }
                        disabled={currentStep === 1}
                    >
                        Previous
                    </Button>

                    {currentStep < steps.length ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                        >
                            Salva Catalog
                        </Button>
                    )}
                </div>

            </Stepper>
        </form>
    );
}
