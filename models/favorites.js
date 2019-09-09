const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    favorites: {
        recipes: [],
        movies: [],
    },
    savedForLater: {
        books: [],
        movies: []
    }

});

module.exports = mongoose.model('Profile', ProfileSchema);