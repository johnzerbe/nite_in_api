const mongoose = require('mongoose');


// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nitein', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => { console.log('MongoDB connected...')})
.catch(err => console.log(err));

mongoose.connection.on('connected', () => {
    console.log('MONGOOSE IS CONNECTED')
});

mongoose.connection.on('error', (err) => {
    console.log(err, ' MONGOOSE FAILED TO CONNECT')
});

mongoose.connection.on('disconnected', () => {
    console.log('MONGOOSE DISCONNECTED')
});

module.exports = mongoose.connection