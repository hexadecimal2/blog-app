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
    connectionLimit: process.env.DB_CONNECTION_LIMIT
});

const buildData = (users, blogs) => {
    let data = [];
    for (let i = 0; i < blogs.length; i++) {
        data.push({
            id: blogs[i].blogID,
            data: {
                Title: blogs[i].Title,
                Description: blogs[i].Description,
                Author: users.find(user => user.userID === blogs[i].authorID)?.Username || 'Unknown',
                Date: blogs[i].Date,
                Blog_data: blogs[i].BlogData
            }
        });
    }
    return data;
};

app.use(cors({ origin: 'https://brilliant-crisp-60a8c7.netlify.app' }));
app.use(express.json());

app.get('/get-blogs', async function (req, res) {
    try {
        const [users] = await pool.query('SELECT * FROM users');
        const [blogs] = await pool.query('SELECT * FROM blogs');
        
        let data = buildData(users, blogs);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.put('/add-blog', async function (req, res) {
    try {
        const { Author, Title, Description, Blog_data, Date } = req.body.data;
        const [users] = await pool.query('SELECT * FROM users WHERE Username = ?', [Author]);

        let authorID;

        // Check if the user already exists
        if (users.length > 0) {
            authorID = users[0].userID;
        } else {
            const result = await pool.query('INSERT INTO users (Username) VALUES (?)', [Author]);
            authorID = result[0].insertId;
        }

        const result = await pool.query(
            'INSERT INTO blogs (Title, Description, BlogData, Date, authorID) VALUES (?, ?, ?, ?, ?)', 
            [Title, Description, Blog_data, Date, authorID]
        );
        const newBlogID = result[0].insertId;

        const [updatedUsers] = await pool.query('SELECT * FROM users');
        const [updatedBlogs] = await pool.query('SELECT * FROM blogs');
        
        let updatedPosts = buildData(updatedUsers, updatedBlogs);
        res.json(updatedPosts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.delete('/delete-blog', async function (req, res) {
    try {
        const { id } = req.body;

        // Fetch the blog with the given ID
        const [blogs] = await pool.query('SELECT * FROM blogs WHERE blogID = ?', [id]);

        if (blogs.length === 0) {
            return res.status(404).send('Blog not found!');
        }

        const blog = blogs[0];

        // Delete the blog
        await pool.query('DELETE FROM blogs WHERE blogID = ?', [id]);

        // Optionally, you could remove the user if there are no more blogs by that user.
        const [userBlogs] = await pool.query('SELECT * FROM blogs WHERE authorID = ?', [blog.authorID]);
        if (userBlogs.length === 0) {
            await pool.query('DELETE FROM users WHERE userID = ?', [blog.authorID]);
        }

        const [updatedUsers] = await pool.query('SELECT * FROM users');
        const [updatedBlogs] = await pool.query('SELECT * FROM blogs');
        
        let updatedPosts = buildData(updatedUsers, updatedBlogs);
        res.json(updatedPosts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.listen(5000, function () {
    console.log('Server running on port 5000!');
});
