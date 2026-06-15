import { AccessoryService } from "@/features/accessories/accessory.service"
import type { Accessory } from "@/features/accessories/accessory.type"
import { AccessoryCreationForm } from "@/features/accessories/AccessoryCreationForm"
import { ModelService } from "@/features/models/model.service"
import type { Model } from "@/features/models/model.types"
import type { OptionalIncompatibility } from "@/features/optionalIncompatibilities/optionalIncompatibilities.type"
import { OptionalIncompatibilitiesForm } from "@/features/optionalIncompatibilities/OptionalIncompatibilitiesForm"
import { OptionalIncompatibilityService } from "@/features/optionalIncompatibilities/optionalIncompatibility.service"
import { OptionalService } from "@/features/optionals/optional.service"
import type { Optional } from "@/features/optionals/optional.type"
import { OptionalCreationForm } from "@/features/optionals/OptionalCreationForm"
import { UserService } from "@/features/users/user.service"
import type { User } from "@/features/users/user.type"
import { useSearchStore } from "@/hooks/use-searchstore"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"

const DashboardPage = () => {
    const debouncedSearch = useSearchStore((state) => state.debouncedSearch);

    const { data: incompatibilities } = useQuery({
        queryFn: OptionalIncompatibilityService.list,
        queryKey: ['optional-incompatibilities']
    })

    const { data: models, isLoading } = useQuery({
        queryFn: () => ModelService.list(debouncedSearch),
        queryKey: ['models', debouncedSearch]
    })

    const { data: users } = useQuery({
        queryFn: UserService.list,
        queryKey: ['users']
    })

    const { data: optionals } = useQuery({
        queryFn: OptionalService.list,
        queryKey: ['optionals']
    })

    const { data: accessories } = useQuery({
        queryFn: AccessoryService.list,
        queryKey: ['accessories']
    })

    if (isLoading) return <p>Caricamento modelli...</p>;

    return (
        <div className="w-full min-h-screen mt-20 p-5">
            <p className="uppercase font-extrabold text-2xl text-center pb-3">Dashboard</p>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:flex-row gap-5">
                {/* bottone crea catalogo */}
                {/* lista moto */}
                <div className="w-full p-5 rounded-4xl border border-black bg-white">
                    <p className="font-extrabold text-lg pb-3">Lista delle moto</p>
                    <Link to={'/crea-catalogo'} className='bg-primary text-secondary border border-primary py-1.5 px-3 text-nowrap rounded-full cursor-pointer font-light text-sm mb-3'>Crea catalogo</Link>
                    {models?.map((model: Model) => (
                        <div key={model.id} className="flex gap-3 py-3 border-b-1 border-black">
                            <div className="w-20">
                                <img
                                    src={model.colors[0].image}
                                    alt="model image"
                                    className="w-full h-full"
                                />
                            </div>
                            <p className="my-auto">{model.brand} {model.name}  |  € {model.base_price}  |  {model.category}</p>
                        </div>
                    ))
                    }
                </div>

                {/* bottone imposta incompatibilità */}
                {/* sezione delle incompatibilità */}
                <div className="w-full p-5 rounded-4xl border border-black bg-white">
                    <p className="font-extrabold text-lg pb-3">Optional Incompatibili</p>
                    <OptionalIncompatibilitiesForm />
                    <div className="flex pt-3">
                        <div className="w-1/2">
                            <p className="font-medium text-lg pb-1 pe-10">Primo Optional</p>
                            {incompatibilities?.map((optional: OptionalIncompatibility) => (
                                <p key={optional.id} className="py-3 border-b border-black pe-10">
                                    {optional.optional1.name}
                                </p>
                            ))}
                        </div>
                        <div className="w-1/2">
                            <p className="font-medium text-lg pb-1">Secondo Optional</p>
                            {incompatibilities?.map((optional: OptionalIncompatibility) => (
                                <p key={optional.id} className="py-3 border-b border-black">
                                    {optional.optional1.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* sezione utenti registrati */}
                {/* sezione aggiungi nuovo utente */}
                <div className="w-full p-5 rounded-3xl border border-black bg-white">
                    <p className="font-extrabold text-lg pb-3">Utenti Registrati</p>
                    {users?.map((user: User) => (
                        <p key={user.id} className="py-3 border-b-1 border-black">
                            {user.name}  |  {user.email}  |  {user.role}
                        </p>
                    ))}
                </div>

                {/* sezione optionals */}
                <div className="w-full p-5 rounded-3xl border border-black bg-white">
                    <p className="font-extrabold text-lg pb-3">Optionals</p>
                    <OptionalCreationForm />
                    {optionals?.map((optional: Optional) => (
                        <p className="py-3 border-b border-black" key={optional.id}>
                            {optional.name}
                        </p>
                    ))}
                </div>

                {/* sezione accessori */}
                <div className="w-full p-5 rounded-3xl border border-black bg-white">
                    <p className="font-extrabold text-lg pb-3">Accessori</p>
                    <AccessoryCreationForm />
                    {accessories?.map((accessory: Accessory) => (
                        <p className="py-3 border-b border-black" key={accessory.id}>
                            {accessory.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
