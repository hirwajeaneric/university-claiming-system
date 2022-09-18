import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles.css';

const ClaimDetails = () => {

  const claimId = useParams();

  const [claim, setClaim] = useState({})
  const [errors, setErrors] = useState("")

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/claim/findById?id=${claimId.id}`)
    .then((res) => {
      console.log(res.data);
      setClaim(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[]);


  return (
    <div className='contractdetails-container'>
      <h2>Claim Details</h2>
      <h3 className='contract-date'>Claim submitted on: &nbsp;&nbsp; 
        <span className='the-date'>{claim.creationDate}</span>
      </h3>
      <div className="contractdetails-space">
        <table className='contractdetails-table'>
          <tr>
            <th>Academic Year</th>
            <td>{claim.academicYear}</td>
          </tr>
          <tr>
            <th>Course</th>
            <td>{claim.courseName}</td>
          </tr>
          <tr>
            <th>Course Code</th>
            <td>{claim.courseCode}</td>
          </tr>
          <tr>
            <th>Type</th>
            <td>{claim.type}</td>
          </tr>
          <tr>
            <th>Claim Details</th>
            <td>{claim.claimDetails}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{claim.status}</td>
          </tr>
          <tr>
            <th>Lecturer's Comment</th>
            <td>{claim.teacherComment}</td>
          </tr>
          <tr>
            <th>Lecturer's Signature</th>
            <td>{claim.teacherSignature}</td>
          </tr>
          <tr>
            <th>Department's Comment</th>
            <td>{claim.departmentComment}</td>
          </tr>
          <tr>
            <th>Department Approval</th>
            <td>{claim.departmentApproval}</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default ClaimDetails