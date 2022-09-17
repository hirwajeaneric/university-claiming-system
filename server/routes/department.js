const router = require('express').Router();
const {DepartmentOfficer, validate} = require('../models/department');
const bcrypt = require('bcrypt');

router.post('/',async(req,res)=> {
    try {
        const { error } = validate(req.body);
        
        if(error)
            return res.status(400).send({message: error.details[0].message})

        const departmentOne = await DepartmentOfficer.findOne({email: req.body.email});
        if(departmentOne)
            return res.status(409).send({message: "User with this email already exists"});    
            
        const departmentTwo = await DepartmentOfficer.findOne({username: req.body.username});
        if(departmentTwo)
            return res.status(409).send({message: "username already exists"});
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new DepartmentOfficer({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "Head of Department account created"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});   
    }
})

module.exports = router;