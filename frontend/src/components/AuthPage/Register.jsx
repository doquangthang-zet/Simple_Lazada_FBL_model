import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        role: 'customer',
        email: '',
        password: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:4000/register', values)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate("/login")
            } else {
                alert(res.data.Error)
            }
        })
    }

  return (
    <div class="d-flex justify-content-center align-items-center bg-dark vh-100">
        <div className='bg-white p-3 rounded w-25'>
            <a class="w-100 d-flex justify-content-center" href="/"><img src={imageBasePath + "lazada-logo.jpg"} class="logo" alt="logo" /></a>
            <h2>Sign-up</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input type='text' placeholder='Enter name' name='name' className='form-control rounded-0'
                    onChange={e => setValues({...values, name: e.target.value})} />
                </div>

                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter email' name='name' className='form-control rounded-0'
                    onChange={e => setValues({...values, email: e.target.value})} />
                </div>

                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter password' name='name' className='form-control rounded-0'
                    onChange={e => setValues({...values, password: e.target.value})} />
                </div>

                <button type='submit' className='actionBtn w-100 rounded-0 mb-3'>Sign up</button>

                <Link to="/login"><button className='actionBtn border w-100 bg-light rounded-0 text-decoration-none'>Login</button></Link>
                <Link to="/sellerRegister"><button className='actionBtn border w-100 bg-light rounded-0 text-decoration-none'>Create seller account</button></Link>
                <Link to="/adminRegister"><button className='actionBtn border w-100 bg-light rounded-0 text-decoration-none'>Create admin account</button></Link>
            </form>
        </div>
    </div>
  )
}

export default Register