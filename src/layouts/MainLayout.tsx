import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { AuthService } from '@/features/auth/auth.service'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { Link, Outlet } from 'react-router'

const MainLayout = () => {

    const { data: user } = useQuery({
        queryFn: AuthService.user,
        queryKey: ['user']
    })
    console.log(user)

    return (
        <div>
            <header className='p-3 flex justify-between'>
                <Link to={'/'} className='w-10 rounded-full border border-primary'>
                    <img src="logo.png" alt="logo" className='w-full rounded-full' />
                </Link>
                <nav className='flex gap-4'>
                    {user?.role === "admin"
                        ? <Link to={'/crea-catalogo'} className='bg-primary text-secondary border border-primary py-1 px-3 text-nowrap rounded-full cursor-pointer font-light text-sm my-auto'>Crea catalogo</Link>
                        : user?.role === "customer"
                            ? <Link to={'/le-mie-configurazioni'} className='bg-primary text-secondary border border-primary py-1 px-3 text-nowrap rounded-full cursor-pointer font-light text-sm my-auto'>Le mie configurazioni</Link>
                            /* poi rendi quest'ultimo "" */
                            : <Link to={'/crea-catalogo'} className='bg-primary text-secondary border border-primary py-1 px-3 text-nowrap rounded-full cursor-pointer font-light text-sm my-auto'>MOo</Link>
                    }
                    <Field orientation="horizontal">
                        <Input
                            type="search"
                            placeholder={`Cerca la moto dei tuoi sogni...`}
                            className='border-primary font-light placeholder:font-light rounded-full min-w-70'
                        />
                        <Button className='font-light'>
                            <Search />
                        </Button>
                    </Field>
                    {!user ? (
                        <>
                            <Link to={'/login'} className='my-auto'>Accedi</Link>
                            <Link to={'/register'} className='bg-black p-1 px-3 rounded-full text-white text-light text-sm my-auto'>Registrati</Link>
                        </>
                    ) : <Link to={'/login'} className='my-auto'>Esci</Link>}
                </nav>
            </header>

            <Outlet />
        </div>
    )
}

export default MainLayout
