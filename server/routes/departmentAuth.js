const router = require('express').Router();
const { DepartmentOfficer } = require('../models/department');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async(req, res)=> {
    try {
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message})

        const departmentOfficer = await DepartmentOfficer.findOne({username: req.body.username});
        
        if(!departmentOfficer)
            return res.status(401).send({message: "Invalid Username or Password"})

        const validPassword = await bcrypt.compare(
            req.body.password, departmentOfficer.password
        );    
        
        if(!validPassword)
            return res.status(401).send({message: "Invalid Username or Password"});
        
        const token = departmentOfficer.generateAuthToken();
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