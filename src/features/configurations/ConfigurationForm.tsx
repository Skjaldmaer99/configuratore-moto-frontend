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
import type { Configuration } from './configuration.type';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DialogConfiguration from '@/components/DialogConfiguration';

const steps = [1, 2, 3, 4];
type ConfigurationFormValues = z.infer<typeof configurationFormSchema>;

export default function ConfigurationForm({ model }: { model: Model }) {
    const location = useLocation();
    const { id } = useParams();
    const isEdit = location.pathname.startsWith("/configurations");

    const {
        configurationId,
        currentStep = 1,
        setConfigurationId,
        setCurrentStep,
    } = useConfigurationStore();

    const queryClient = useQueryClient();

    const { data: user } = useQuery<User>({
        queryFn: AuthService.user,
        queryKey: ['user']
    });

    const { data: configuration } = useQuery<Configuration>({
        queryFn: () => ConfigurationService.show(isEdit ? id : configurationId),
        queryKey: ['configuration', configurationId],
    });
    console.log(configuration)

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
        }
    });

    const createConfigurationMutation = useMutation({
        mutationFn: ConfigurationService.create,
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ['configurations']
            })
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            setConfigurationId(
                response.data.id
            );
            setCurrentStep(currentStep + 1);
        },
    });

    const updateConfigurationMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
            ConfigurationService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["configurations"],
            });
            queryClient.invalidateQueries({
                queryKey: ["configuration"],
            });
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            setCurrentStep(currentStep + 1);
        },
        onError: (error: any) => {
        }
    });

    const handleColorSubmit = (color: Color) => {
        form.setValue("color_id", color.id);
        if (!isEdit) {
            createConfigurationMutation.mutate({
                user_id: user!.id,
                model_id: model.id,
                color_id: color.id,
                engine_variant_id: null,
                optional_ids: [],
                accessory_ids: [],
                status: "draft",
                current_step: 1,
            });
        }
        console.log(configuration ? Number(configuration.total_price) + color.extra_price : model.base_price + color.extra_price,)
        updateConfigurationMutation.mutate({
            id: !isEdit ? configurationId! : Number(id),
            data: {
                color_id: color.id,
                current_step: 1
            },
        });
    };

    const handleEngineSubmit = (engine: EngineVariant) => {
        form.setValue("engine_variant_id", engine.id);
        updateConfigurationMutation.mutate({
            id: !isEdit ? configurationId! : Number(id),
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
        updateConfigurationMutation.mutate({
            id: !isEdit ? configurationId! : Number(id),
            data: {
                optional_ids: form.watch("optional_ids"),
                current_step: 3,
            },
        });
    };

    const handleAccessorySubmit = () => {
        updateConfigurationMutation.mutate({
            id: !isEdit ? configurationId! : Number(id),
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
            <StepperNav className='mt-[-50%]'>
                {steps.map((step) => (
                    <StepperItem key={step} step={step}>
                        <StepperTrigger asChild>
                            <StepperIndicator className="w-10 h-10 data-[state=completed]:bg-red-700 data-[state=completed]:text-white data-[state=active]:bg-white data-[state=active]:text-red-700 border-1 data-[state=active]:border-red-700 data-[state=inactive]:text-gray-500">
                                {step}
                            </StepperIndicator>
                        </StepperTrigger>
                        {steps.length > step && <StepperSeparator className="group-data-[state=completed]/step:bg-red-700" />}
                    </StepperItem>
                ))}
            </StepperNav>

            <StepperPanel className="text-sm">
                <div className='flex justify-between'>
                    {currentStep == 1
                        ? <p className='uppercase font-extrabold text-white text-2xl mb-10'>Seleziona il colore</p>
                        : currentStep == 2
                            ? <p className='uppercase font-extrabold text-white text-2xl mb-10'>Seleziona la cilindrata</p>
                            : currentStep == 3
                                ? <p className='uppercase font-extrabold text-white text-2xl mb-10'>Seleziona gli optionals</p>
                                : <p className='uppercase font-extrabold text-white text-2xl mb-10'>Seleziona gli accessori</p>
                    }
                    <p className='text-white'>Prezzo: <span className='font-bold text-lg'>{(configuration && configuration.total_price !== 0.00) ? configuration.total_price : ""}</span></p>
                </div>
                <StepperContent value={1}>
                    <div className="flex gap-7 justify-center">
                        {model.colors?.map((color) => (
                            <Button
                                key={color.id}
                                type="button"
                                className='flex p-3 pe-5 border-1 border-black rounded-full bg-white hover:bg-white/40 mx-auto h-15'
                                onClick={() =>
                                    handleColorSubmit(color)
                                }
                            >
                                <p className='h-10 w-10 rounded-full border-1 border-black' style={{ backgroundColor: color.hex_code }}></p>
                                <div className='text-black'>
                                    <p className='text-lg font-sans uppercase font-extrabold'>{color.name}</p>
                                    <p className='text-sm'>€{color.extra_price}</p>
                                </div>
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
                                className='flex p-3 px-6 border-1 border-black rounded-full bg-white hover:bg-white/40 mx-auto h-13'
                                onClick={() =>
                                    handleEngineSubmit(engine)
                                }
                            >
                                {/*                                 <p className='h-10 w-10 rounded-full border-1 border-black' style={{ backgroundColor: color.hex_code }}></p> */}
                                <div className='text-black'>
                                    <p className='text-lg uppercase font-extrabold'>{engine.name}</p>
                                    <p className='text-sm'>€{engine.extra_price}</p>
                                </div>
                            </Button>
                        ))}
                    </div>
                </StepperContent>
                <StepperContent className="w-full flex flex-col gap-5 items-center justify-center" key={3} value={3}>
                    {/* FORM OPTIONALS */}
                    {model.optionals?.map((optional) => {

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
                                    {optional.name}
                                </span>
                            </div>
                        );
                    })}
                    <Button
                        type="button"
                        onClick={handleOptionalSubmit}
                        className='uppercase rounded-full border-white text-white bg-red-700 hover:bg-white hover:border-red-700 hover:text-red-700 mt-4'
                    >
                        Conferma Optional
                    </Button>
                </StepperContent>
                <StepperContent className="w-full flex flex-col gap-5 items-center justify-center" key={4} value={4}>
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
                            <span className='text-white'>
                                {accessory.name}
                            </span>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={handleAccessorySubmit}
                        className='uppercase rounded-full border-white text-white bg-red-700 hover:bg-white hover:border-red-700 hover:text-red-700 mt-4'
                    >
                        Conferma Accessori
                    </Button>
                </StepperContent>
            </StepperPanel>

            <div className="flex items-center justify-between gap-2.5">
                <Button variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 1}
                    className='uppercase bg-white border-1 border-black rounded-full'
                >
                    <ChevronLeft /> Precedente
                </Button>
                {currentStep === 4 ?
                    <DialogConfiguration />
                    : <Button
                        variant="outline"
                        onClick={() => setCurrentStep(currentStep + 1)}
                        disabled={currentStep === steps.length}
                        className='uppercase bg-white border-1 border-black rounded-full'
                    >
                        Successivo <ChevronRight />
                    </Button>
                }
            </div>
        </Stepper>
    );
}
