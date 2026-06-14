import { ThemeProvider } from "@/components/theme-provider.tsx";
import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import AuthLayout from "./layouts/AuthLayout.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import VehicleDetailPage from "./pages/VehicleDetailPage.tsx";
import VehiclesPage from "./pages/VehiclesPage.tsx";
import CreaCatalogoPage from "./pages/CreaCatalogoPage.tsx";
import ConfigurationsPage from "./pages/ConfigurationsPage.tsx";
import ConfigurationDetailPage from "./pages/ConfigurationDetailPage.tsx";
import ProtectedRoute from "./lib/ProtectedRoute.tsx";
import RecuperoPasswordPage from "./pages/RecuperoPasswordPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import SuccessPasswordPage from "./pages/SuccessPasswordPage.tsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.tsx";
import RedirectPasswordPage from "./pages/RedirectPasswordPage.tsx";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount: number, error: unknown) => {
        // Narrow unknown to an object shape that may contain a response.status
        const maybeResponse = (error as { response?: { status?: number } } | undefined)?.response;
        if (maybeResponse?.status === 403) {
          return false; // stoppa il retry
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ProtectedRoute allowedRoles={['customer']}><VehiclesPage /></ProtectedRoute>
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute allowedRoles={['admin']}><DashboardPage /></ProtectedRoute>
      },
      {
        path: '/crea-catalogo',
        element: <ProtectedRoute allowedRoles={['admin']}><CreaCatalogoPage /></ProtectedRoute>
      },
      {
        path: '/le-mie-configurazioni',
        element: <ProtectedRoute allowedRoles={['customer']}><ConfigurationsPage /></ProtectedRoute>
      },
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/recupero-password',
        element: <RecuperoPasswordPage />
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />
      },
      {
        path: '/success-password',
        element: <SuccessPasswordPage />
      },
      {
        path: '/verify-email',
        element: <VerifyEmailPage />,
      },
      {
        path: '/redirect-password',
        element: <RedirectPasswordPage />,
      },
      {
        path: '/models/:id',
        element: <ProtectedRoute allowedRoles={['customer']}><VehicleDetailPage /></ProtectedRoute>
      },
      {
        path: '/configurations/:id',
        element: <ProtectedRoute allowedRoles={['customer']}><ConfigurationDetailPage /></ProtectedRoute>
      },
    ]
  }
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
        <TanStackDevtools config={{ position: 'middle-left' }} plugins={[
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel />,
            defaultOpen: false,
          },
        ]} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
