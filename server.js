const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();


const dbConnection = require('./db/db');

const sessionStore = new MongoStore(
    {
        mongooseConnection: dbConnection,
        secret: process.env.STORE_SECRET
    });
    

app.use(session({
    secret: 'keyboard cat',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

// Set up CORS as Middleware, so any client can make a request
// to the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const corsOptions = {
    // origin: 'http://localhost:3000', 
    // when react app is deployed, this is where the address goes
    origin: 'https://nitein3.herokuapp.com',
    credentials: true, // allows cookies to be sent with requests from the client (session cookie)
    optionsSuccessStatus: 200
}

// app.options('/auth', cors());

app.use(cors(corsOptions));

const authController = require('./controllers/authController');
const favoriteController = require('./controllers/favoriteController');

// app.use('/api/v1/user', userController);
app.use('/auth', authController);
app.use('/favorite', favoriteController);

app.get('/fakeroute', (req,res) => {
    res.render('fakefile.ejs')
})


app.listen(process.env.PORT, () => {
    console.log('listening on port 9000');
  })

// app.set('port', process.env.PORT || 9000)

// app.listen(app.get('port'), () => {
//   console.log(`✅ PORT: ${app.get('port')} 🌟`)
// })

// app.listen(process.env.PORT || 9000, () => {
//     console.log('listening on port 9000');
// });