const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');

let posts = JSON.parse(fs.readFileSync('./blogs.json', {encoding:'utf8'}));

app.use(cors({origin:'http://localhost:3000'}));

app.use(express.json());

app.get('/get-blogs', function(request, response){
    response.json(posts);
})

app.put('/add-blog', function(request, response){
    

    let found = false;

    posts.some(function(index){
        if (index.id === request.body.id){
            found = true;
            console.log(found);
            return
        }
        else {
            found = false;
        }
    })
    
    if (found) {
        console.log("Post exists!");
        response.send(posts);
    }
    else{
        posts.push(request.body);
        response.send(posts);
        console.log('Post added!');
    }
    

})


app.delete('/delete-blog', function(request, response){

    let found = false;

    posts.find(function (index) {
        if (index.id === request.body.id) {
            found = true;
            posts.splice(posts.indexOf(index.id), 1);
            return
        }
        else {
            found = false;
        }
    });

    if (found) {
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