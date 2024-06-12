import React from "react";
import { useParams } from "react-router-dom";

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Add.module.scss";
import Nav from "../Nav/Nav";

// Function to fetch a single post by slug
async function fetchPostBySlug(id) {
  const response = await axios.post(`http://127.0.0.1:8000/addArticle/`);
  return response.data;
}

// Component to display full post details
export default function Add() {

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return (
      <div>
        No data found for this page.
        <Link to={`/home/`}>Home</Link>
      </div>
    );
  }

  const fields = data.results ? data.results : data;

  return (
    <div className={styles.container}>
      <Nav />
      <form action=""></form>
    </div>
  );
}
