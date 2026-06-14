import { CheckCircleIcon } from 'lucide-react'
import { Link } from 'react-router'

const SuccessPasswordPage = () => {
    return (
        <div className="mx-auto h-full min-h-screen max-w-md py-20 bg-gray-100">
            <CheckCircleIcon className="mx-auto" />
            <p className="text-center px-3 pt-3">Password modificata correttamente!</p>

            <div className='text-center mt-10'>
                <Link to={'/'} className='text-sm'>Torna alla Home</Link>
            </div>
        </div>
    )
}

export default SuccessPasswordPage
