import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import './emloyee.css'

const Employee = () => {

    let [name, setName] = useState("")
    let [time, setTime] = useState("")
    let [des, setDes] = useState("")
    let [week, setWeek] = useState("")
    let [nameUp, setNameUp] = useState("")
    let [timeUp, setTimeUp] = useState("")
    let [desUp, setDesUp] = useState("")
    let [weekUp, setWeekUp] = useState("")
    let [weekUpman, setWeekUpman] = useState({})
    let [emlopers, setEmployers] = useState([])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    

    const handleSubmmit = (e) => {
        e.preventDefault()
        console.log('send')
        axios.post('http://localhost:5000/',{
            name: name,
            time: time,
            des: des,
            week: week
        })
        setName("")
        setTime("")
        setDes("")
        setWeek("")
    }

    useEffect(()=>{
        async function employers(){
            let {data} = await axios.get('http://localhost:5000/employee')
            setEmployers(data)
           
        }
        employers()
    },[])

    const hangleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:5000/employee/${id}`)
        
    }

    const handleEditShow = async (id) => {
        setShow(true);
        const {data} = await axios.get(`http://localhost:5000/employee/${id}`)
        setWeekUpman(data)
        setNameUp(data.name)
        setTimeUp(data.time)
        setDesUp(data.designation)
        setWeekUp(data.dayoff)
        console.log(data)
    }
    
    const hangleUpdateData = (id) => {
   
        axios.put(`http://localhost:5000/employee/${id}`, {
            name: nameUp,
            time: timeUp,
            des: desUp,
            week: weekUp
        })

        setShow(false)
    }
  return (
    <div className="employee">
        <div className="containers">
            <div className="employee__form">
                <form action="#">
                    <div className="input__resize">
                        <div className="input__group">
                            <input type="text" placeholder='name' onChange={(e)=> setName(e.target.value)} value={name} />
                        </div>
                        <div className="input__group">
                            <input type="time" placeholder='Office Time' onChange={(e)=> setTime(e.target.value)} value={time} />
                        </div>
                    </div>
                    <div className="input__resize2">
                        <div className="input__group">
                            <input type="text" placeholder='Designation' onChange={(e)=> setDes(e.target.value)} value={des} />
                        </div>
                        <div className="input__group">
                            <select className="section-week" name="" id="" onChange={(e)=> setWeek(e.target.value)}  >
                                <option  >Day Off</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit" className="btn__summit" onClick={handleSubmmit}>Submit</button>
                </form>
            </div>
            <div className="employee__show">
                <div className="show__body">
                    <div className="show__heading">
                        <ul >
                            <li><h3>Name</h3></li>
                            <li><h3>Designation</h3></li>
                            <li><h3>Office Time</h3></li>
                            <li><h3>Offday</h3></li>
                            <li><h3>Action</h3></li>
                        </ul>
                    </div>
                    <div className="show__data">
                    {emlopers.map((item, index)=>(
                        <ul key={index}>
                            <li><span>{item.name}</span></li>
                            <li><span>{item.designation}</span></li>
                            <li><span>{item.time}</span></li>
                            <li><span>{item.dayoff}</span></li>
                            <li>
                                <button className="edit" type="button" onClick={()=>handleEditShow(item._id)} >Edit</button>
                                <button className="delete" type="button" onClick={()=> hangleDelete(item._id)}>Delete</button>
                            </li>
                        </ul>
                    ))}
                    <div className="edit__model">
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title> Update Data</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                        
                                <div className="input__resize">
                                    <div className="input__group">
                                        <input type="text" placeholder='name' onChange={(e)=> setNameUp(e.target.value)} value={nameUp} />
                                    </div>
                                    <div className="input__group">
                                        <input type="time" placeholder='Office Time' onChange={(e)=> setTimeUp(e.target.value)} value={timeUp} />
                                    </div>
                                </div>
                                <div className="input__resize2">
                                    <div className="input__group">
                                        <input type="text" placeholder='Designation' onChange={(e)=> setDesUp(e.target.value) } value={desUp}/>
                                    </div>
                                    <div className="input__group">
                                        <select className="section-week" name="" id="" onChange={(e)=> setWeekUp(e.target.value)} value={weekUp}>
                                            <option >Day Off</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <button type="submit" className="btn__summit" onClick={()=>hangleUpdateData(weekUpman._id)} >Submit</button>
                          
                            </Modal.Body>
                           
                        </Modal>
                    </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Employee