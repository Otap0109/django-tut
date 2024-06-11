import React from 'react'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


async function fetchCats() {
    const response = await axios.get('http://127.0.0.1:8000/cats/');
    return response.data;
}

export default function Menu(){



    const {data, error, isError, isLoading  } = useQuery({
        queryKey: ['cats'],
        queryFn: fetchCats,
    });
    if (isLoading) {
        return <div>Loading data...</div>;
      }
    
      if (isError) {
        return <div>Error: {error.message}</div>;
      }
    
      const articles = data.results ? data.results : data;
    
      if (!Array.isArray(articles)) {
        return <div>Error: Unexpected response format</div>;
      }


    const cats = data.results ? data.results : data;

    return(
        <div>
            {cats.map((cat, id, data) =>{
            return(
                <p key={id}>{cat.name}</p>
            );
            })}
        </div>
    )
}