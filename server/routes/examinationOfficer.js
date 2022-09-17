const router = require('express').Router();
const {ExaminationOfficer, validate} = require('../models/examOffice');
const bcrypt = require('bcrypt');

router.post('/',async(req,res)=> {
    try {
        const { error } = validate(req.body);
        
        if(error)
            return res.status(400).send({message: error.details[0].message})
        
        const examinationOfficerOne = await ExaminationOfficer.findOne({email: req.body.email});
        if(examinationOfficerOne)
            return res.status(409).send({message: "User with this email already exists"});    

        const examinationOfficerTwo = await ExaminationOfficer.findOne({username: req.body.username});
        if(examinationOfficerTwo)
            return res.status(409).send({message: "User with this username already exists"});
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new ExaminationOfficer({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "Examination Officer's account created"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});   
    }
})

module.exports = router;