import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import Routing from './routing/Routing';
import { onAxiosError } from './constants/handlers';
import AuthController from './controllers/AuthController';

import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      onError: onAxiosError
    },
    mutations: {
      onError: onAxiosError
    }
  }
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading ? <AuthController setIsLoading={setIsLoading} /> : <Routing />}
      <ToastContainer style={{ fontSize: '16px' }} closeOnClick />
    </QueryClientProvider>
  );
}

export default App;
