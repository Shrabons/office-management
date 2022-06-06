import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'

const logincom = () => {
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
                        <input type="email"  id="useremail" placeholder='Enter the email' />
                    </div>
                    <div className="form__group">
                        <label htmlFor="password">Password</label>
                        <input type="password"  id="password" placeholder='Enter the password' />
                    </div>
                    <button className="btn__login" type="submit" >Login</button>
                    
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