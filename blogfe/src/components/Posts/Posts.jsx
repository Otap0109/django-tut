// import React from "react";
// import { useQuery } from "@tanstack/react-query"
// import axios from "axios"

// async function fetchPosts(){
//     const {data} = await axios.get('http://127.0.0.1:8000/home/')    
//     return data
// }

// export default function MainPage(){
//     function Posts(){
//         const {data, error, isError, isLoading } = useQuery('posts', fetchPosts)
//     if (isLoading){
//         return(
//             <div>Loading data...</div>
//         )
//     }
//     return(
//         <div>
//                     <div className='container'>
//         <h1>Posts</h1>
//         {
//             data.map((Article, id) => {
//                 return <li key={id}>{Article.title}</li>
//             })
//         }
//         </div>
//         </div>
//     )
// }}



// src/components/MainPage.jsx
import React from "react";
import styles from "./Posts.module.scss"
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

// Initialize the QueryClient
const queryClient = new QueryClient();

// Function to fetch posts from the API
async function fetchPosts() {
    const response = await axios.get('http://127.0.0.1:8000/home/');
    console.log("API Response: ", response.data); // Log the response data for debugging
    return response.data;
}

// Component to display the posts
export default function Posts() {
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) {
        return <div>Loading data...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    // Check if data.results exists, otherwise fallback to data
    const articles = data.results ? data.results : data;

    if (!Array.isArray(articles)) {
        return <div>Error: Unexpected response format</div>;
    }
    return (
        <div className={styles.container}>
            <h1>Posts</h1>
            <ul>
                {articles.map((article, id) => (
                    <li key={id}>
                        <h2>Article {id + 1}</h2>
                        <ul className={styles.post}>
                            {Object.entries(article).map(([key, value]) => (
                                <li key={key} className={styles.post_list}>
                                    {typeof value === 'string' && value.match(/\.(jpeg|jpg|gif|png)$/) ? <img src={value} alt={key} className={styles.post_img}/> : value}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
