import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './signup.css'

const Signupcom = () => {

    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [cpassword, setCpassword] = useState("")
    let [err, setErr] = useState("")
    let [errusername, setErrusername] = useState("")
    let [erremail, setErremail] = useState("")
    let [errpassword, setErrpassword] = useState("")
    let [errcpassword, setErrcpassword] = useState("")


    const handleSignUp = async (e) => {
        
        e.preventDefault()
        setErr("")
        setErrusername("")
        setErrusername("")
        setErrpassword("")
        setErrcpassword("")
        if(!username && !email && !password && !cpassword) {
            setErr('Please Not a all field Value !')
        }else if(!username) {
            setErrusername("Please NOt a username !")
        }else if(!email) {
            setErremail("Please NOt a  email !")
        }else if(!password) {
            setErrpassword("Please NOt a password !")
        }else if(!cpassword) {
            setErrcpassword("Please NOt a confiram password !")
        }else if(password.length <= 6 || cpassword.length <= 6) {
            setErr("Please must Be 6 chrecaters !")
        }else if (password !== cpassword) {
            setErr("Your password not a mash !")
        }else {
            useEffect(()=>{
                let {data} = await axios.post('http://localhost:5000/signup',{
                username: username,
                email: email,
                password: password,
                cpassword: cpassword

                })
                setErremail(data)
                setUsername("")
                setEmail("")
                setPassword("")
                setCpassword("")
            },[])
           
        }
    }

  return (
    <>
        <div className="signup">
            <div className="signup__head">
                <hgroup>
                    <h1>office Management software</h1>
                    <h2>Sign-up</h2>
                </hgroup>
            </div>
            <div className="signup__form">
                <form action="#">
                    <div className="form__group">
                        <label htmlFor="username">username</label>
                        <input value={username} style={ errusername.includes('username')? errorBorder : null || err.includes('all')? errorBorder : null} type="text"  id="username"  placeholder='Enter the user name' onChange={(e) => setUsername(e.target.value)} />
                        {errusername? <p className="text-danger mt-2 mb-0">{errusername}</p> : ""}
                    </div>
                    <div className="form__group">
                        <label htmlFor="useremail">Email</label>
                        <input value={email} style={ erremail.includes('email')? errorBorder : null || err.includes('all')? errorBorder : null} type="email"  id="useremail" placeholder='Enter the email' onChange={(e) => setEmail(e.target.value)} />
                        {erremail? <p className="text-danger mt-2 mb-0">{erremail}</p> : ""}
                    </div>
                    <div className="form__group">
                        <label htmlFor="password">Password</label>
                        <input value={password} style={ errpassword.includes('password')? errorBorder : null || err.includes('all')? errorBorder : null} type="password"  id="password" placeholder='Enter the password' onChange={(e) => setPassword(e.target.value)} />
                        {errpassword? <p className="text-danger mt-2 mb-0">{errpassword}</p> : ""}
                    </div>
                    <div className="form__group">
                        <label htmlFor="c">Confiram Password</label>
                        <input value={cpassword} style={ errcpassword.includes('confiram')? errorBorder : null || err.includes('all')? errorBorder : null} type="password"  id="c" placeholder='Enter the confiram password' onChange={(e) => setCpassword(e.target.value)} />
                        {errcpassword? <p className="text-danger mt-2 mb-0">{errcpassword}</p> : ""}
                    </div>
                    {err? 
                        <p className="text-danger mt-2 mb-0">{err}</p>
                    :
                    
                    ""
                    }
                    
                    <button className="btn__signup" type="submit"  onClick={handleSignUp} >Signup</button>
                </form>
                <div className="account">
                    <p>You have a account  <Link to="/login">Login</Link> </p>
                </div>
            </div>
        </div>
    </>
  )
}

const errorBorder = {
    border: "2px solid red"
}

export default Signupcom