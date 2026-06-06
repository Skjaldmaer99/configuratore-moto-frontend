import { Button } from '@/components/ui/button-1';
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldLabel
} from "@/components/ui/field";
import {
    Stepper,
    StepperContent,
    StepperIndicator,
    StepperItem,
    StepperNav,
    StepperPanel,
    StepperSeparator,
    StepperTrigger,
} from '@/components/ui/stepper';
import { accessoryFormSchema, configurationFormSchema, optionalFormSchema } from '@/lib/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { AuthService } from '../auth/auth.service';
import type { Model } from '../models/model.types';
import { type User } from '../users/user.type';
import { ConfigurationService } from './configuration.service';

const steps = [1, 2, 3, 4];

export default function ConfigurationForm({ model }: { model: Model }) {
    const { id, base_price } = model;
    const [configurationId, setConfigurationId] = useState<number | null>(null);
    const [totalPrice, setTotalPrice] = useState(base_price);

    console.log(model)
    const [currentStep, setCurrentStep] = useState(1);
    const queryClient = useQueryClient();

    const { data: user } = useQuery<User>({
        queryFn: AuthService.user,
        queryKey: ['user']
    });

    const formConfiguration = useForm<z.infer<typeof configurationFormSchema>>({
        resolver: zodResolver(configurationFormSchema),
        defaultValues: {
            user_id: user!.id,
            model_id: id,
            color_id: undefined,
            engine_variant_id: undefined,
            optional_ids: [],
            accessory_ids: [],
            status: 'draft',
            current_step: 1,
            total_price: base_price
        }
    })
    const mutationConfiguration = useMutation({
        mutationFn: ConfigurationService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["configurations"],
            });
        },
    })
    const mutationConfigurationUpdate = useMutation({
        mutationFn: (data) => ConfigurationService.update(configurationId!, data), // id della configuration appena creata
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["configurations"],
            });
        },
    })

    // configuration_optionals
    const formOptional = useForm<z.infer<typeof optionalFormSchema>>({
        resolver: zodResolver(optionalFormSchema),
    })
    const mutationOptional = useMutation({
        mutationFn: ConfigurationService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["optionals"],
            });
        },
    })

    // configuration_accessories
    const formAccessory = useForm<z.infer<typeof accessoryFormSchema>>({
        resolver: zodResolver(accessoryFormSchema),
    })
    const mutationAccessory = useMutation({
        mutationFn: ConfigurationService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["accessories"],
            });
        },
    })


    const onSubmit = (values: z.infer<typeof configurationFormSchema>) => {
        mutationConfiguration.mutate(values)
    }
    const onUpdate = (values: z.infer<typeof configurationFormSchema>) => {
        mutationConfigurationUpdate.mutate(values)
    }
    const onSubmitOptional = (values: z.infer<typeof optionalFormSchema>) => {
        mutationOptional.mutate(values)
    }
    const onSubmitAccessory = (values: z.infer<typeof accessoryFormSchema>) => {
        mutationAccessory.mutate(values)
    }



    return (
        <Stepper value={currentStep} onValueChange={setCurrentStep} className="space-y-8">
            <StepperNav>
                {steps.map((step) => (
                    <StepperItem key={step} step={step}>
                        <StepperTrigger asChild>
                            <StepperIndicator className="data-[state=completed]:bg-green-500 data-[state=completed]:text-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-500">
                                {step}
                            </StepperIndicator>
                        </StepperTrigger>
                        {steps.length > step && <StepperSeparator className="group-data-[state=completed]/step:bg-green-500" />}
                    </StepperItem>
                ))}
            </StepperNav>

            <StepperPanel className="text-sm">
                <StepperContent className="w-full flex items-center justify-center" key={1} value={1}>
                    {/* FORM COLORE */}
                    <form onSubmit={formConfiguration.handleSubmit(onUpdate)}>
                        {/* model.colors.map */}
                        <Button type='submit'>Seleziona il colore</Button>
                    </form>
                </StepperContent>
                <StepperContent className="w-full flex items-center justify-center" key={2} value={2}>
                    {/* FORM ENGINE */}
                    <form onSubmit={formConfiguration.handleSubmit(onUpdate)}>
                        {/* model.engine_variants.map */}
                        <Button type='submit'>Seleziona la cilindrata</Button>
                    </form>
                </StepperContent>
                <StepperContent className="w-full flex items-center justify-center" key={3} value={3}>
                    {/* FORM OPTIONALS */}
                    <form onSubmit={formOptional.handleSubmit(onSubmitOptional)}>
                        <Controller
                            name="optionals"
                            control={formOptional.control}
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel>Optional</FieldLabel>
                                    <div className="space-y-2">
                                        {model.optionals?.map((optional) => (
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
                        <Button type='submit'>Seleziona gli optionals</Button>
                    </form>
                </StepperContent>
                <StepperContent className="w-full flex items-center justify-center" key={4} value={4}>
                    {/* FORM ACCESSORI */}
                    <form onSubmit={formAccessory.handleSubmit(onSubmitAccessory)}>
                        <Controller
                            name="model_accessory_compatibility"
                            control={formAccessory.control}
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel>Accessori</FieldLabel>

                                    <div className="space-y-2">
                                        {model.accessories?.map((accessory) => (
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
                        <Button type='submit'>Seleziona gli accessori</Button>
                    </form>
                </StepperContent>
            </StepperPanel>

            <div className="flex items-center justify-between gap-2.5">
                <Button variant="outline" onClick={() => setCurrentStep((prev) => prev - 1)} disabled={currentStep === 1}>
                    Previous
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    disabled={currentStep === steps.length}
                >
                    Next
                </Button>
            </div>
        </Stepper>
    );
}
