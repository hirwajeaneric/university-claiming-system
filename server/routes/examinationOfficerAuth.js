const router = require('express').Router();
const { ExaminationOfficer } = require('../models/examOffice');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async(req, res)=> {
    try {
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message})

        const examinationOfficer = await ExaminationOfficer.findOne({username: req.body.username});
        
        if(!examinationOfficer)
            return res.status(401).send({message: "Invalid Username or Password"})

        const validPassword = await bcrypt.compare(
            req.body.password, examinationOfficer.password
        );    
        
        if(!validPassword)
            return res.status(401).send({message: "Invalid Username or Password"});
        
        const token = examinationOfficer.generateAuthToken();
        res.status(200).send({data: token, message: "Logged in Successfully"})    
        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('User Name'),
        password: Joi.string().required().label('Password')
    })
    return schema.validate(data)
}

module.exports = router;