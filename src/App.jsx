import { RouterProvider } from "react-router-dom";
import { router } from './Routes/Routes.jsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import CrashOverlay from './components/ErrorBoundary/CrashOverlay.jsx';

console.log('🟢 App.jsx loaded');
console.log('🟢 Router:', router);

export default function App() {
  console.log('🟢 App component rendering...');
  return (
    <ErrorBoundary>
      <CrashOverlay />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

