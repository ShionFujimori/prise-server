// load modules
const express = require('express');
const mysql = require('mysql');

// create an instance of the express module
const app = express();

// mysql connection info
const pool = mysql.createPool({
    host: 'localhost',
    user: 'teamprise',
    password: 'prise2020',
    database: 'prise'
});

// CORS (Cross-origin resource sharing)
// A protocol that enables scripts running on a browser client
// to interact with resources from a different origin
app.use((req, res, next)　=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, \
              Content-Type, Accept");
  next();
});

// '/' routing
app.get('/', (req, res) => {
    res.render('top.ejs');
});

// '/posts' routing
app.get('/posts', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'SELECT * FROM user',
            (error, results) => {
                res.send(results);
                connection.release();
            }
        );
    });
});

// Run a local web server (localhost:4000)
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
