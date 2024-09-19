import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "../styles.css";

const AddBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handlePost = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const author = document.getElementById("author").value;
    const date = moment().format("D MMM, YYYY");
    const blog_data = document.getElementById("blog").value;

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: location.state.data + 1,
        data: { Title: title, Description: description, Author: author, Date: date, Blog_data: blog_data },
      }),
    };

    fetch("https://blog-app-pcbk.onrender.com/add-blog", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert("Success!");
        navigate("/");
      });
  };

  return (
    <div className="add-blog-container">
      <h1 className="add-blog-title">Create a New Blog Post</h1>

      <form className="add-blog-form">
        <label htmlFor="author" className="form-label">
          Author:
        </label>
        <input type="text" id="author" name="AuthorDetails" className="form-input" />

        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input type="text" id="title" name="TitleDetails" className="form-input" />

        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <input type="text" id="description" name="DescriptionDetails" className="form-input" />

        <label htmlFor="blog" className="form-label">
          Blog:
        </label>
        <textarea id="blog" name="BlogArea" className="form-textarea" />

        <button type="button" className="submit-button" onClick={handlePost}>
          Post
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
