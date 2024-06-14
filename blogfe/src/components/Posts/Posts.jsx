import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Posts.module.scss";

// Function to fetch posts from the API
async function fetchPosts() {
  const response = await axios.get("http://127.0.0.1:8000/home/");
  return response.data;
}

// Component to display the posts
export default function Posts({ selectedCat }) {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
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

  const filteredArticles = selectedCat
    ? articles.filter((article) => article.category_name === selectedCat)
    : articles;

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      <ul>
        {filteredArticles.map((article, id) => {
          return (
            <li key={id} className={styles.post_title}>
              <h2>{article.title}</h2>
              <p className={styles.cat_name}>{article.category_name}</p>

              <ul className={styles.post}>
                <li className={styles.post_list}>
                  <img
                    src={article.image}
                    alt="article"
                    className={styles.post_img}
                  />
                  <p>
                    {article.description.slice(0, 500)} ...
                    {/* Link to the full content page */}
                    <Link to={`/post/${article.id}`}>Read more</Link>
                  </p>
                </li>
              </ul>

              <p className={styles.post_list}>
                Last updated: {article.time_update}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
