import { ModelService } from "@/features/models/model.service";
import { useSearchStore } from "@/hooks/use-searchstore";
import { Button } from "@base-ui/react/button";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const VehiclesPage = () => {
    const debouncedSearch = useSearchStore((state) => state.debouncedSearch);
    const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
    const searchTerm = useSearchStore((state) => state.searchTerm);

    const brands = ["all", "yamaha", "honda", "ktm", "kawasaki", "aprilia", "ducati"];

    const { data: models, isLoading } = useQuery({
        queryFn: () => ModelService.list(debouncedSearch),
        queryKey: ['models', debouncedSearch]
    })

    const handleBrand = (brand: string) => {
        if (brand === "all") {
            setSearchTerm('');
        } else {
            setSearchTerm(brand);
        }
    }

    if (isLoading) return <p>Caricamento modelli...</p>;

    return (
        <div className="mt-20 max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
                {brands.map((brand) => {
                    // Determina se il pulsante corrente è quello selezionato
                    const isSelected = (brand === 'all' && searchTerm === '') || searchTerm.toLowerCase() === brand;

                    return (
                        <Button
                            key={brand}
                            onClick={() => handleBrand(brand)}
                            className={`py-1 px-3 min-w-[150px] rounded-full cursor-pointer transition-colors border border-primary ${isSelected
                                ? 'bg-red-700 text-secondary' // Stile quando è attivo/selezionato
                                : 'bg-gray-200 text-black hover:text-white hover:bg-red-700' // Stile di default
                                }`}
                        >
                            {brand}
                        </Button>
                    );
                })}
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 p-3 mt-10 mx-auto">
                {models?.map((model) => {
                    return <Link to={`/models/${model.id}`}>
                        <div className="w-full relative mt-auto bottom-0" key={model.id}>
                            <img
                                src={model.colors ? model.colors[0]?.image : '/image-non-disp.png'}
                                alt={model.name}
                                className="w-full h-full"
                            />
                            <Button className="w-10 h-10 rounded-full bg-red-700 absolute bottom-3 right-3 p-2">
                                <Plus className="text-white" />
                            </Button>
                        </div>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default VehiclesPage
