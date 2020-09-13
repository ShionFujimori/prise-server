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

// required to obtain the value of a form
app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

// '/create-trial' routing
// CRUD: CREATE operation (trial email)
app.post('/create-trial', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'INSERT INTO email_list (email) VALUES (?)',
            [req.body.email],
            (error, results) => {
                res.redirect("http://localhost:3000/");
                connection.release();
            }
        );
    });
});

// '/create-user' routing
// CRUD: CREATE operation (new user)
app.post('/create-user', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'INSERT INTO user (username, password) VALUES (?, ?)',
            [req.body.username, req.body.password],
            (error, results) => {
                res.redirect("http://localhost:3000/");
                connection.release();
            }
        );
    });
});

// '/read-user' routing
// CRUD: READ operation (all user data)
app.get('/read-user', (req, res) => {
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

// '/read-user/:id' routing
// CRUD: READ operation (a single user data)
app.get('/read-user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'SELECT * FROM user WHERE id = ?',
            [req.params.id],
            (error, results) => {
                res.send(results);
                connection.release();
            }
        );
    });
});

// '/update-user/:id' routing
// CRUD: UPDATE operation (user password)
app.post('/update-user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'UPDATE user SET password = ? WHERE id = ?',
            [req.body.password, req.params.id],
            (error, results) => {
                res.redirect("http://localhost:3000/");
                connection.release();
            }
        );
    });
});

// '/delete-user/:id' routing
// CRUD: DELETE operation (user account)
app.post('/delete-user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'DELETE FROM user WHERE id = ?',
            [req.params.id],
            (error, results) => {
                res.redirect("http://localhost:3000/");
                connection.release();
            }
        );
    });
});

// '/delete-trial/:id' routing
// CRUD: DELETE operation (trial email info)
app.post('/delete-trial/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'DELETE FROM email_list WHERE id = ?',
            [req.params.id],
            (error, results) => {
                res.redirect("http://localhost:3000/");
                connection.release();
            }
        );
    });
});

// Run a local web server (localhost:4000)
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
