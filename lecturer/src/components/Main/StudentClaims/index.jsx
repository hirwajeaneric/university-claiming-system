import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import { useState } from 'react';

const StudentClaims = ()=> {
  const [claims, setClaims] = useState([])
  const [errors, setErrors] = useState("")

  useEffect(()=>{
    const courseCode = localStorage.getItem("courseCode");
    console.log(courseCode);
    axios.get(`http://localhost:8080/api/claim/findByCourseCode?courseCode=${courseCode}`)
    .then((res) => {
      console.log(res.data);
      setClaims(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[]);

  return (
    <div className="contracts_container">
      <div className='titlebar'>
        <h1 className='titleText'>Claims</h1>
      </div>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
                <th>Date</th>
                <th>Course</th>
                <th>Type</th>
                <th>Details</th>
                <th>Lecturer Approval</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              claims ? claims.map(claim=>(
                <tr key={claim._id}>
                  <td>{claim.creationDate}</td>
                  <td>{claim.courseName}</td>
                  <td>{claim.type}</td>
                  <td>{claim.claimDetails}</td>
                  <td>{claim.teacherSignature}</td>
                  <td>{claim.status}</td>
                  <td>
                    <Link to={`/claim/${claim._id}`} className="view-link">Details</Link>
                    <Link to={`/update/${claim._id}`} className="update-link">Update</Link>
                  </td>
                </tr>
              )): errors
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentClaims