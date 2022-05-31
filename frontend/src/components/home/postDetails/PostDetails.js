import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import './postdetails.css'


const PostDetails = () => {
    
    let [name, setName] = useState("")
    let [time, setTime] = useState("")
    let [detailsup, setDetailsup] = useState("")
    let [details, setDetails] = useState([])
    let [editId, setEditId] = useState()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
   

    useEffect(()=>{
        async function postdata() {
            let {data} = await axios.get('http://localhost:5000/postdetails')
            setDetails(data)
        }
        postdata()
    },[])

    const handlePostDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:5000/postdetails/${id}`)
    }

    const handlePostEdit = async (id) => {
        setShow(true)
        let {data} = await axios.get(`http://localhost:5000/postdetails/${id}`)
        setEditId(data._id)
        setName(data.name)
        setTime(data.time)
        setDetailsup(data.details)
    }

    const handleUpData = () => {
        console.log(editId)
        axios.put(`http://localhost:5000/postdetails/${editId}`,{
            name: name,
            time: time,
            details: detailsup
        })
    }

  return (
    <div className="postdetails">
        <div className="container">
            <div className="postdetails__show">
                <div className="show__body">
                    <div className="show__heading">
                        <ul >
                            <li><h3>Name</h3></li>
                            <li><h3>Time</h3></li>
                            <li><h3>Details</h3></li>
                            <li><h3>Action</h3></li>
                        </ul>
                    </div>
                    <div className="show__data">
                    {details.map((item, i) => (
                        <ul key={i}>
                            <li><span>{item.name}</span></li>
                            <li><span>Time: {item.time} </span></li>
                            <li><span>{item.details}</span></li>
                            <li>
                                <button className="edit" type="button" onClick={()=> handlePostEdit(item._id)} >Edit</button>
                                <button className="delete" type="button" onClick={()=> handlePostDelete(item._id)} >Delete</button>
                            </li>
                        </ul>
                   
                    ))}
                    </div>
                </div>
                
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="input__resize">
                <div className="input__group">
                    <input type="text" placeholder='Activity Name' onChange={(e)=> setName(e.target.value)} value={name} />
                </div>
                <div className="input__group">
                    <input type="time" placeholder='hour take' onChange={(e)=> setTime(e.target.value)} value={time} />
                </div>
                <div className="input__group--full">
                    <textarea placeholder="Activity Details" cols="40" rows="10" onChange={(e)=> setDetailsup(e.target.value)} value={detailsup} ></textarea>
                </div>
            </div>
            <button type="submit" className="btn__summit" onClick={handleUpData} >Submit</button>
        </Modal.Body>
        
      </Modal>
    </div>
  )
}

export default PostDetails