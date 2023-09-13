// import React, { useEffect, useState } from 'react';
// import { getProductByCate, getAllCates } from '../../api/app';
// import { NavLink, useNavigate, useParams } from 'react-router-dom';

// const CategoryPage = () => {
//     var imageBasePath = window.location.protocol+ "//" + window.location.host + "/images/";
//     const [products, setProducts] = useState([])
//     const {id} = useParams()

//     function fetchProductByCate() {
//         fetch(`http://localhost:4000/getProductByCate/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//             setProducts(data)
//         })
//     }
//     const [categories, setCategories] = useState([])
//     const [cateId, setCateId] = useState("")
//     const navigate = useNavigate()
//     function fetchCategories() {
//         getAllCates().then(res => {
//             setCategories(res.cate)
//         })
//     }
//     useEffect(() => {
//         fetchCategories()
//         fetchProductByCate()
//     }, [])

//     function handleSubmit(id) {
//         navigate(`/customer/getProductByCate/${id}`)
//         fetchProductByCate(id)
//         window.location.reload()
//     }
//     console.log(products)
//     return (
//         <div className='products'>
//             <div class="headerLazada">
//             <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
//                 <div class="container">
//                     <a class="navbar-brand col-3" href="/customer"><img src={imageBasePath + "lazada-logo.jpg"} class="logo" alt="logo" style={{width: 6.5+ 'em', height: 4 + 'em'}}/></a>
//                     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span class="navbar-toggler-icon"></span>
//                     </button>

//                     <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                         <form class="form-inline my-2 my-lg-0 w-100">
//                             <input class="form-control mr-sm-2 border-0 rounded w-100" style={{backgroundColor: "#F3F9FB"}} type="search" placeholder="Search" aria-label="Search" />
//                             {/* <button class="btn btn-outline-blue my-2 my-sm-0" type="submit">Search</button> */}
//                         </form>

//                         <div class="col-3 d-flex justify-content-center align-items-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person text-primary" viewBox="0 0 16 16">
//                                 <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
//                             </svg>
//                             Customer's Name
//                         </div>
//                         <NavLink to={'/customer/cart'} lass="col-3 d-flex justify-content-right align-items-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart text-primary" viewBox="0 0 16 16">
//                                 <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
//                             </svg>
//                             Cart
//                         </NavLink>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//             <div class = "container">
//                 <div class="row">
//                     <div class="col-md-12">
//                         <div class="homepage btn-group" role="group">
//                             {categories && categories.map(cate => (
//                                 // <NavLink to={`/customer/getProductByCate/${cate._id}`}>
//                                     <button type="button" class="btn btn-outline-info" onClick={() => handleSubmit(cate._id)}>{cate.name}
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
//                                         <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
//                                         </svg>
//                                     </button>
//                                 // </NavLink>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div class="container">
//                 <div class="row g-2">
//                     {products && products.map(item => (
//                          <div class="card col-xl-3 col-lg-3 col-md-3 col-sm-6 product-card" style={{width: 18+'rem'}}>
//                          <a class="card-block stretched-link text-decoration-none " href>
//                              <img class="card-img-top" src={imageBasePath + item.image} alt="Card image cap" />
//                              <div class="card-body">
//                                  <h5 class="card-title">{item.title}</h5>
//                                  <p class = "card-text">{item.description}</p>
//                                  <p class="card-text">{item.price}</p>
//                                  {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
//                              </div>
//                              <form action="add-to-cart" method="post">
//                                 <input type="hidden" name="id" value={item.id} />
//                                 <input type="hidden" name="name" value={item.title} />
//                                 <input type="hidden" name="price" value={item.price} />
//                                 <input type="hidden" name="categrory" value={item.category} />
//                                 <input type="hidden" name="sellerid" value={item.sellerId} />
//                                 <input type="hidden" name="quantity" value="1" />

//                                 <input type="submit" value='Add to cart' class="btn btn-primary"></input>
//                              </form>
//                          </a>
//                      </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
        
//     );
// }

// export default CategoryPage;
