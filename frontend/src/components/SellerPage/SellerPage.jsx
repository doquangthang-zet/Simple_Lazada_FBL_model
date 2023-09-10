import { useEffect, useState } from "react";
import SideBar from "../Layout/SideBar";
import { useParams } from "react-router-dom";

export default function SellerPage() {
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
    const [products, setProducts] = useState([])
    const params = useParams();

    useEffect(() => {
        console.log(params)
        fetch(`http://localhost:4000/product/${params.sellerId}`)
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
          });
      }, []);

    return (
        <div className="products">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="titlepage">
                            <h2>Our Products</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row g-2">
                    {products && products.map(pro => (
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                            <div class="d-flex flex-column product-card">
                                <div class="d-flex justify-content-center align-items-center bg-light">
                                    <img class="product-img" src={imageBasePath + pro.image} />
                                </div>

                                <div class="text-center">
                                    <h5>{pro.title}</h5>
                                    <p>${pro.price}</p>
                                </div>
                            </div> 
                        </div>
                    ))}
                </div>
            </div>

        </div>  
    )
}