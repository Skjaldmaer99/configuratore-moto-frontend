import DialogConfiguration from '@/components/DialogConfiguration';
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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router';
import { toast } from 'sonner';
import z from "zod";
import { AuthService } from '../auth/auth.service';
import type { Color } from '../colors/color.type';
import type { EngineVariant } from '../engineVariants/engineVariant.type';
import type { Model } from '../models/model.types';
import { type User } from '../users/user.type';
import { ConfigurationService } from './configuration.service';
import type { Configuration, UpdateConfigurationPayload } from './configuration.type';
import { useEffect } from 'react';
import { useConfigurationStore } from './configuration.store';

const steps = [1, 2, 3, 4, 5];
type ConfigurationFormValues = z.input<typeof configurationFormSchema>;

export default function ConfigurationForm({ model }: { model: Model }) {
    const location = useLocation();
    const { id } = useParams();
    const isEdit = location.pathname.startsWith("/configurations");

    const {
        configurationId,
        currentStep = isEdit ? 2 : 1,
        setConfigurationId,
        setCurrentStep,
        reset,
    } = useConfigurationStore();

    useEffect(() => {
        reset();
    }, [reset]);

    const queryClient = useQueryClient();

    const { data: user } = useQuery<User>({
        queryFn: AuthService.user,
        queryKey: ['user']
    });

    const configId = isEdit
        ? Number(id)
        : configurationId;

    const { data: configuration } = useQuery<Configuration>({
        queryFn: () => ConfigurationService.show(configId!),
        queryKey: ['configurations', configId],
        enabled: !!configId,
    });

    useEffect(() => {
        if (isEdit) {
            setCurrentStep(configuration?.current_step ? configuration?.current_step : 2)
        } else setCurrentStep(1)
    }, [isEdit, !isEdit])

    const form = useForm<ConfigurationFormValues>({
        resolver: zodResolver(configurationFormSchema),
        defaultValues: {
            user_id: user?.id ?? 0,
            model_id: model.id,
            color_id: null,
            engine_variant_id: null,
            optional_ids: [],
            accessory_ids: [],
            status: "draft",
            current_step: 2,
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
            queryClient.invalidateQueries({
                queryKey: ['configurations', configId],
            })
            setConfigurationId(
                response.data.id
            );
            setCurrentStep(currentStep + 1);
        },
        onError: () => {
            toast.error("Errore nell'inizio della configurazione")
        }
    });

    const updateConfigurationMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<UpdateConfigurationPayload> }) =>
            ConfigurationService.update(id, data as UpdateConfigurationPayload),
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
            setCurrentStep(currentStep === 5 ? currentStep : currentStep + 1);
        },
        onError: () => {
            toast.error("Optionals non compatibili")
        }
    });

    const handleConfigurationSubmit = () => {
        createConfigurationMutation.mutate({
            user_id: user!.id,
            model_id: model.id,
            color_id: null,
            engine_variant_id: null,
            optional_ids: [],
            accessory_ids: [],
            status: "draft",
            current_step: 2,
        });
    };

    const handleColorSubmit = (color: Color) => {
        form.setValue("color_id", color.id);
        updateConfigurationMutation.mutate({
            id: !isEdit ? configurationId! : Number(id),
            data: {
                color_id: color.id,
                current_step: 2,
                status: `${(configuration?.model_id && configuration?.engine_variant_id) ? "completed" : "draft"}`,
            },
        });
    };

    const handleEngineSubmit = (engine: EngineVariant) => {
        form.setValue("engine_variant_id", engine.id);
        updateConfigurationMutation.mutate({
            id: !isEdit ? configurationId! : Number(id),
            data: {
                engine_variant_id: engine.id,
                current_step: 3,
                status: `${(configuration?.model_id && configuration?.color_id) ? "completed" : "draft"}`,
            },
        });
    };

    const toggleOptional = (
        optionalId: number
    ) => {
        const current =
            form.getValues("optional_ids") || [];

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
            form.getValues("accessory_ids") || [];

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
                current_step: 4,
            },
        });
    };

    const handleAccessorySubmit = () => {
        updateConfigurationMutation.mutate({
            id: !isEdit ? configurationId! : Number(id),
            data: {
                accessory_ids:
                    form.watch("accessory_ids"),
                current_step: 5,
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
                <div className='pb-5 md: pb-0 md:flex justify-between'>
                    {currentStep == 2
                        ? <p className='uppercase font-extrabold text-white text-2xl mb-10'>Seleziona il colore</p>
                        : currentStep == 3
                            ? <p className='uppercase font-extrabold text-white text-2xl mb-10'>Seleziona la cilindrata</p>
                            : currentStep == 4
                                ? <p className='uppercase font-extrabold text-white text-2xl mb-10'>Seleziona gli optionals</p>
                                : currentStep == 5
                                    ? <p className='uppercase font-extrabold text-white text-2xl mb-10'>Seleziona gli accessori</p>
                                    : ""
                    }
                    <p className='text-white'>Prezzo: <span className='font-bold text-lg'>{(configuration && configuration.total_price !== 0.00) ? configuration.total_price : model.base_price}</span></p>
                </div>
                <StepperContent value={1}>
                    <Button
                        type="button"
                        className='flex p-3 pe-5 border-1 border-black text-black uppercase font-bold rounded-full bg-white hover:bg-white/40 mx-auto h-15 mt-5'
                        onClick={() =>
                            handleConfigurationSubmit()
                        }
                    >
                        Inizia configurazione
                    </Button>
                </StepperContent>
                <StepperContent value={2}>
                    <div className="flex flex-col md:flex-row gap-7 max-w-3xl justify-center mx-auto">
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
                <StepperContent value={3}>
                    <div className="flex flex-col md:flex-row gap-7 max-w-3xl justify-center mx-auto">
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
                <StepperContent className="max-w-[350px] flex flex-col gap-5 items-left justify-center mx-auto" key={4} value={4}>
                    {/* FORM OPTIONALS */}
                    {model.optionals?.map((optional) => {
                        return (
                            <div
                                key={optional.pivot.optional_id}
                                className="flex items-center gap-2"
                            >
                                <Checkbox
                                    checked={(form.watch("optional_ids") ?? [])
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
                    {configId &&
                        <>
                            <p className='font-bold text-white pt-5'>Optionals selezionati: </p>
                            <p className=''>{configuration?.optionals.map((optional) => (
                                <span className='pe-2 text-white'>{optional.name},</span>
                            ))}</p>
                        </>
                    }
                </StepperContent>
                <StepperContent className="max-w-[350px] flex flex-col gap-5 items-left justify-center mx-auto" key={5} value={5}>
                    {/* FORM ACCESSORI */}
                    {model.accessories?.map((accessory) => (
                        <div
                            key={accessory.pivot.accessory_id}
                            className="flex items-center gap-2"
                        >
                            <Checkbox
                                checked={(form.watch("accessory_ids") ?? [])
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
                    {configId &&
                        <>
                            <p className='font-bold text-white pt-5'>Accessori selezionati: </p>
                            <p className=''>{configuration?.accessories.map((accessory) => (
                                <span className='pe-2 text-white'>{accessory.name},</span>
                            ))}</p>
                        </>
                    }
                </StepperContent>
            </StepperPanel>

            <div className="flex items-center justify-between gap-2.5">
                <Button variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 1 || (isEdit && currentStep === 2)}
                    className='uppercase bg-white border-1 border-black rounded-full'
                >
                    <ChevronLeft /> Precedente
                </Button>
                {currentStep === 5 ?
                    /* se non ho color_id model_id e engine_variant_id non posso premere su fine */
                    <DialogConfiguration
                        configurationId={configuration!.id!}
                    />
                    : <Button
                        variant="outline"
                        onClick={() => setCurrentStep(currentStep === 5 ? currentStep : currentStep + 1)}
                        disabled={currentStep === steps.length || currentStep === 1}
                        className='uppercase bg-white border-1 border-black rounded-full'
                    >
                        Successivo <ChevronRight />
                    </Button>
                }
            </div>
        </Stepper >
    );
}
