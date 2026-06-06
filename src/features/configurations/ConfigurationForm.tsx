import { Button } from '@/components/ui/button-1';
import { Checkbox } from "@/components/ui/checkbox";
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
import { configurationFormSchema } from '@/lib/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { AuthService } from '../auth/auth.service';
import type { Color } from '../colors/color.type';
import type { EngineVariant } from '../engineVariants/engineVariant.type';
import type { Model } from '../models/model.types';
import { type User } from '../users/user.type';
import { ConfigurationService } from './configuration.service';
import { useConfigurationStore } from "./configuration.store";
import { useLocation, useParams } from 'react-router';

const steps = [1, 2, 3, 4];
type ConfigurationFormValues = z.infer<typeof configurationFormSchema>;

export default function ConfigurationForm({ model }: { model: Model }) {
    const location = useLocation();
    const { id } = useParams();
    const isEdit = location.pathname.startsWith("/configurations");

    const {
        configurationId,
        currentStep,
        setConfigurationId,
        setCurrentStep,
    } = useConfigurationStore();

    const queryClient = useQueryClient();

    const { data: user } = useQuery<User>({
        queryFn: AuthService.user,
        queryKey: ['user']
    });

    const form = useForm<ConfigurationFormValues>({
        resolver: zodResolver(configurationFormSchema),
        values: {
            user_id: user?.id ?? 0,
            model_id: model.id,

            color_id: null,
            engine_variant_id: null,

            optional_ids: [],
            accessory_ids: [],

            status: "draft",
            current_step: 1,
            total_price: model.base_price,
        }
    });

    const createConfigurationMutation = useMutation({
        mutationFn: ConfigurationService.create,
        onSuccess: (response) => {
            setConfigurationId(
                response.data.id
            );
            setCurrentStep(2);
        },
    });

    const updateConfigurationMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
            ConfigurationService.update(id, data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ["configurations"],
            });
            console.log(response);
        },
        onError: (error: any) => {
            console.log(error.response?.data);
        }
    });

    const handleColorSubmit = (color: Color) => {
        form.setValue("color_id", color.id);
        console.log("USER", user);

        createConfigurationMutation.mutate({
            user_id: user!.id,
            model_id: model.id,
            color_id: color.id,
            engine_variant_id: null,
            optional_ids: [],
            accessory_ids: [],
            status: "draft",
            current_step: 1,
            total_price: 0, // ignorato dal backend
        });
    };

    const handleEngineSubmit = (engine: EngineVariant) => {
        form.setValue("engine_variant_id", engine.id);
        updateConfigurationMutation.mutate({
            id: configurationId!,
            data: {
                engine_variant_id: engine.id,
                current_step: 2,
            },
        });
    };

    const toggleOptional = (
        optionalId: number
    ) => {
        const current =
            form.getValues("optional_ids");

        if (current.includes(optionalId)) {
            form.setValue(
                "optional_ids",
                current.filter(
                    id => id !== optionalId
                )
            );
        } else {
            form.setValue(
                "optional_ids",
                [...current, optionalId]
            );
        }
    };

    const toggleAccessory = (
        accessoryId: number
    ) => {
        const current =
            form.getValues("accessory_ids");

        if (current.includes(accessoryId)) {
            form.setValue(
                "accessory_ids",
                current.filter(
                    id => id !== accessoryId
                )
            );
        } else {
            form.setValue(
                "accessory_ids",
                [...current, accessoryId]
            );
        }
    };

    const handleOptionalSubmit = () => {
        console.log("WATCH opt:", form.watch("optional_ids"));
        console.log("GET opt:", form.getValues("optional_ids"));
        updateConfigurationMutation.mutate({
            id: configurationId!,
            data: {
                optional_ids: form.watch("optional_ids"),
                current_step: 3,
            },
        });
        setCurrentStep(4);
    };

    const handleAccessorySubmit = () => {
        console.log("WATCH acc:", form.watch("accessory_ids"));
        console.log("GET acc:", form.getValues("accessory_ids"));
        updateConfigurationMutation.mutate({
            id: configurationId!,
            data: {
                accessory_ids:
                    form.watch("accessory_ids"),

                current_step: 4,
                status: "completed",
            },
        });
    };

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
                <StepperContent value={1}>
                    <div className="grid gap-4">
                        {model.colors?.map((color) => (
                            <Button
                                key={color.id}
                                type="button"
                                onClick={() =>
                                    handleColorSubmit(color)
                                }
                            >
                                {color.name}
                                (+€{color.extra_price})
                            </Button>
                        ))}
                    </div>
                </StepperContent>
                <StepperContent value={2}>
                    <div className="grid gap-4">
                        {model.engine_variants?.map((engine) => (
                            <Button
                                key={engine.id}
                                type="button"
                                onClick={() =>
                                    handleEngineSubmit(engine)
                                }
                            >
                                {engine.name}
                                (+€{engine.extra_price})
                            </Button>
                        ))}
                    </div>
                </StepperContent>
                <StepperContent className="w-full flex items-center justify-center" key={3} value={3}>
                    {/* FORM OPTIONALS */}
                    {model.optionals?.map((optional) => {
                        console.log("OPTIONAL RAW:", optional);

                        return (
                            <div
                                key={optional.pivot.optional_id}
                                className="flex items-center gap-2"
                            >
                                <Checkbox
                                    checked={form.watch("optional_ids")
                                        .includes(Number(optional.pivot.optional_id))}
                                    onCheckedChange={() =>
                                        toggleOptional(Number(optional.pivot.optional_id))
                                    }
                                />
                                <span className='text-white'>
                                    Optional {optional.name}
                                </span>
                            </div>
                        );
                    })}
                    <Button
                        type="button"
                        onClick={handleOptionalSubmit}
                    >
                        Conferma Optional
                    </Button>
                </StepperContent>
                <StepperContent className="w-full flex items-center justify-center" key={4} value={4}>
                    {/* FORM ACCESSORI */}
                    {model.accessories?.map((accessory) => (
                        <div
                            key={accessory.pivot.accessory_id}
                            className="flex items-center gap-2"
                        >
                            <Checkbox
                                checked={form.watch("accessory_ids")
                                    .includes(Number(accessory.pivot.accessory_id))}
                                onCheckedChange={() => toggleAccessory(Number(accessory.pivot.accessory_id))
                                }
                            />
                            <span>{accessory.name}</span>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={handleAccessorySubmit}
                    >
                        Conferma Accessori
                    </Button>
                </StepperContent>
            </StepperPanel>

            <div className="flex items-center justify-between gap-2.5">
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 1}>
                    Previous
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={currentStep === steps.length}
                >
                    Next
                </Button>
            </div>
        </Stepper>
    );
}
