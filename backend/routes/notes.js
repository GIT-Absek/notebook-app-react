const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//Route 1 : fetching all notes using :GET http://localhost:5000/api/notes/fetchallnotes - Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured");
    }
})

//Route 2 : Adding a new note using :POST http://localhost:5000/api/notes/addnote - Login required
router.post("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 })
],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Error Occured");
        }
    })

//Route 3 : Update an existing note using :PUT http://localhost:5000/api/notes/updatenote - Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create new Note object 
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        //Find the note to be updated and update it 
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note Not Found"); }

        //Checking if the note is of logged in user
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Not Allowed");
        }

        //If the note is of logged in user then update it 
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured");
    }
})
//Route 4: Delete an existing note using :DELETE http://localhost:5000/api/notes/deletenote - Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it 
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note Not Found"); }

        //Checking if the note is of logged in user
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Not Allowed");
        }

        //If the note is of logged in user then delete it 
        note = await Notes.findByIdAndDelete(req.params.id);
        res.send("Note deleted");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured");
    }

})

module.exports = router;