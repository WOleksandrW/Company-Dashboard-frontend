import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
      onError: (error) => {
        onAxiosError(error, queryClient);
      }
    },
    mutations: {
      onError: (error) => {
        onAxiosError(error, queryClient);
      }
    }
  }
});

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '3.2rem'
    },
    h2: {
      fontSize: '2.4rem'
    },
    h6: {
      fontSize: '1.8rem'
    },
    body1: {
      fontSize: '1.6rem'
    },
    body2: {
      fontSize: '1.4rem'
    }
  },
  palette: {
    primary: {
      main: '#1E3A8A'
    },
    secondary: {
      main: '#60A5FA'
    },
    background: {
      default: '#E5E7EB',
      paper: '#EFEFEF'
    },
    text: {
      primary: '#121212',
      secondary: '#6B7280'
    }
  }
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {isLoading ? <AuthController setIsLoading={setIsLoading} /> : <Routing />}
      </ThemeProvider>
      <ToastContainer style={{ fontSize: '16px' }} closeOnClick />
    </QueryClientProvider>
  );
}

export default App;
