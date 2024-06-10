import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Posts.module.scss";
import PostDetail from "../PostDetail/PostDetail";

// Function to fetch posts from the API
async function fetchPosts() {
    const response = await axios.get('http://127.0.0.1:8000/home/');
    return response.data;
}

// Component to display the posts
export default function Posts() {
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    // State to manage the read more/less toggle for each article
    const [readStates, setReadStates] = useState({});

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

    const handleToggleRead = (id) => {
        setReadStates((prevState) => ({
            ...prevState,
            [id]: !prevState[id] // Toggle the state for the given article ID
        }));
    };

    return (
        <div className={styles.container}>
            <h1>Posts</h1>
            <ul>
                {articles.map((article, id) => {
                    const isExpanded = readStates[id]; // Check if this article is expanded

                    return (
                        <li key={id} className={styles.post_title}>
                            <h2>{article.title}</h2>
                            <p>{article.category_name}</p>

                            <ul className={styles.post}>
                                <li className={styles.post_list}>
                                    <img src={article.image} alt="article" className={styles.post_img} />
                                    <p>
                                        {isExpanded ? article.description : `${article.description.slice(0, 500)}...`}
                                        <button onClick={() => handleToggleRead(id)}>
                                            {isExpanded ? 'Read less' : 'Read more'}
                                        </button>
                                    </p>
                                    {/* Link to the full content page */}
                                    
                                </li>
                            </ul>

                            <p className={styles.post_list}>Last updated: {article.time_update}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
