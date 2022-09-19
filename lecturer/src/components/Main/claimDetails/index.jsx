import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
      <h4 className='claim-date'>Submitted on: &nbsp;&nbsp; 
        <span className='the-date'>{claim.creationDate}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        By:&nbsp;&nbsp;
        <span className='the-name'>{claim.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        Id:&nbsp;&nbsp;
        <span className='the-id'>{claim.regNumber}</span>
      </h4>
      <div className="contractdetails-space">
        <table className='contractdetails-table'>
          <tbody>
            <tr>
              <th className='details-theaders'>Course</th>
              <td className='details-tdata'>{claim.courseName}</td>
            </tr>
            <tr>
              <th className='details-theaders'>Course Code</th>
              <td className='details-tdata'>{claim.courseCode}</td>
            </tr>
            <tr>
              <th className='details-theaders'>Type</th>
              <td className='details-tdata'>{claim.type}</td>
            </tr>
            <tr>
              <th className='details-theaders'>Claim Details</th>
              <td className='details-tdata'>{claim.claimDetails}</td>
            </tr>
            <tr>
              <th className='details-theaders'>Status</th>
              <td className='details-tdata'>{claim.status}</td>
            </tr>
            <tr>
              <th className='details-theaders'>Lecturer's Comment</th>
              <td className='details-tdata'>{claim.teacherComment}</td>
            </tr>
            <tr>
              <th className='details-theaders'>Lecturer's Signature</th>
              <td className='details-tdata'>{claim.teacherSignature}</td>
            </tr>
            <tr>
              <th className='details-theaders'>Department's Comment</th>
              <td className='details-tdata'>{claim.departmentComment}</td>
            </tr>
            <tr>
              <th className='details-theaders'>Department Approval</th>
              <td className='details-tdata'>{claim.departmentApproval}</td>
            </tr>
            <tr>
              <th className='details-theaders'>Examination Officer Signature</th>
              <td className='details-tdata'>{claim.examinationOfficerSignature}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='button-space'>
        <Link to={`/update/${claim._id}`} className="details-update-link">Validate/Update</Link>
        <Link className='cancel-btn' to={'/claims'}>Back</Link>
      </div>
    </div>
  )
}

export default ClaimDetails