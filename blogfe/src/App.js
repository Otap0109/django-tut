import React from "react";
import Posts from "./components/Posts/Posts";
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
// import Router from "./Router";


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PostDetail from '../src/components/PostDetail/PostDetail';



 const queryClient = new QueryClient();

function App(){
  return(
      <QueryClientProvider client={queryClient}>
        <Router>
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/post/:id/" element={<PostDetail />} />
            </Routes>
        </Router>
      </QueryClientProvider>
  )
}

export default App;



