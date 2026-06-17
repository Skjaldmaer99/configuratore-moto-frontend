import { AuthService } from '@/features/auth/auth.service';
import { useQuery } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';



interface ProtectedRouteProps extends PropsWithChildren {
    allowedRoles: string[]
    /* children: React.ReactNode */
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { data: user, isLoading, isError } = useQuery({
        queryFn: AuthService.user,
        queryKey: ['user']
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError || !user) {
        return <Navigate to="/login" replace />
    }

    if (!allowedRoles.includes(user.role)) {
        if (user.role === "admin") {
            return <Navigate to="/dashboard" replace />
        } else {
            return <Navigate to="/" replace />
        }
    }

    return <>{children}</>
}

export default ProtectedRoute
