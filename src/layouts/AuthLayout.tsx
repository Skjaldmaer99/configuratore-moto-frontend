import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

const AuthLayout = () => {
    const body = document.querySelector('body');
    body?.classList.remove('bg');

    return (
        <div>
            <Outlet />
            <Toaster />
        </div>
    )
}

export default AuthLayout
