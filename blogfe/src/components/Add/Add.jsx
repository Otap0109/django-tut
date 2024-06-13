import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Add.module.scss";
import Nav from "../Nav/Nav";

// Function to fetch categories
const fetchCategories = async () => {
  const response = await axios.get("http://127.0.0.1:8000/cats/");
  return response.data;
};

// Function to add a new article
const addArticle = async (data) => {
  const response = await axios.post("http://127.0.0.1:8000/addArticle/", data);
  return response.data;
};

export default function Add() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [cat, setCat] = useState(""); // State to hold selected category
  const [categories, setCategories] = useState([]); // State to hold list of categories

  const queryClient = useQueryClient();

  // Fetch categories using useQuery
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  // Using useMutation with object syntax
  const mutation = useMutation({
    mutationFn: addArticle,
    onSuccess: () => {
      // Invalidate and refetch the categories query after adding article
      queryClient.invalidateQueries("categories");
      navigate("/");
    },
    onError: (error) => {
      console.error("Error adding article:", error);
      // Handle error state if needed
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    formData.append("cat", cat);

    // Trigger the mutation with form data
    mutation.mutate(formData);
  };

  if (categoriesLoading) return <div>Loading categories...</div>;
  if (categoriesError)
    return <div>Error fetching categories: {categoriesError.message}</div>;

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Add a New Article</h2>
        {mutation.isLoading && <div>Loading...</div>}
        {mutation.isError && <div>Error: {mutation.error.message}</div>}
        {mutation.isSuccess && <div>Article added successfully!</div>}

        <div >
          
          <input className={styles.text_field}
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
          />
        </div>

        <div >
          <input className={styles.text_field}
            type="slug"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="URL"
          />
        </div>

        <div >
          <textarea 
            className={styles.content_field}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Article content"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div >
          <select
            id="cat"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            required
          >
            <option value="">Select a category...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={mutation.isLoading}>
          Add Article
        </button>
      </form>
      </div>
    </div>
  );
}
