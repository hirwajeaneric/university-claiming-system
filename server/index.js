require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');

const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth');
const createLecturerRoutes = require('./routes/lecturer');
const authLecturerRoutes = require('./routes/lecturerAuth');
const createHeadOfDepartmentRoutes = require('./routes/department');
const authHeadOfDepartmentRoutes = require('./routes/departmentAuth');
const createExaminationRoutes = require('./routes/examinationOfficer');
const authExaminationRoutes = require('./routes/examinationOfficerAuth');
const claimingRoutes = require('./routes/claim');

//dabase connection
connection();

//middleware
app.use(express.json())
app.use(cors());

//routes
app.use('/student/signup', studentRoutes);
app.use('/student/login', authRoutes);
app.use('/lecturer/signup', createLecturerRoutes);
app.use('/lecturer/login', authLecturerRoutes);
app.use('/head-of-department/signup', createHeadOfDepartmentRoutes);
app.use('/head-of-department/login', authHeadOfDepartmentRoutes);
app.use('/examination-officer/signup', createExaminationRoutes);
app.use('/examination-officer/login', authExaminationRoutes);
app.use('/api/claim/', claimingRoutes);

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));