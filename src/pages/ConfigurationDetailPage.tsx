import Menu from "@/components/Menu"
import { ConfigurationService } from "@/features/configurations/configuration.service"
import ConfigurationForm from "@/features/configurations/ConfigurationForm"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"
import { Link, useParams } from "react-router"

const ConfigurationDetailPage = () => {
    const { id } = useParams();

    const { data: configuration, isLoading } = useQuery({
        queryKey: ["configuration", id],
        queryFn: () =>
            ConfigurationService.show(Number(id)),
    });

    if (isLoading) {
        return <div>Caricamento...</div>;
    }

    console.log(configuration)

    return (
        <div className="max-h-screen mt-10">
            <div>
                <Link to={'/'} className="uppercase font-bold flex gap-1">
                    <ChevronLeft /> Torna indietro
                </Link>
            </div>
            <div className="w-full lg:flex gap-8 mt-10">
                <div className="w-full lg:w-1/2 my-auto">
                    <Menu />
                </div>
                <div className="w-full lg:w-1/2">
                    <img src={configuration?.color.image} className="w-full" />
                </div>
            </div>
            <div className="bg-black/90 p-5 lg:px-10 pt-0">
                <ConfigurationForm model={configuration.model!} />
            </div>
        </div>
    )
}

export default ConfigurationDetailPage
