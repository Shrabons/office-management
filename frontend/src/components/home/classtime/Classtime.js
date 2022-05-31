import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import './classtime.css'

const Classtime = () => {

    let [batch, setBatch] = useState("")
    let [time, setTime] = useState("")
    let [room, setRomm] = useState("")
    let [upbatch, setUPBatch] = useState("")
    let [uptime, setUPTime] = useState("")
    let [uproom, setUPRomm] = useState("")
    let [upid, setUpid] = useState("")
    let [classShow, setClassShow] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    

    
    const handleClassTimeSub = (e) => {
        e.preventDefault()
        console.log('classtime post')
        axios.post('http://localhost:5000/classtime',{
            batch: batch,
            time: time,
            room: room
        })
    }

    useEffect(()=>{
       async function classitmedata (){

            let {data} = await axios.get('http://localhost:5000/classDetails')
            setClassShow(data)
            
        }
        classitmedata ()
    },[])


    const hendleClassDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:5000/classDetails/${id}`)
    }

    const handleUpadteData = async (id) => {
        setShow(true)
        let {data} = await axios.get(`http://localhost:5000/classDetails/${id}`)
        setUpid(data)
        setUPBatch(data.batch)
        setUPTime(data.time)
        setUPRomm(data.room)
    }

    const handleEdit = (id) => {
        axios.put(`http://localhost:5000/classDetails/${id}`,{
            batch: upbatch,
            time: uptime,
            room: uproom
        })
        console.log(upid)
    }
    console.log()
  return (
    <div className="classtime">
        <div className="container">
            <div className="classtime__form">
                <form action="#">
                    <div className="input__resize">
                        <div className="input__group">
                            <input type="text" placeholder='Batch' onChange={(e)=> setBatch(e.target.value)} />
                        </div>
                        <div className="input__group">
                            <input type="time" placeholder=' Time' onChange={(e)=> setTime(e.target.value)} />
                        </div>
                        <div className="input__group--full">
                            <input type="text" placeholder='room' onChange={(e)=> setRomm(e.target.value)}  />
                        </div>
                    </div>
                    <button type="submit" className="btn__summit" onClick={handleClassTimeSub}>Submit</button>
                </form>
            </div>
            <div className="classtime__show">
                <div className="show__body">
                    <div className="show__heading">
                        <ul >
                            <li><h3>Batch Name</h3></li>
                            <li><h3>Time</h3></li>
                            <li><h3>Room</h3></li>
                            <li><h3>Action</h3></li>
                        </ul>
                    </div>
                    <div className="show__data">
                    {classShow.map((item, i)=>(
                        <ul key={i}>
                            <li><span>{item.batch.toUpperCase()}</span></li>
                            <li><span>Time: {item.time} </span></li>
                            <li><span>{item.room}</span></li>
                            <li>
                                <button className="edit" type="button" onClick={()=>handleUpadteData(item._id)} >Edit</button>
                                <button className="delete" type="button" onClick={()=> hendleClassDelete(item._id)} >Delete</button>
                            </li>
                        </ul>
                    ))}

                    </div>
                </div>
                
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Class Time Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="input__resize">
                <div className="input__group">
                    <input type="text" placeholder='Batch' onChange={(e)=> setUPBatch(e.target.value)} value={upbatch} />
                </div>
                <div className="input__group">
                    <input type="time" placeholder=' Time' onChange={(e)=> setUPTime(e.target.value)} value={uptime} />
                </div>
                <div className="input__group--full">
                    <input type="text" placeholder='room' onChange={(e)=> setUPRomm(e.target.value)} value={uproom} />
                </div>
            </div>
            <button type="submit" className="btn__summit" onClick={()=>handleEdit(upid._id)} >Submit</button>
            </Modal.Body>
        
        </Modal>
    </div>
  )
}

export default Classtime