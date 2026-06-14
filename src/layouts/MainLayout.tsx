import FilterSearch from '@/components/FilterSearch'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { AuthService } from '@/features/auth/auth.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, Outlet, useLocation, useNavigate } from 'react-router'

const MainLayout = () => {
    const location = useLocation();
    const isConfiguration = location.pathname.startsWith("/le-mie-configurazioni");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryFn: AuthService.user,
        queryKey: ['user']
    })
    console.log(user)

    const body = document.querySelector('body');
    if (isConfiguration) {
        body?.classList.add('bg');
    } else {
        body?.classList.remove('bg');
    }

    const handleLogout = () => {
        localStorage.getItem('authToken')
        localStorage.getItem('user')

        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        queryClient.invalidateQueries({
            queryKey: ['user']
        })
        navigate('/login');
    }

    return (
        <div>
            <header className='w-full p-3 flex justify-between absolute top-0'>
                <Link to={user?.role === "admin" ? "/dashboard" : "/"} className='w-10 rounded-full border border-primary'>
                    <img src="logo.png" alt="logo" className='w-full rounded-full' />
                </Link>
                <nav className='flex gap-4 bg-transparent'>
                    {user?.role === "admin"
                        ? (
                            <>
                                <Link to={'/crea-catalogo'} className='bg-primary text-secondary border border-primary py-1.5 px-3 text-nowrap rounded-full cursor-pointer font-light text-sm my-auto'>Crea catalogo</Link>
                            </>
                        )
                        : user?.role === "customer"
                            ? (
                                !isConfiguration && <Link to={'/le-mie-configurazioni'} className='bg-primary text-secondary border border-primary py-1.5 px-3 text-nowrap rounded-full cursor-pointer font-light text-sm my-auto'>Configurazioni</Link>
                            )
                            : ""
                    }
                    {!user || user?.role === "customer" && <Field orientation="horizontal">
                        <FilterSearch />
                    </Field>}
                    {!user ? (
                        <>
                            <Link to={'/login'} className='my-auto'>Accedi</Link>
                            <Link to={'/register'} className='bg-black py-1.5 px-3 rounded-full text-white text-light text-sm my-auto'>Registrati</Link>
                        </>
                    ) : <Button onClick={() => handleLogout()} className='bg-white border-none text-black my-auto'>Esci</Button>}
                </nav>
            </header>

            <Outlet />
        </div>
    )
}

export default MainLayout
