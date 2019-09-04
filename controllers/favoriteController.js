const express = require('express');
const router = express.Router();
const Favorites = require('../models/favorites');
const User = require('../models/user');


//INDEX
router.get('/', async (req, res) => {
    try {
        const allFavorites = await Favorites.find();
        console.log(req.session, ' THIS IS REQ.SESSION')
        res.json({
            code: 200,
            message: "Success",
            data: allFavorites
        })
    } catch(err) {
        res.send(err)
    }
});


router.post('/', async (req, res) => {
    try {
        console.log(req.body, ' THIS IS REQ.BODY');
        console.log(req.session, 'REQ.SESSION IN POST ROUTE')
        const createdFavorite = await Favorites.create(req.body);

        res.json({
            status: {
                code: 201,
                message: "Success"
            },
            data: createdFavorite
        })
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const foundFavorite = await Favorites.findById(req.params.id);
        res.json({
            status: {
                code: 200,
                message: "Success"
            },
            data: foundFavorite
        })
    } catch(err) {
        res.send(err)
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedFavorite = await Favorites.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            status: {
                code: 200,
                message: 'resource updated successfully'
            },
            data: updatedFavorite
        })
    } catch(err){
        res.send(err)
    }
});


// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedFavorite = await Favorites.findByIdAndRemove(req.params.id);
        res.json({
            status: {
                code: 200,
                message: "resource deleted successfully"
            }
        })
    } catch(err) {
        res.send(err)
    }
});

module.exports = router;