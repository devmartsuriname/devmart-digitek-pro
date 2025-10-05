import { RouterProvider } from "react-router-dom";
import { router } from './Routes/Routes.jsx';

console.log('🟢 App.jsx loaded');
console.log('🟢 Router:', router);

export default function App() {
  console.log('🟢 App component rendering...');
  return <RouterProvider router={router} />;
}
