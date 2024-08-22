import React from "react"
import "../styles.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Blog = () => {




 
    const location = useLocation();
    const data = location.state.data;

    console.log(data);

    return(
        <>

            <h1> JUST A SINGLE BLOG </h1>
            <h2> {data.Author}</h2>
            <h2> {data.Date} </h2>
            
            <div className="contentArea">

                <h1> {data.Title} </h1>
                <strong> {data.Description } </strong>

                <div className="paragraphSection">
                    <p> {data.Blog_data} </p> {/* make sure they wrap around */ }
                </div>

            </div>
        
        </>
    );

}

export default Blog;