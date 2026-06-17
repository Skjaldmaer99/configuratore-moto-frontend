import Menu from "@/components/Menu"
import { Button } from "@/components/ui/button"
import { ConfigurationService } from "@/features/configurations/configuration.service"
import { useConfigurationStore } from "@/features/configurations/configuration.store"
import ConfigurationForm from "@/features/configurations/ConfigurationForm"
import { ModelService } from "@/features/models/model.service"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router"

const VehicleDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { configurationId } = useConfigurationStore();
    const { data: configuration } = useQuery({
        queryKey: ["configurations", configurationId],
        queryFn: () =>
            ConfigurationService.show(Number(configurationId)),
    });

    const { data: model, isLoading } = useQuery({
        queryKey: ['models', id],
        queryFn: () => ModelService.find(id!),
    })

    if (isLoading) {
        return <div>Caricamento...</div>;
    }

    console.log(model)

    return (
        <div className="max-h-screen mt-10">
            <div>
                <Button
                    onClick={() => navigate(-1)}
                    className="uppercase font-bold text-black flex gap-1 bg-transparent border-none cursor-pointer"
                >
                    <ChevronLeft /> Torna indietro
                </Button>
            </div>
            <div className="w-full lg:flex gap-8 mt-10">
                <div className="w-full lg:w-1/2 my-auto">
                    <Menu />
                </div>
                <div className="w-full lg:w-1/2">
                    <img src={configuration ? configuration?.color?.image : model?.colors[0].image} className="w-full" />
                </div>
            </div>
            <div className="bg-black/90 p-5 lg:px-10 pt-0">
                <ConfigurationForm model={model!} />
            </div>
        </div>
    )
}

export default VehicleDetailPage
