import { CheckCircleIcon } from 'lucide-react'

const RedirectPasswordPage = () => {
    return (
        <div className="mx-auto h-full min-h-screen py-20 bg-gray-100">
            <CheckCircleIcon className="mx-auto" />
            <p className="text-center px-3 pt-3">Ti abbiamo inviato una mail per procedere con il reset della password, controlla la tua casella di posta</p>
        </div>
    )
}

export default RedirectPasswordPage
