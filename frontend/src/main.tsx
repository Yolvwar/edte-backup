import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router'
import './styles/globals.css'
import routes from './routes/routes.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import { DocumentProvider } from './contexts/DocumentContext';
import { ProcessProvider } from './contexts/ProcessContext';

const AppRoutes = () => useRoutes(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <DocumentProvider>
          <ProcessProvider>
            <AppRoutes />
          </ProcessProvider>
        </DocumentProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
