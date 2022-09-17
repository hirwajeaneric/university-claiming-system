const router = require('express').Router();
const { Lecturer } = require('../models/lecturer');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async(req, res)=> {
    try {
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message})
    
        const lecturer = await Lecturer.findOne({email: req.body.email});
        if(!lecturer)
            return res.status(401).send({message: "Invalid Username or Password"})

        const validPassword = await bcrypt.compare(
            req.body.password, lecturer.password
        );    

        if(!validPassword)
            return res.status(401).send({message: "Invalid Username or Password"});
            
        const token = lecturer.generateAuthToken();
        res.status(200).send({data: token, message: "Logged in Successfully"})    
        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    })
    return schema.validate(data)
}

module.exports = router;