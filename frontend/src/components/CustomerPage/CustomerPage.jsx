import React, { useEffect } from 'react';
import { useState } from 'react';


const CustomerPage = () => {
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
    const [order, setOrders] = useState({
        productId: 0,
        title: '',
        price: 0,
        quantity: 1,
        category: '',
        sellerId: 0
    })
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch(`http://localhost:4000/product`)
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
          });
      }, []);
    
    const config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }
    const addToCart = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/addToCart", product, config)
            
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='products'>
            <div class = "container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="homepage btn-group" role="group">
                            
                            <button type="button" class="btn btn-outline-info">Groceries 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-outline-info">Fashion
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-outline-info">Beauty
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-outline-info">Electronics
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-outline-info">Home & Kitchen
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-outline-info">Home Improvement
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-outline-info">Sports, Toys & Luggage
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-outline-info">Premium Fruits
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row g-2">
                    {products && products.map(item => (
                         <div class="card col-xl-3 col-lg-3 col-md-3 col-sm-6 product-card" style={{width: 18+'rem'}}>
                         <a class="card-block stretched-link text-decoration-none " href>
                             <img class="card-img-top" src={imageBasePath + item.image} alt="Card image cap" />
                             <div class="card-body">
                                 <h5 class="card-title">{item.title}</h5>
                                 <p class="card-text">{item.price}</p>
                                 {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                             </div>
                             <form action="add-to-cart" method="post">
                                <input type="hidden" name="id" value={item.id} />
                                <input type="hidden" name="name" value={item.title} />
                                <input type="hidden" name="price" value={item.price} />
                                <input type="hidden" name="categrory" value={item.category} />
                                <input type="hidden" name="sellerid" value={item.sellerId} />
                                <input type="hidden" name="quantity" value="1" />

                                <input type="submit" value='Add to cart' class="btn btn-primary"></input>
                             </form>
                         </a>
                     </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CustomerPage;
