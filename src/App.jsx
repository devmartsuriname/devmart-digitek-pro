import { RouterProvider } from "react-router-dom";
import { AuthProvider } from './lib/contexts/AuthContext';
import { router } from './Routes/Routes.jsx';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
