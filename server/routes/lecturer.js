const router = require('express').Router();
const {Lecturer, validate} = require('../models/lecturer');
const bcrypt = require('bcrypt');

router.post('/',async(req,res)=> {
    try {
        const { error } = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message})
        
        const lecturerOne = await Lecturer.findOne({email: req.body.email});
        if(lecturerOne)
            return res.status(409).send({message: "User with this email already exists"});
            
        const lecturerTwo = await Lecturer.findOne({username: req.body.username});
        if(lecturerTwo)
            return res.status(409).send({message: "username already exists"});
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new Lecturer({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "Lecturer's account created"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});   
    }
})

module.exports = router;