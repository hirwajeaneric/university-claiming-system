import React from 'react'

const FormTableOne = ({formData, handleChange, departments}) => {
  
    const {informationTechnology, businessAdminitration, nursing, education, theology} = departments;

    return (
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
                        {
                            nursing.map((afaculty, key)=>
                            <option key={key}>{afaculty}</option>)
                            // switch (formData.faculty) {
                            //     case "IT":
                            //         nursing.map((afaculty, key)=>
                            //         <option key={key}>{afaculty}</option>)       
                            //         break;
                            
                            //     default:
                            //         break;
                            // }
                        }
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
  )
}

export default FormTableOne