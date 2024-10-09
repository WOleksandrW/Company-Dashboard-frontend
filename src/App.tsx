import { QueryClient, QueryClientProvider } from 'react-query';
import Routing from './routing/Routing';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routing />
    </QueryClientProvider>
  );
}

export default App;
