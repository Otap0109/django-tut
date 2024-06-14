import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styles from "./PostDetail.module.scss";

// Function to fetch a single post by ID
async function fetchPostBySlug(id) {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/v1/article/${id}/`
  );
  console.log("API Response for post: ", response.data);
  return response.data;
}

// Function to delete a post by ID
async function deletePost(id) {
  const response = await axios.delete(
    `http://127.0.0.1:8000/api/v1/article/${id}/`
  );
  console.log("Post deleted: ", response.data);
  return response.data;
}

export default function PostDetail() {
  const { id } = useParams(); // Get ID from URL params
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch post details
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostBySlug(id),
  });

  // Mutation to delete the post
  const mutation = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      // Invalidate queries to refetch necessary data if needed
      queryClient.invalidateQueries(["posts"]); // If you have a list of posts
      // Redirect to the home page or a specific page after deletion
      navigate("/");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
      // Handle error, e.g., show an error message
      alert("Error deleting post");
    },
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
      <div className={styles.post}>
        <h1>{data.title}</h1>
        <p className={styles.cat_name}>{data.category_name}</p>
        <img src={data.image} alt="article" className={styles.post_img} />
        <p>{data.description}</p>
        <p>Last updated: {data.time_update}</p>
        {/* Delete Button */}
        <button
          className={styles.deleteButton}
          onClick={() => mutation.mutate()} // Trigger delete mutation
          disabled={mutation.isLoading} // Disable button while loading
        >
          {mutation.isLoading ? "Deleting..." : "Delete Post"}
        </button>
      </div>
      {mutation.isError && (
        <div className={styles.error}>Error: {mutation.error.message}</div>
      )}
      {mutation.isSuccess && (
        <div className={styles.success}>Post deleted successfully!</div>
      )}
    </div>
  );
}
