import { Outlet } from 'react-router-dom';
import { AuthProvider } from './lib/contexts/AuthContext';

export default function RootProvider() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
