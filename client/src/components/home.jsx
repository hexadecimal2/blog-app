import React from "react"
import DisplayCard from "./displayCard.jsx"
import "../styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



const Home = () => {

    const [blogData, setBlogData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    fetch("http://127.0.0.1:5000/get-blogs").then(response => response.json()).then(data => {setBlogData(data)})
    }, []
    ); 
    
    const handleClick = (blog) => {
        
        console.log(blog.id);

        fetch('http://127.0.0.1:5000/delete-blog', {method: 'DELETE', headers: {
            'Content-Type': 'application/json'}, 
             body: JSON.stringify({id : blog.id})}).then(response => response.json()).then(data => {alert('Delete successful'); setBlogData(data)});    
    }
    
    return(
    <>
    <h1>JUST ANOTHER BLOG SITE</h1>
    <button type="button" onClick={() => {navigate('/add-blog', {state:{data : blogData.length}})}}>Add a blog</button>
    {
        blogData.map((blog, id) => (         
         <>
         <DisplayCard key={blog.id} data={blog.data}/>    
         <button type="button" onClick={() => {handleClick(blog)}}>Remove</button>
        </>
        )
    )
    }
    </>
    );
    
}

export default Home;