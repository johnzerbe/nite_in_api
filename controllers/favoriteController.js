const express = require('express');
const router = express.Router();
const Favorites = require('../models/favorites');
const User = require('../models/user');


//GET ALL DATA FOR USER PAGE
router.get('/', async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.userId);
        console.log('REQ.SESSION: ', req.session);
        console.log('REQ.SESSION.USERID: ', req.session.userId);
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
    res.setHeader('Access-Control-Allow-Origin', 'https://nitein3.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    try {
        console.log(req.body, ' THIS IS REQ.BODY');
        console.log(req.session, 'REQ.SESSION IN POST ROUTE');
        const foundUser = await User.findById(req.session.userId);
        console.log('THIS IS FOUNDUSER: ', foundUser);
        const createdFavorite = await foundUser.favorites[req.params.type].push(req.body);
        const savedFavorite = await foundUser.save();
        console.log("SAVED FAVORITE: ", savedFavorite);
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

// ADD SAVED FOR LATER RECIPE AND MOVIE
router.post('/savedforlater/:latertype', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://nitein3.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    try {
        console.log(req.body, ' THIS IS REQ.BODY');
        console.log(req.session, 'REQ.SESSION IN POST ROUTE');
        const foundUser = await User.findById(req.session.userId);
        console.log('THIS IS FOUNDUSER: ', foundUser);
        const savedForLater = await foundUser.savedForLater[req.params.latertype].push(req.body);
        const saved = await foundUser.save();
        console.log("SAVED FAVORITE: ", saved);

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



// router.get('/:id', async (req, res, next) => {
//     try {
//         const foundFavorite = await Favorites.findById(req.params.id);
//         res.json({
//             status: {
//                 code: 200,
//                 message: "Success"
//             },
//             data: foundFavorite
//         })
//     } catch(err) {
//         res.send(err)
//     }
// });


// router.put('/:id', async (req, res) => {
//     try {
//         const updatedFavorite = await Favorites.findByIdAndUpdate(req.params.id, req.body, {new: true});
//         res.json({
//             status: {
//                 code: 200,
//                 message: 'resource updated successfully'
//             },
//             data: updatedFavorite
//         })
//     } catch(err){
//         res.send(err)
//     }
// });


// DELETE FAVORITE
router.delete('/:id/:type', async (req, res) => {
    console.log('AAAAAAAAAAA');
    try {
        const foundUser = await User.findById(req.session.userId);
        console.log('foundUser: ', foundUser);
        const userFavorite = await foundUser.favorites[req.params.type];
        console.log('userFavorite: ', userFavorite);
        const chosenType = (req.params.type == 'recipes' ? 'chosenRecipe' : 'chosenMovie');
        
        //foundUser.favorites[req.params.type][i][chosenType].id

        for(let i = 0; i < foundUser.favorites[req.params.type].length; i++) {
            //console.log('BBBBBB',userFavorite[i][chosenType].id);
            //console.log('req.params.id:', req.params.id);
            //console.log(foundUser.favorites[req.params.type].id == req.params.id);
            //console.log('CCCCCCC', foundUser.favorites[req.params.type][i][chosenType].id);
            if(foundUser.favorites[req.params.type][i][chosenType].id == req.params.id) {
                console.log('TRUE');
                foundUser.favorites[req.params.type].splice(i, 1);
            }
        }

        foundUser.save();
        const updatedUser = await User.findById(req.session.userId);
        console.log('updatedUser: ', updatedUser);

       res.json({
            status: {
                code: 200,
                message: "resource deleted successfully"
            },
            data: updatedUser

        })
    } catch(err) {
        res.send(err)
    }
});


router.delete('/savedForLater/:id/:type', async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.userId);
        console.log('foundUser: ', foundUser);
        const userFavorite = await foundUser.savedForLater[req.params.type];
        console.log('userFavorite: ', userFavorite);
        const chosenType = (req.params.type == 'recipes' ? 'chosenRecipe' : 'chosenMovie');
        
        //foundUser.favorites[req.params.type][i][chosenType].id

        for(let i = 0; i < foundUser.savedForLater[req.params.type].length; i++) {
            //console.log('BBBBBB',userFavorite[i][chosenType].id);
            //console.log('req.params.id:', req.params.id);
            //console.log(foundUser.favorites[req.params.type].id == req.params.id);
            //console.log('CCCCCCC', foundUser.favorites[req.params.type][i][chosenType].id);
            if(foundUser.savedForLater[req.params.type][i][chosenType].id == req.params.id) {
                console.log('TRUE');
                foundUser.savedForLater[req.params.type].splice(i, 1);
            }
        }

        foundUser.save();
        const updatedUser = await User.findById(req.session.userId);
        console.log('updatedUser: ', updatedUser);

       res.json({
            status: {
                code: 200,
                message: "resource deleted successfully"
            },
            data: updatedUser

        })
    } catch(err) {
        res.send(err)
    }
//     try {
//         const foundUser = await User.findById(req.session.userId);
//         const userFavorite = await foundUser.favorites[req.params.type]
// ;        res.json({
//             status: {
//                 code: 200,
//                 message: "resource deleted successfully"
//             }
//         })
//     } catch(err) {
//         res.send(err)
//     }
});


module.exports = router;