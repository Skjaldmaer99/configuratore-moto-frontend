import { ModelService } from "@/features/models/model.service";
import { type Model } from "@/features/models/model.types";
import { Button } from "@base-ui/react/button";
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react";
import { Link } from "react-router";

const VehiclesPage = () => {

    const { data } = useQuery<Model[]>({
        queryFn: ModelService.list,
        queryKey: ['models']
    });

    console.log(data)

    return (
        <div className="mt-20 max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
                <Button className={'bg-secondary text-primary border border-primary py-1 px-3 min-w-[150px] rounded-full cursor-pointer active:bg-primary active:text-secondary'}>ALL</Button>
                <Button className={'bg-secondary text-primary border border-primary py-1 px-3 min-w-[150px] rounded-full cursor-pointer active:bg-primary active:text-secondary'}>DUCATI</Button>
                <Button className={'bg-secondary text-primary border border-primary py-1 px-3 min-w-[150px] rounded-full cursor-pointer active:bg-primary active:text-secondary'}>HONDA</Button>
                <Button className={'bg-secondary text-primary border border-primary py-1 px-3 min-w-[150px] rounded-full cursor-pointer active:bg-primary active:text-secondary'}>YAMAHA</Button>
                <Button className={'bg-secondary text-primary border border-primary py-1 px-3 min-w-[150px] rounded-full cursor-pointer active:bg-primary active:text-secondary'}>APRILIA</Button>
                <Button className={'bg-secondary text-primary border border-primary py-1 px-3 min-w-[150px] rounded-full cursor-pointer active:bg-primary active:text-secondary'}>KTM</Button>
                <Button className={'bg-secondary text-primary border border-primary py-1 px-3 min-w-[150px] rounded-full cursor-pointer active:bg-primary active:text-secondary'}>KAWASAKI</Button>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 p-3 mt-10 mx-auto">
                {data?.map((model) => {
                    return <Link to={`/models/${model.id}`}>
                        <div className="w-full relative" key={model.name}>
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
