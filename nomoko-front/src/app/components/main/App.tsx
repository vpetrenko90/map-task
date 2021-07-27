import React, { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { MapComponent } from '../map';
import './App.css';

function App() {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <MapComponent />
      </QueryClientProvider>
    </div>
  );
}

export default App;
