import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "./PostDetail.module.scss";

// Function to fetch a single post by slug
async function fetchPostBySlug(slug) {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/article/{id}/`);
    console.log("API Response for slug: ", response.data);
    return response.data;
}

// Component to display full post details
export default function PostDetail() {
    const { id } = useParams(); // Get slug from URL params
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPostBySlug(id),
    });

    if (isLoading) {
        return <div>Loading full post...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>No data found for this post.</div>;
    }

    return (
        <div className={styles.container}>
            <h1>{data.title}</h1>
            <p>{data.category_name}</p>
            <img src={data.image} alt="article" className={styles.post_img} />
            <p>{data.description}</p>
            <p>Last updated: {data.time_update}</p>
        </div>
    );
}