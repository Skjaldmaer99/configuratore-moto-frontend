import { CheckCircleIcon } from 'lucide-react'
import { Link } from 'react-router'

const SuccessPasswordPage = () => {
    return (
        <div className="h-screen w-full flex flex-col justify-center">
            <CheckCircleIcon className="mx-auto" />
            <p className="text-center px-3 pt-3">Password modificata correttamente!</p>

            <div className='text-center mt-10'>
                <Link to={'/'} className='text-sm'>Torna alla Home</Link>
            </div>
        </div>
    )
}

export default SuccessPasswordPage
