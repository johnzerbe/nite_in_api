const express = require("express");
const router = express.Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");


// LOGIN for registered users
router.post("/", async (req,res) => {
	if(req.body.username == "" || req.body.password =="") {
        req.session.message = {};
        req.session.message.type = "login";
        req.session.message.text = "The username or password is incorrect";
        res.redirect("/");
    } 
	try {
		const foundUser = await User.findOne({username: req.body.username});
		console.log(foundUser, "<-- foundUser");
		if(foundUser) {
			if(bcrypt.compareSync(req.body.password, foundUser.password)) {
				req.session.userId = foundUser._id;
				req.session.username = foundUser.username;
                req.session.logged = true;
                res.json({
                    status:  {
                        code: 400,
                        message: req.session.message
                      }
                  })

			} else {
				req.session.message = {};
				req.session.message.type = "login";
				req.session.message.text = "The username or password is incorrect";
				
			} 
		} else {
			req.session.message = {};
			req.session.message.type = "login";
			req.session.message.text = "The username or password is incorrect";
			
		} 	
	} catch(err) {
		res.send(err)
	}
});


// REGISTER for users wanting to create an account
router.post("/register", async (req,res) => {
    const password = req.body.password;
    console.log(req.body, ' <- req.body in register');
	// Encrypting password below
	const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	console.log(hashedPassword);
	req.body.password = hashedPassword;
	if(req.body.username == "" || req.body.password =="") {
        req.session.message = {};
        req.session.message.type = "login";
        req.session.message.text = "That username is currently in use.";
        res.json({
            status:  {
                code: 400,
                message: req.session.message
              }
          })
    } 
	try {
		const createdUser = await User.create(req.body);
		console.log(createdUser, "<-- CREATED USER");

		req.session.userId = createdUser._id;
		req.session.username = createdUser.username;
		req.session.logged = true;

		res.json({
            status:  {
                code: 400,
                message: "Success"
              }
          })
	} catch(err) {
		if(err.code === 11000) {
			req.session.message = {};
			req.session.message.type = "register"
			req.session.message.text = "That username has been taken, please enter another username.";
			res.redirect("/");
		} else {
			res.send(err);
		}
	}
});


router.get("/", (req,res) => {
	req.session.destroy((err) => {
		if(err) {
			res.send(err);
		} else {
			res.redirect("/");
		}
	})
});



module.exports = router;