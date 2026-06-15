import DialogConfiguration from "@/components/DialogConfiguration";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/features/auth/auth.service";
import { ConfigurationService } from "@/features/configurations/configuration.service";
import type { User } from "@/features/users/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

const ConfigurationsPage = () => {
    // map delle configurazioni con mio user_id
    const queryClient = useQueryClient();
    /* const user = queryClient.getQueryData<User>(['user']); */
    const { data: user } = useQuery<User>({
        queryFn: AuthService.user,
        queryKey: ['user'],
    })

    const mutation = useMutation({
        mutationFn: (id: number) => ConfigurationService.delete(id),
        mutationKey: ['delete-configuration'],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            queryClient.invalidateQueries({
                queryKey: ['configurations']
            })
            toast.success("Configurazione eliminata con successo");
        },
        onError: () => {
            toast.error("Errore nell'eliminazione della configurazione");
        }
    })

    if (!user) {
        return <div>Loading...</div>
    }

    const onSubmit = (id: number) => {
        mutation.mutate(id)
    }

    console.log(user.configurations)
    return (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto p-4"> {/* flex flex-col  */}
            {
                user?.configurations?.map((configuration) => {
                    const color = configuration.color.hex_code;
                    return (
                        <Link to={`/configurations/${configuration.id}`} className="relative">
                            <div key={configuration.id} className="h-full p-3 rounded-4xl flex flex-col gap-3 justify-between bg-white shadow-2xl">
                                <div className="w-full">
                                    <img
                                        src={configuration.color ? configuration.color?.image : '/image-non-disp.png'}
                                        alt={configuration.model.name}
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex gap-3 justify-between pt-5">
                                        <div className="flex gap-3">
                                            <p className="my-auto font-extrabold">{configuration.model.name} {configuration.engine ? configuration.engine.displacement_cc : "-"}</p>
                                            {configuration.color.hex_code &&
                                                <p className={`w-7 h-7 rounded-full my-auto`}
                                                    style={{ backgroundColor: color }}
                                                >
                                                </p>
                                            }
                                            <p className="my-auto">€ {configuration.total_price}</p>
                                        </div>
                                        <div className="border border-black/60 rounded-full p-0.5 px-2 my-auto">{configuration.status}</div>
                                    </div>
                                    <div className="flex gap-3 absolute top-5 right-5">
                                        {configuration.status === "completed" && <DialogConfiguration configurationId={configuration.id!} />}
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                onSubmit(configuration.id!);
                                            }}
                                            className="border border-black p-2 bg-white my-auto"
                                            size={'icon'}>
                                            <Trash className="text-black" />
                                        </Button>
                                        {/* <Link to={`/configurations/${configuration.id}`}
                                            className="my-auto text-black hover:underline rounded-full p-1 px-2"
                                        >View</Link> */}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div >
    )
}

export default ConfigurationsPage

/* 
<div key={configuration.id} className="p-3 border border-primary rounded-full flex justify-between">
                            <div className="flex gap-3">
                                <div className="h-12">
                                    <img
                                        src={configuration.color ? configuration.color?.image : '/image-non-disp.png'}
                                        alt={configuration.model.name}
                                        className="w-full h-full"
                                    />
                                </div>
                                <p className="my-auto">{configuration.model.name} {configuration.engine ? configuration.engine.displacement_cc : "-"}</p>
                                {configuration.color.hex_code &&
                                    <p className={`w-7 h-7 rounded-full my-auto`}
                                        style={{ backgroundColor: color }}
                                    >
                                    </p>
                                }
                                <p className="my-auto">€ {configuration.total_price}</p>
                            </div>
                            <div className="border border-black/60 rounded-full p-0.5 px-2 my-auto">{configuration.status}</div>
                            <div className="flex gap-3">
                                {configuration.status === "completed" && <DialogConfiguration configurationId={configuration.id!} />}
                                <Button
                                    onClick={() => onSubmit(configuration.id!)}
                                    className="border border-black p-2 bg-white my-auto"
                                    size={'icon'}>
                                    <Trash className="text-black" />
                                </Button>
                                <Link to={`/configurations/${configuration.id}`}
                                    className="my-auto text-black hover:underline rounded-full p-1 px-2"
                                >View</Link>
                            </div>
                        </div>
                         */
