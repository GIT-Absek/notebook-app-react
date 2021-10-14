const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "GOODMORNING";

//Route 1 : Create a user using POST "/api/auth/createuser" - no login required
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    //If there are errors return bad request with message.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    try {
        //check if the user with the email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({  success,Error: "Duplicate email found, please enter unique email" });
        }
        //Generating hash of password and adding salt to it for security
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //Create new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });

        const data = {
            user: {
                id: user.id
            }
        }
        //Signing user id with Json Web Token to authenticate user's notes.
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({  success,authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured");
    }

})

//Route 2 : Authenticate a user using POST "/api/auth/login" - no login required
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be null").exists()
], async (req, res) => {
    let success=false;
    //If there are errors return bad request with message.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Destructuring email and password from request body.
    const { email, password } = req.body;
    try {
        //Chceking if user exists or not with email.
        let user = await User.findOne({ email });
        //if user does not exists repond with error.
        if (!user) {
            success=false;
            res.status(400).json({success, Error: "User does not exists." });
        }
        //if user found, comparing hashed password stored in database with entered password.
        const passwordCompare = await bcrypt.compare(password, user.password); //returns boolean value
        if (!passwordCompare) {
            success=false;
            res.status(400).json({success, Error: "Try to login with correct credentials." });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({ success,authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured");
    }
})

//Route 3 : Getting logged in user data using POST "/api/auth/getuser" - login required
router.post("/getuser", fetchuser , async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
        
    } catch (error) {
        res.status(401).json({ Error: "Enter a valid token" });
    }
  
})

module.exports = router;