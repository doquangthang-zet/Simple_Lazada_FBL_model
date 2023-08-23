import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
  return (
    <div class="d-flex justify-content-center align-items-center bg-dark vh-100">
        <div className='bg-white p-3 rounded w-25'>
            <a class="w-100 d-flex justify-content-center" href="/"><img src={imageBasePath + "lazada-logo.jpg"} class="logo" alt="logo" /></a>
            <h2>Sign-in</h2>
            <form>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter email' name='name' className='form-control rounded-0' />
                </div>

                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter password' name='name' className='form-control rounded-0' />
                </div>

                <button type='submit' className='actionBtn w-100 rounded-0 mb-3'>Sign up</button>

                <Link to="/register"><button className='actionBtn border w-100 bg-light rounded-0 text-decoration-none'>Create account</button></Link>
                <Link to="/sellerRegister"><button className='actionBtn border w-100 bg-light rounded-0 text-decoration-none'>Create seller account</button></Link>
            </form>
        </div>
    </div>
  )
}

export default Login