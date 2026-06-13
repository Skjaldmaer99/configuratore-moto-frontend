import LoginForm from "@/features/auth/LoginForm"

const LoginPage = () => {
    return (
        <div className='h-screen w-full flex flex-col justify-center bg'>
            <div className=' mx-auto border-2 border-red-700 rounded-4xl max-w-md p-4 py-6 md:p-6 md:py-8 bg-white'>
                <h1 className="text-2xl font-bold">Login page</h1>
                <p className="mt-2">This is the main content area of the page.</p>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage
