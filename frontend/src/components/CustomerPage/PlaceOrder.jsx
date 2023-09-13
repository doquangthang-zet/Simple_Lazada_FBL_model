import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';

const PlaceOrder = () => {
    const navigate = useNavigate()
    useEffect(() => {
        getUser()
    }, [])
    function getUser() {
        axios.get("http://localhost:4000")
        .then(res => {
            if(res.data.Status !== "Success") {
                navigate("/login")
            }
        })
    }
    
    return (
        <div className='row vh-100 d-flex justify-content-center align-items-center'>
            <Header />
            <div className='d-flex vw-100 justify-content-center align-items-center'>
                <button type="button" class="actionBtn editBtn m-5">ACCEPT</button>
                                    
                <button type="button" class="actionBtn deleteBtn" >REJECT</button>
            </div>
            
        </div>
    )
}
export default PlaceOrder