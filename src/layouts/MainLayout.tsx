import FilterSearch from '@/components/FilterSearch'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { AuthService } from '@/features/auth/auth.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, Outlet, useLocation, useNavigate } from 'react-router'
import { toast, Toaster } from 'sonner'

const MainLayout = () => {
    const location = useLocation();
    const isConfiguration = location.pathname.startsWith("/le-mie-configurazioni");
    const isDashboard = location.pathname.startsWith("/dashboard");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryFn: AuthService.user,
        queryKey: ['user']
    })
    console.log(user)

    const body = document.querySelector('body');
    if (isConfiguration || isDashboard) {
        body?.classList.add('bg');
    } else {
        body?.classList.remove('bg');
    }

    const mutation = useMutation({
        mutationFn: AuthService.logout,
        mutationKey: ['user'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });

            navigate('/login')
        },
        onError: () => {
            queryClient.setQueryData(['user'], null);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            toast.error('Errore durante il logout')
        }
    })

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
                    ) : <Button onClick={() => mutation.mutate()} className='bg-white border-none text-black my-auto'>Esci</Button>}
                </nav>
            </header>

            <Outlet />
            <Toaster />
        </div>
    )
}

export default MainLayout
