import React, { useState } from 'react'
import ProfileImg from '../../images/man.png'
import Employee from './employee/Employee'
import './officemain.css'
const OfficeMain = () => {

    let [employee, setEmployee] = useState(true)
    let [todayclass, setTodayclass] = useState(false)
    let [post, setPost] = useState(false)

    const handleEmployee = () => {
        setEmployee(true)
        setTodayclass(false)
        setPost(false)
    }

    const handleClass = () => {
        setPost(false)
        setEmployee(false)
        setTodayclass(true)
    }
    const handlePost = () => {
        setEmployee(false)
        setTodayclass(false)
        setPost(true)
    }

  return (
    <div className="office">
       <div className="office__left">
           <div className="left__img">
               <img src={ProfileImg} alt="profile pic" />
           </div>
           <div className="left__content">
            <hgroup className='left__bio'>
                <h4>name: <span>shrabon Sarker</span></h4>
                <h4>Designation: <span>Frontend Developer</span></h4>
                <h4>Office Time: <span>10:00am - 5:00pm</span></h4>
                <h4>Offday: <span>sunday</span></h4>
            </hgroup>
            <nav className='office__navbar'>
                <ul>
                    <li onClick={handleEmployee}>Emplyee List</li>
                    <li onClick={handleClass}>Today’s Class</li>
                    <li onClick={handlePost}>Post Activity</li>
                    <li>Activity List</li>
                    <li>Apply for Leave</li>
                    <li>Late List</li>
                </ul>
            </nav>
               
           </div>
       </div>
       <div className="office__right">
           <div className="right__body">
               {employee ? 
                <Employee />
               : 
               ""
               }
               {todayclass ? 
                <h1>today class</h1> 
               : 
               ""
               }
               {post ? 
                <h1>post</h1> 
               : 
               ""
               }
           </div>
       </div>
    </div>
  )
}

export default OfficeMain