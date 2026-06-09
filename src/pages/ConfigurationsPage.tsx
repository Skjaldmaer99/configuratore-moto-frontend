import type { User } from "@/features/users/user.type";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";

const ConfigurationsPage = () => {
    // map delle configurazioni con mio user_id
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<User>(['user']);

    if (!user) {
        return <div>Loading...</div>
    }

    console.log(user.configurations)
    return (
        <div className="mt-20 max-w-7xl mx-auto p-4 flex flex-col gap-3">
            {
                user?.configurations?.map((configuration) => {
                    const color = configuration.color.hex_code;
                    return (
                        <div className="p-3 border-1 border-primary rounded-full flex justify-between">
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
                            </div>
                            <div className="border-1 border-black/60 rounded-full p-0.5 px-2 my-auto">{configuration.status}</div>
                            <Link to={`/configurations/${configuration.id}`}
                                className="my-auto bg-red-700 hover:bg-red-900 text-white rounded-full p-1 px-2"
                            >View</Link> {/* recupero l'id della configurazione */}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ConfigurationsPage
