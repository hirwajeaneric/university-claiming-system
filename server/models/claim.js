const mongoose = require('mongoose');
const Joi = require('joi');

const ClaimSchema = new mongoose.Schema({
    regNumber: { type: String, required: true },
    name: { type: String, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    academicYear: { type: String, required: true },
    courseName: { type: String, required: true },
    courseCode: { type: String, required: true },
    type: { type: String, required: true},
    claimDetails: { type: String, required: false },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: { type: String, required: true },
    creationDate: { type: String, required: true },
    departmentComment: { type: String, required: true },
    departmentApproval: { type: String, required: true },
    teacherComment: { type: String, required: true },
    teacherSignature: { type: String, required: true },
    examinationOfficerSignature: { type: String, required: true }
});

const Claim = mongoose.model('claim', ClaimSchema);
module.exports = Claim;