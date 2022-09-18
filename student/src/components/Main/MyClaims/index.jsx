import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import { useState } from 'react';

const MyClaims = ()=> {
  const [claims, setClaims] = useState([])
  const [errors, setErrors] = useState("")

  useEffect(()=>{
    const regNo = localStorage.getItem("id");
    console.log(regNo);
    axios.get(`http://localhost:8080/api/claim/findByRegNumber?regNumber=${regNo}`)
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
        <h1 className='titleText'>My Claims</h1>
        <Link className='new_contract_link' to={'/new-claim'}>New</Link>
      </div>
      {/* <div className='success_message_box'>
        <p className='success_msg'>Error Message Here</p>
      </div> */}
      <div className='table-container'>
        <table>
          <thead>
            <tr>
                <th>Date</th>
                <th>Course</th>
                <th>Type</th>
                <th>Lecturer Approval</th>
                <th>Department Approval</th>
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
                  <td>{claim.teacherSignature}</td>
                  <td>{claim.departmentApproval}</td>
                  <td>{claim.status}</td>
                  <td>
                    <Link to={`/claim/${claim._id}`} className="view-link">Details</Link>
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

export default MyClaims