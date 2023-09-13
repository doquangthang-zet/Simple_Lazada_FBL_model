import React, {useEffect, useState} from 'react';

const PlaceOrder = () => {
    const [order, setOrder] = useState()
    return (
        <div className='row vh-100 d-flex justify-content-center align-items-center'>
            <div className='d-flex vw-100 justify-content-center align-items-center'>
                <button type="button" class="actionBtn editBtn m-5">ACCEPT</button>
                                    
                <button type="button" class="actionBtn deleteBtn" >REJECT</button>
            </div>
            
        </div>
    )
}
export default PlaceOrder