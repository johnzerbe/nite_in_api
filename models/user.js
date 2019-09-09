const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type:String, unique:true},
    password: String,
    favorites: {
        recipes: [],
        movies: [],
    },
    savedForLater: {
        recipes: [],
        movies: []
    }
});

module.exports = mongoose.model('User', UserSchema);