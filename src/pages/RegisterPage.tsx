import RegisterForm from "@/features/auth/RegisterForm"

const RegisterPage = () => {
    return (
        <div className='h-screen w-full flex flex-col justify-center'>
            <div className='mx-auto border-2 border-red-700 rounded-3xl max-w-md p-4 py-6 md:p-6 md:py-8'>
                <h1 className="text-2xl font-bold">Register page</h1>
                <p className="mt-2">This is the main content area of the page.</p>
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage
