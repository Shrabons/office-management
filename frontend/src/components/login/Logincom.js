import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css'

const logincom = () => {

   
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        let {data} = await axios.post('http://localhost:5000/login',{
            email: email,
            password: password
        })
        console.log(data)
    }


  return (
    <>
        <div className="login">
            <div className="login__head">
                <hgroup>
                    <h2>Sign-up</h2>
                </hgroup>
            </div>
            <div className="login__form">
                <form action="#">
                   
                    <div className="form__group">
                        <label htmlFor="useremail">Email</label>
                        <input type="email"  id="useremail" placeholder='Enter the email' onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                    <div className="form__group">
                        <label htmlFor="password">Password</label>
                        <input type="password"  id="password" placeholder='Enter the password' onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    <button className="btn__login" onClick={handleLogin} type="submit" >Login</button>
                    
                </form>
                <div className="account">
                    <p>Do not have a account  <Link to="/signup">SignUp</Link> </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default logincom