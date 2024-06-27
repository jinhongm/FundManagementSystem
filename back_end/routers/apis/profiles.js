const express = require("express");
const router = express.Router();
const Profile = require("../../User_Models/Profile");
const passport = require("passport");

router.post("/add", passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.description) profileFields.description = req.body.description; 
    if(req.body.face_information) profileFields.face_information = req.body.face_information; 
    if(req.body.sound_information) profileFields.sound_information = req.body.sound_information;

    new Profile(profileFields).save().then(profile => {
        res.json(profile);
    });

});

// @route GET api/profiles
// @desc get all the information
// @access Private

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    // This line initiates a query to find all profiles in the database
    Profile.find()
    // then is to handle the result
        .then(profiles => {
            // check if the profiles array is empty
            if (profiles.length === 0) {
                // if no profiles are found, send a 404 status code
                return res.status(404).json({ noContent: 'No profiles found' });
            }
            // if profiles are found, send them back as json response
            res.json(profiles);
        })
        // find error
        .catch(err => res.status(404).json({ error: 'Error fetching profiles' }));
});

// @route GET api/profiles
// @desc get individual information
// @access Private

router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findById(req.params.id)
        .then(profile => {
            if (!profile) {
                return res.status(404).json({ noContent: 'No profile found' });
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({ error: 'Error fetching profile' }));
});


module.exports = router;


router.post("/edit/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.description) profileFields.description = req.body.description; 
    if(req.body.face_information) profileFields.face_information = req.body.face_information; 
    if(req.body.sound_information) profileFields.sound_information = req.body.sound_information; 

    Profile.findOneAndUpdate(
        {_id: req.params.id},
        {$set:profileFields},
        {new: true}
    ).then(profile => res.json(profile))

});

// @route GET api/profiles
// @desc delete information interfaces
// @access Private

router.delete("/delete/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    // This method finds the document by ID and removes it from the database.
    Profile.findOneAndDelete({ _id: req.params.id })
        .then(profile => {
            if (!profile) {
                return res.status(404).json({ msg: "Profile not found" });
            }
            // Send back a confirmation that the profile was deleted.
            res.json({ success: true, msg: 'Profile deleted successfully' });
        })
        .catch(err => res.status(404).json({ msg: "Fail to delete the data" }));
});


