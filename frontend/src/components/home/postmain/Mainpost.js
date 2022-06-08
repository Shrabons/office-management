import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from 'react';
import './mainpost.css';

const Mainpost = () => {

    const editor = useRef(null)
	const [content, setContent] = useState('')
    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [dep, setDep] = useState('')
    const [day, setDay] = useState('')
    const [allData, setAllData] = useState([])


    const handleSubmit = async (e) =>{
        e.preventDefault()
       let {data} = await axios.post('http://localhost:5000/postmain',{
            name: name,
            time: time,
            dep: dep,
            day: day,
            despation: content
        })

        console.log(data)
    }

    useEffect(()=>{
        
        async function maindata() {

        let {data}= await axios.get('http://localhost:5000/postmain')
        setAllData(data)
        }
        maindata()
    },[])


  return (
    <div className="mainpost">
        <div className="containers">
            <div className="employee__form">
                <form action="#">
                    <div className="input__resize">
                        <div className="input__group">
                            <input type="text" placeholder='name' onChange={(e)=> setName(e.target.value)} />
                        </div>
                        <div className="input__group">
                            <input type="time" placeholder='Office Time' onChange={(e)=> setTime(e.target.value)}  />
                        </div>
                    </div>
                    <div className="input__resize2">
                        <div className="input__group">
                            <select className="section-week" name="" id="" onChange={(e)=> setDep(e.target.value)}   >
                                <option  >Department</option>
                                <option value="javascript">javascript</option>
                                <option value="php">php</option>
                            </select>
                        </div>
                        <div className="input__group">
                            <select className="section-week" name="" id="" onChange={(e)=> setDay(e.target.value)}  >
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
                    <JoditEditor
            	        ref={editor}
                        value={content}
		                tabIndex={1} 
		                onBlur={newContent => 
                        setContent(newContent)} 
                        onChange={newContent => {}}
                    />
                    
                    <button type="submit" onClick={handleSubmit} className="btn__summit">Submit</button>
                </form>
            </div>
            <div className="show__body">
                    <div className="show__heading">
                        <ul >
                            <li><h3>Name</h3></li>
                            <li><h3>Department</h3></li>
                            <li><h3>Office Time</h3></li>
                            <li><h3>Offday</h3></li>
                            <li><h3>Designation</h3></li>
                        </ul>
                    </div>
                    <div className="show__data">
                        {allData.map((item,i)=>(
                            <ul key={i} >
                                <li><span>{item.name}</span></li>
                                <li><span>{item.department}</span></li>
                                <li><span>{item.time}</span></li>
                                <li><span>{item.day}</span></li>
                                <li><span dangerouslySetInnerHTML={{ __html: item.descripation }}></span></li>
                            </ul>
                        ))}
                    </div>
                
                
            </div>
        </div>
    </div>
  )
}

export default Mainpost