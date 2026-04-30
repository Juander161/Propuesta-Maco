import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';

export const metadata = {
  title: 'LogísticaPro - Sistema de Gestión de Operaciones',
  description: 'Sistema integral de gestión y automatización de operaciones logísticas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
