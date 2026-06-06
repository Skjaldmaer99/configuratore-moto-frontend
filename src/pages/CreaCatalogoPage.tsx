import { CatalogForm } from '@/features/full-create/CatalogForm'

const CreaCatalogoPage = () => {
    return (
        <div className='min-h-screen w-full flex flex-col justify-center'>
            <div className='w-full max-w-lg mx-auto border-2 border-red-700 rounded-3xl p-4 py-6 md:p-6 md:py-8'>
                <h1 className="text-2xl font-bold">Creazione Moto</h1>
                <p className="mt-2 mb-10">Crea una moto da aggiungere al catalogo.</p>
                <CatalogForm />
            </div>
        </div>
    )
}

export default CreaCatalogoPage
