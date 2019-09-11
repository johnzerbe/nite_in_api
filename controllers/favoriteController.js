const express = require('express');
const router = express.Router();
const Favorites = require('../models/favorites');
const User = require('../models/user');


//GET ALL DATA FOR USER PAGE
router.get('/', async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.userId);
        console.log('foundUser ', foundUser);
        res.json({
            code: 200,
            message: "Success",
            data: foundUser
        })
    } catch(err) {
        res.send(err)
    }
});

// ADD FAVORITE RECIPES AND MOVIES
router.post('/:type', async (req, res) => {
    try {
        console.log(req.body, ' THIS IS REQ.BODY');
        console.log(req.session, 'REQ.SESSION IN POST ROUTE');
        const foundUser = await User.findById(req.session.userId);
        console.log('THIS IS FOUNDUSER: ',foundUser);
        const createdFavorite = await foundUser.favorites[req.params.type].push(req.body);
        const savedFavorite = await foundUser.save();
        console.log(savedFavorite);

        res.json({
            status: {
                code: 201,
                message: "Success"
            },
            data: savedFavorite
        })
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});

// ADD SAVED FOR LATER RECIPE AND MOVIE
router.post('/savedforlater/:latertype', async (req, res) => {
    try {
        console.log(req.body, ' THIS IS REQ.BODY');
        console.log(req.session, 'REQ.SESSION IN POST ROUTE');
        const foundUser = await User.findById(req.session.userId);
        console.log('THIS IS FOUNDUSER: ', foundUser);
        const savedForLater = await foundUser.savedForLater[req.params.latertype].push(req.body);
        const saved = await foundUser.save();
        console.log(saved);

        res.json({
            status: {
                code: 201,
                message: "Success"
            },
            data: saved
        })

    } catch(err) {
        console.log(err);
        res.send(err)
    }
})



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