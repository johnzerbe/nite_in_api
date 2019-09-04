const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

require('./db/db');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// Set up CORS as Middleware, so any client can make a request
// to the server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000', // when react app is deployed, this is where the address goes
    credentials: true, // allows cookies to be sent with requests from the client (session cookie)
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

// app.use('/api/v1/user', userController);
app.use('/auth', authController);

app.listen(process.env.PORT || 9000, () => {
    console.log('listening on port 9000');
});