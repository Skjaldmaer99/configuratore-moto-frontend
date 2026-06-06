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
        element: <VehiclesPage />
      },
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/crea-catalogo',
        element: <CreaCatalogoPage />
      },
      {
        path: '/le-mie-configurazioni',
        element: <ConfigurationsPage />
      }
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
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/models/:id',
        element: <VehicleDetailPage />
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
