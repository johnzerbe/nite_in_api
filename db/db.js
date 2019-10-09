const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/nitein', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('MONGOOSE IS CONNECTED')
});

mongoose.connection.on('error', (err) => {
    console.log(err, ' MONGOOSE FAILED TO CONNECT')
});

mongoose.connection.on('disconnected', () => {
    console.log('MONGOOSE DISCONNECTED')
});