import { RouterProvider } from "react-router-dom";
import { router } from './Routes/Routes.jsx';

export default function App() {
  return <RouterProvider router={router} />;
}
