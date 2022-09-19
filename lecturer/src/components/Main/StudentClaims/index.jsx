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
        <table className='student-claims-table'>
          <thead>
            <tr className='student-claim-rows'>
                <th className='student-claim-theader'>Date</th>
                <th className='student-claim-theader'>Course</th>
                <th className='student-claim-theader'>Type</th>
                <th className='student-claim-theader'>Details</th>
                <th className='student-claim-theader'>Lecturer Approval</th>
                <th className='student-claim-theader'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              claims ? claims.map(claim=>(
                <tr className='student-claim-rows' key={claim._id}>
                  <td className='student-claim-tdata'>{claim.creationDate}</td>
                  <td className='student-claim-tdata'>{claim.courseName}</td>
                  <td className='student-claim-tdata'>{claim.type}</td>
                  <td className='student-claim-tdata'>{claim.claimDetails}</td>
                  <td className='student-claim-tdata'>{claim.teacherSignature}</td>
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