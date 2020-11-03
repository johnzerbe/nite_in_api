const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();


const dbConnection = require('./db/db');

// const sessionStore = new mongoStore(
//     {
//         mongooseConnection: dbConnection,
//         secret: process.env.STORE_SECRET
//     });
    

app.use(session({
    secret: 'keyboard cat',
    //store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

// Set up CORS as Middleware, so any client can make a request
// to the server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
    // origin: 'http://localhost:3000', 
    // when react app is deployed, this is where the address goes
    origin: 'https://nitein3.herokuapp.com',
    credentials: true, // allows cookies to be sent with requests from the client (session cookie)
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const authController = require('./controllers/authController');
const favoriteController = require('./controllers/favoriteController');

// app.use('/api/v1/user', userController);
app.use('/auth', authController);
app.use('/favorite', favoriteController);

app.get('/fakeroute', (req,res) => {
    res.render('fakefile.ejs')
})
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
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