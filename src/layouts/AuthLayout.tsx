import { Outlet } from 'react-router';

const AuthLayout = () => {
    const body = document.querySelector('body');
    body?.classList.remove('bg');

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthLayout
