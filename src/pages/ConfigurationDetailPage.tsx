import Menu from "@/components/Menu"
import { Button } from "@/components/ui/button"
import { ConfigurationService } from "@/features/configurations/configuration.service"
import ConfigurationForm from "@/features/configurations/ConfigurationForm"
import { ModelService } from "@/features/models/model.service"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router"

const ConfigurationDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: configuration, isLoading } = useQuery({
        queryKey: ["configurations", id],
        queryFn: () =>
            ConfigurationService.show(Number(id)),
    });
    const { data: model } = useQuery({ // se nella config non è ancora stato impostato il colore (e quindi l'img corrispondente, prendo il modello per recuperare i colori e quindi le immagini collegate)
        queryKey: ["models", id],
        queryFn: () => ModelService.find(configuration.model_id),
    });

    if (isLoading) {
        return <div>Caricamento...</div>;
    }

    console.log(configuration)

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
                    <img src={configuration?.color?.image || model?.colors[0].image} className="w-full" />
                </div>
            </div>
            <div className="bg-black/90 p-5 lg:px-10 pt-0">
                <ConfigurationForm model={configuration.model!} />
            </div>
        </div>
    )
}

export default ConfigurationDetailPage
