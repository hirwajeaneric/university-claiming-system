import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function CreateClaim() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  
  useEffect(()=>{
    const presetData = {
      regNumber: localStorage.getItem('id'),
      name: localStorage.getItem('name')
    }

    const claimData = {
      faculty:"",
      department:"",
      courseName: "",
      courseCode: "",
      academicYear:"",
      type:"",
      claimDetails:"",
      email:"",
      phoneNumber:"",
      status: "Pending"
    }

    var combinedFormData = Object.assign(claimData, presetData);

    setFormData(combinedFormData);
  }, [])

  const handleChange = ({currentTarget: input })=>{
    setFormData({...formData, [input.name]: input.value});
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(formData.email==="" || formData.email.length < 5) {
      setError("Your email address is required!");
      return;
    } else if(formData.faculty==="Choose Faculty") {
      setError("Your faculty is required!");
      return;
    } else if(formData.department==="Choose Department") {
      setError("Your department is required!");
      return;
    } else if(formData.courseName==="") {
      setError("Course name is required!");
      return;
    } else if(formData.courseCode==="") {
      setError("Course code is required!");
      return;
    } else if(formData.academicYear==="") {
      setError("Academic year is required!");
      return;
    } else if(formData.type==="Choose Type") {
      setError("Type of claim is required!");
      return;
    } else if(formData.claimDetails==="") {
      setError("Claiming details are required!");
      return;
    } else if(formData.phoneNumber==="") {
      setError("Phone number is required!");
      return;
    } else {
      try {
        const url = "http://localhost:8080/api/claim/new";
        const { data: res } = await axios.post(url, formData);
        const claim = res;
        if(claim)
          navigate(`/success`);
      } catch (error) {
          if(
              error.response &&
              error.response.status >= 400 && 
              error.response.status <= 500
          ){
              setError(error.response.data.message);
          }
      }
    }
}

  return (
    <div className='form-container'>
      <h1>Create a Claim</h1>
      <form className='create-form' onSubmit={handleSubmit}>
        <div className='error-message-box'>
          { error && <div className='error_msg'>{error}</div> }
        </div>
        <div className='form-two-sides'>
          <div className='left'>
            <table>
              <tbody>
                <tr>
                  <td><label>Faculty</label></td>
                  <td>
                    <select value={formData.faculty} name="faculty" onChange={handleChange}>
                      <option>Choose Faculty</option>
                      <option>IT</option>
                      <option>Business Administration</option>
                      <option>Nursing</option>
                      <option>Education</option>
                      <option>Theology</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label>Department</label></td>
                  <td>
                    <select name="department" value={formData.department} onChange={handleChange}>
                      <option>Choose Department</option>
                      <option>Software Engineering</option>
                      <option>Networking and telecommunication</option>
                      <option>Information Management</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label>Course Name</label></td>
                  <td>
                    <input type={"text"} name="courseName" value={formData.courseName} placeholder="Course Name" onChange={handleChange}/>
                  </td>
                </tr>
                <tr>
                  <td><label>Course Code</label></td>
                  <td>
                    <input type={"text"} name="courseCode" value={formData.courseCode} placeholder="Course Code" onChange={handleChange}/>
                  </td>
                </tr>
                <tr>
                  <td><label>Accademic Year</label></td>
                  <td>
                    <input type={"text"} name="academicYear" value={formData.academicYear} placeholder="Academic year" onChange={handleChange}/>
                  </td>
                </tr>
              </tbody>  
            </table>
          </div>
          <div className='right'>
            <table>
              <tbody>
                <tr>
                  <td><label>Type of claim</label></td>
                  <td>
                    <select name="type" value={formData.type} onChange={handleChange}>
                      <option>Choose Type</option>
                      <option>Marks</option>
                      <option>Make up</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label>Claim Details</label></td>
                  <td>
                    <textarea rows="5" name="claimDetails" value={formData.claimDetails} placeholder="Claim Details" onChange={handleChange}/>
                  </td>
                </tr>
                <tr>
                  <td><label>Email</label></td>
                  <td>
                    <input type={"email"} name="email" value={formData.email} placeholder="example@gmail.com" onChange={handleChange}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Phone Number</label>
                  </td>
                  <td>
                    <input type={"tel"} name="phoneNumber" value={formData.phoneNumber} placeholder="+xxx xxx xxx xxx" onChange={handleChange}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='form-commands'>
          <button type='submit' className='submit-btn'>Submit</button>
          <Link className='cancel-btn' to={'/claims'}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default CreateClaim