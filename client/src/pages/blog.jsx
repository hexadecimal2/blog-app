import React from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Blog = () => {
  const location = useLocation();
  const data = location.state.data;
  
  const navigate = useNavigate();
    
  console.log(data);

  return (
    
    <>
    <div className="blog-page-container">
      <h1 className="blog-page-title">JUST A SINGLE BLOG</h1>
      <h2 className="blog-author">{data.Author}</h2>
      <h2 className="blog-date">{data.Date}</h2>

      <div className="content-area">
        <h1 className="blog-title">{data.Title}</h1>
        <strong className="blog-description">{data.Description}</strong>

        <div className="paragraph-section">
          <p>{data.Blog_data}</p> {/* make sure they wrap around */}
        </div>
      </div>
    </div>
  
    <button className="return-home-button" onClick={() => navigate("/")}>
        Return Home
      </button>
    </>
  );
};

export default Blog;
