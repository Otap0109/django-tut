import React, { useState }  from "react";
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import Posts from "./components/Posts/Posts";
import PostDetail from './components/PostDetail/PostDetail';
import Add from "./components/Add/Add";
import Nav from "./components/Nav/Nav"


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 const queryClient = new QueryClient();

function App(){
  const [selectedCat, setSelectedCat] = useState(null);

  return(
      <QueryClientProvider client={queryClient}>
        
        <Router>
        <Nav selectedCat={selectedCat} setSelectedCat={setSelectedCat}/>
            <Routes>
                <Route path="/" element={<Posts selectedCat={selectedCat}/>} />
                <Route path="/category/:slug" element={<Posts selectedCat={selectedCat}/>} />
                <Route path="/post/:id/" element={<PostDetail />} />
                <Route path="/addArticle/" element={<Add />} />
            </Routes>
        </Router>
      </QueryClientProvider>
  )
}

export default App;



