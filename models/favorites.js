const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    recipes: [],
    movies: [],
    books: []
});

module.exports = mongoose.model('Profile', ProfileSchema);