import RecuperoPasswordForm from "@/features/auth/RecuperoPasswordForm"

const RecuperoPasswordPage = () => {
    return (
        <div className='h-screen w-full flex flex-col justify-center bg'>
            <div className=' mx-auto border-2 border-red-700 rounded-4xl max-w-md p-4 py-6 md:p-6 md:py-8 bg-white'>
                <h1 className="text-2xl font-bold">Recupero Password</h1>
                <p className="mt-2">Inserisci l'indirizzo email, ti invieremo una mail con il link di recupero</p>
                <RecuperoPasswordForm />
            </div>
        </div>
    )
}

export default RecuperoPasswordPage
