const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    password: "Thisisapassword1",
    database: "blogdb",
    connectionLimit: 30
})

//let posts = JSON.parse(fs.readFileSync('./blogs.json', {encoding:'utf8'}));


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


app.use(cors({origin:'http://localhost:3000'}));

app.use(express.json());

app.get('/get-blogs', async function(request, response){
    
    const users = await pool.query('SELECT * FROM users');
    const blogs = await pool.query('SELECT * FROM blogs');
    
    //build the json file
   
    let data = buildData(users, blogs);
     
    response.json(data);
    
    console.log(data);

});


app.put('/add-blog', async function(request, response){
    
    let users = await pool.query('SELECT * FROM users');
    let blogs = await pool.query('SELECT * FROM blogs');
        
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
    

    await pool.query(`INSERT INTO users (Username) VALUES ('${request.body.data.Author}')`) 
  
    posts.push(request.body);
   
    await pool.query(`INSERT INTO blogs ( blogID, Title, Description, BlogData, Date) VALUES( ${posts[posts.length - 1].id}, '${posts[posts.length - 1].data.Title}', '${posts[posts.length - 1].data.Description}', '${posts[posts.length - 1].data.Blog_data}', '${posts[posts.length - 1].data.Date}');`);
    //await pool.query(`INSERT INTO userblogs (userID, blogID) VALUES ((SELECT userID FROM users WHERE Username IN ( SELECT '${posts[posts.length - 1].data.Author}')), ${posts[posts.length - 1].id})`);
    response.send(posts);

})


app.delete('/delete-blog', async function(request, response){

    const users = await pool.query('SELECT * FROM users');
    const blogs = await pool.query('SELECT * FROM blogs');
    
    let posts = buildData(users, blogs);
    
    let found = false;

    posts.find(function (index) {
        if (index.id === request.body.id) {
            found = true;            
            pool.query(`DELETE FROM blogs WHERE blogID = ${posts[request.body.id - 1].id}`).then();
            pool.query(`DELETE FROM users WHERE username = '${posts[request.body.id - 1].data.Author}'`).then();
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