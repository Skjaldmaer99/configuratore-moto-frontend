import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <div>
            <header>Navbar</header>

            <Outlet />
        </div>
    )
}

export default MainLayout
