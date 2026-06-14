import ResetPasswordForm from '@/features/auth/ResetPasswordForm'

const ResetPasswordPage = () => {
    return (
        <div className='h-screen w-full flex flex-col justify-center bg'>
            <div className='mx-auto border-2 border-red-700 rounded-4xl min-w-sm max-w-md p-4 py-6 md:p-6 md:py-8 bg-white'>
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="mt-2">Reimposta la password</p>
                <ResetPasswordForm />
            </div>
        </div>
    )
}

export default ResetPasswordPage
