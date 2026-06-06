import Menu from "@/components/Menu"
import ConfigurationForm from "@/features/configurations/ConfigurationForm"
import { ModelService } from "@/features/models/model.service"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"
import { Link, useParams } from "react-router"

const VehicleDetailPage = () => {
    const { id } = useParams();

    const { data: model, isLoading } = useQuery({
        queryKey: ['model', id],
        queryFn: () => ModelService.find(id!),
    })

    if (isLoading) {
        return <div>Caricamento...</div>;
    }

    console.log(model)

    return (
        <div className="max-h-screen mt-10">
            <div>
                <Link to={'/'} className="uppercase font-bold flex gap-1">
                    <ChevronLeft /> Torna indietro
                </Link>
            </div>
            <div className="w-full flex gap-8 mt-10">
                <div className="w-1/2 my-auto">
                    <Menu />
                </div>
                <div className="w-1/2">
                    <img src={model?.colors[0].image} className="w-full" />
                </div>
            </div>
            <div className="bg-black/90">
                <ConfigurationForm model={model!} />
            </div>
        </div>
    )
}

export default VehicleDetailPage
