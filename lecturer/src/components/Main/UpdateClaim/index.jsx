import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormTableOne from '../FormTableOne';
import './styles.css';

function UpdateClaim() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    regNumber:"",
    name:"",
    faculty:"",
    department:"",
    academicYear:"",
    courseName: "",
    courseCode: "",
    type:"",
    claimDetails:"",
    email:"",
    phoneNumber:"",
    status:"",
    creationDate:"",
    departmentComment:"",
    departmentApproval:"",
    teacherComment:"",
    teacherSignature:"",
    examinationOfficerSignature:""
  });

  const [error, setError] = useState("");
  
  const claimId = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/claim/findById?id=${claimId.id}`)
    .then((res) => {
      console.log(res.data);
      setFormData(res.data)
    })
    .catch(error => {
      setError(error)
    })
  },[]);
  
  const handleChange = ({currentTarget: input })=>{
    setFormData({...formData, [input.name]: input.value});
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(formData.teacherComment==="") {
      setError("Your comment is required!");
      return;
    } else if(formData.teacherComment.length < 6) {
      setError("Your comment is too short!");
      return;
    } else if(formData.teacherSignature==="Validate") {
      setError("Your signature is required");
      return;
    } else {
      try {
        const url = `http://localhost:8080/api/claim/update/${claimId}`;
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
      <h1>Update Claim</h1>
      <form className='create-form' onSubmit={handleSubmit}>
        <div className='error-message-box'>
          { error && <div className='error_msg'>{error}</div> }
        </div>
        <FormTableOne formData={formData} handleChange={handleChange}/>
        <div className='form-commands'>
          <button type='submit' className='submit-btn'>Submit</button>
          <Link className='back-btn' to={`/claim/${claimId.id}`}>Back</Link>
          <Link className='cancel-btn' to={'/claims'}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default UpdateClaim