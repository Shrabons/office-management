import axios from 'axios'
import React, { useState } from 'react'
import './post.css'

const Post = () => {
    
    let [name, setName] = useState("")
    let [time, setTime] = useState("")
    let [details, setDetails] = useState("")


    const handlePostSubmit = async (e) => {
        e.preventDefault()
        console.log("post sub mit")
        let {data} = await axios.post('http://localhost:5000/post',{
            name:name,
            time:time,
            details: details
        })

        
    }


  return (
    <div className="post">
        <div className="container">
            <div className="post__form">
                <form action="#">
                    <div className="input__resize">
                        <div className="input__group">
                            <input type="text" placeholder='Activity Name' onChange={(e)=> setName(e.target.value)}  />
                        </div>
                        <div className="input__group">
                            <input type="time" placeholder='hour take' onChange={(e)=> setTime(e.target.value)}  />
                        </div>
                        <div className="input__group--full">
                            <textarea placeholder="Activity Details" cols="40" rows="10" onChange={(e)=> setDetails(e.target.value)}  ></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn__summit" onClick={handlePostSubmit} >Submit</button>
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default Post