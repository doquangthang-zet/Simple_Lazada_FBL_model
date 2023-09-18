import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';
import { deleteOrderByID } from '../../api/app';

const PlaceOrder = () => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState(
        JSON.parse(sessionStorage.getItem("user")).id
    );

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

    // Accept delivery order and update to database
    async function acceptDelivery (uId) {
        try {
            const res = axios.put(`http://localhost:4000/acceptOrder/${uId}`);
            deleteOrderByID(uId).then(res => alert("Your order is accepted!"))
            navigate("/")
            return (await res).data;
        } catch (error) {
            return null;
        }
    }

    // Reject delivery order and update to database
    async function rejectDelivery (uId) {
        try {
            const res = axios.put(`http://localhost:4000/rejectOrder/${uId}`);
            deleteOrderByID(uId).then(res => alert("Your order is rejected!"))
            navigate("/")
            return (await res).data;
        } catch (error) {
            return null;
        }
    }
    
    return (
        <div className='row vh-100 d-flex justify-content-center align-items-center'>
            <Header />
            <div className='d-flex vw-100 justify-content-center align-items-center'>
                <button type="button" class="actionBtn editBtn m-5" onClick={() => acceptDelivery(userId)}>ACCEPT</button>
                                    
                <button type="button" class="actionBtn deleteBtn" onClick={() => rejectDelivery(userId)}>REJECT</button>
            </div>
            
        </div>
    )
}
export default PlaceOrder