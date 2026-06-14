import { CheckCircleIcon } from "lucide-react"

const VerifyEmailPage = () => {
    return (
        <div className="mx-auto h-full min-h-screen py-20 bg-gray-100">
            <CheckCircleIcon className="mx-auto" />
            <p className="text-center px-3 pt-3">Ti abbiamo inviato una mail per la verifica, controlla la tua casella di posta</p>
        </div>
    )
}

export default VerifyEmailPage
