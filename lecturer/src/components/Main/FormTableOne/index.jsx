import React from 'react'

const FormTableOne = ({formData, handleChange}) => {
    return (
    <div className='form-two-sides'>
          <div className='left'>
            <table>
              <tbody>
                <tr className='update-trow'>
                  <td className='update-tdata'><label>Course Name&nbsp;&nbsp;&nbsp;</label></td>
                  <th className='update-theader'>{formData.courseName}</th>
                </tr>
                <tr className='update-trow'>
                  <td className='update-tdata'><label>Course Code&nbsp;&nbsp;&nbsp;</label></td>
                  <th className='update-theader'>{formData.courseCode}</th>
                </tr>
                <tr className='update-trow'>
                  <td className='update-tdata'><label>Type of claim&nbsp;&nbsp;&nbsp;</label></td>
                  <th className='update-theader'>{formData.type}</th>
                </tr>
                <tr className='update-trow'>
                  <td className='update-tdata'><label>Claim details&nbsp;&nbsp;&nbsp;</label></td>
                  <th className='update-theader'>{formData.claimDetails}</th>
                </tr>
                <tr className='update-trow'>
                  <td className='update-tdata'><label>Comment&nbsp;&nbsp;&nbsp;</label></td>
                  <td className='update-tdata'>
                    <textarea className='update-textarea' rows="4" cols='100' name="teacherComment" value={formData.teacherComment} placeholder="Comment" onChange={handleChange}/>
                  </td>
                </tr>
                <tr className='update-trow'>
                  <td className='update-tdata'><label>Validate/Sign&nbsp;&nbsp;&nbsp;</label></td>
                  <td className='update-tdata'>
                    <select name="teacherSignature" value={formData.teacherSignature} onChange={handleChange}>
                      <option>Validate</option>
                      <option>Approve</option>
                      <option>Reject</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default FormTableOne