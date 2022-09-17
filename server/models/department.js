const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const { json } = require('express');

const departmentSchema = new mongoose.Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

departmentSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this.id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"})
    return token
};

const Department = mongoose.model('department', departmentSchema);

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('User Name'),
        name: Joi.string().required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password')
    })
    return schema.validate(data)
}

module.exports = {Department, validate}