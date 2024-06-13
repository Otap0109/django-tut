import React from "react";
import Posts from "./components/Posts/Posts";
import PostDetail from './components/PostDetail/PostDetail';
import Add from "./components/Add/Add";
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 const queryClient = new QueryClient();

function App(){
  return(
      <QueryClientProvider client={queryClient}>
        <Router>
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/post/:id/" element={<PostDetail />} />
                <Route path="/addArticle/" element={<Add />} />
            </Routes>
        </Router>
      </QueryClientProvider>
  )
}

export default App;



