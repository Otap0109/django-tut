import React from 'react'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from './Nav.module.scss'
import ProfileBtn from '../ProfileBtn/ProfileBtn';


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
        <nav className={styles.menu}>
            <Link to={`/home/`} className={styles.nav_btn}>Home</Link>
            {cats.map((cat, id) =>{
            return(
                <p className={styles.nav_btn} key={id}>{cat.name}</p>
            );
            })}
            <ProfileBtn className={styles.nav_btn}/>
        </nav>
    )
}