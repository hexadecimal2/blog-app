const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    connectTimeout: 30000
});


const buildData = (users, blogs, arr) => {
    
  let data = []
  
  for (let i = 0; i < blogs[0].length; i++){
     
        data.push({
            
            id : blogs[0][i].blogID,
            data : { 
            Title : blogs[0][i].Title, 
            Description : blogs[0][i].Description,
            Author : users[0][i].Username,
            Date : blogs[0][i].Date,
            Blog_data: blogs[0][i].BlogData
            }
            
        })
     
    }

    return data       

   
}


app.use(cors({origin:'https://brilliant-crisp-60a8c7.netlify.app'}));

app.use(express.json());

app.get('/get-blogs', async function(request, response){
 
    const users = await pool.query('SELECT * FROM Users');
    const blogs = await pool.query('SELECT * FROM Blogs');
    
    //build the json file
   
    let data = buildData(users, blogs);
     
    response.json(data);
    
    console.log(data);
    
});


app.put('/add-blog', async function(request, response){
    
    let users = await pool.query('SELECT * FROM Users');
    let blogs = await pool.query('SELECT * FROM Blogs');
        
    let posts = buildData(users, blogs);
    
    let found = false;
    
    console.log(posts);

    
    posts.forEach(async (post, index, arr)=>{
       
        console.log(posts[index].data.Author)
        console.log(request.body.data.Author)
       
      if (posts[index].data.Author === request.body.data.Author){           
          found = true;         
      } else{
        found = false;
      }
    }) 
    

    await pool.query(`INSERT INTO Users (Username) VALUES ('${request.body.data.Author}')`) 
  
    posts.push(request.body);
   
    await pool.query(`INSERT INTO Blogs ( blogID, Title, Description, BlogData, Date) VALUES( ${posts[posts.length - 1].id}, '${posts[posts.length - 1].data.Title}', '${posts[posts.length - 1].data.Description}', '${posts[posts.length - 1].data.Blog_data}', '${posts[posts.length - 1].data.Date}');`);
    //await pool.query(`INSERT INTO userblogs (userID, blogID) VALUES ((SELECT userID FROM users WHERE Username IN ( SELECT '${posts[posts.length - 1].data.Author}')), ${posts[posts.length - 1].id})`);
    response.send(posts);

})


app.delete('/delete-blog', async function(request, response){

    const users = await pool.query('SELECT * FROM Users');
    const blogs = await pool.query('SELECT * FROM Blogs');
    
    let posts = buildData(users, blogs);
    
    let found = false;

    posts.find(function (index) {
        if (index.id === request.body.id) {
            found = true;            
            pool.query(`DELETE FROM Blogs WHERE blogID = ${posts[request.body.id - 1].id}`).then();
            pool.query(`DELETE FROM Users WHERE username = '${posts[request.body.id - 1].data.Author}'`).then();
            posts.splice(posts.indexOf(index.id - 1), 1);           
            return
        }
        else {
            found = false;
        }
    });

    if (found) {       
        //await pool.query(`DELETE FROM blogs WHERE blogID = ${posts[request.body.id - 1]}`)
        
        
        console.log(posts[request.body.id - 2]);
        console.log('Post deleted!');
        response.send(posts);
    
    }
    else{
        console.log('Post not found!');
        response.send(posts);
    }

})


app.listen(5000, function(){
    console.log('server running on port 5000!')
});