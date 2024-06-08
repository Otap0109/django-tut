import React from "react";
import Posts from './components/Posts/Posts'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

 const queryClient = new QueryClient();

function App(){
  return(
      <QueryClientProvider client={queryClient}>
        <Posts/>
      </QueryClientProvider>
  )
}

export default App;