import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";



const AddBlog = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handlePost = () => {
    

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const author = document.getElementById('author').value;
        const date = moment().format('D MMM, YYYY'); //;
        const blog_data = document.getElementById('blog').value;


        
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": location.state.data + 1, "data": { "Title" : title , "Description" : description,  "Author" : author, "Date" : date, "Blog_data" : blog_data
            }})  
        };
     
        fetch('http://127.0.0.1:5000/add-blog', requestOptions)
        .then(response => response.json())
        .then(data => {alert('Success!'); navigate('/') } );
    
    }

    return(     
    <>
    
    <h1>BLOGS</h1>

        <form>
            <label htmlFor="author"> Author: </label>
            <input type="text" id="author" name="AuthorDetails"/>

            <br />

            <label htmlFor="title"> Title: </label>
            <input type="text" id="title" name="TitleDetails"/>
            
            <br />

            <label htmlFor="description"> Description: </label>
            <input type="text" id="description" name="DescriptionDetails"/>

            <br />

            <label htmlFor="Blog"> Blog: </label>
            <input type="text" id="blog" name="BlogArea"/>

            <br />
            
            <button type="button" onClick={() => {handlePost()}}> Post </button>

        </form>
    
        

    </>

    );

}

export default AddBlog;