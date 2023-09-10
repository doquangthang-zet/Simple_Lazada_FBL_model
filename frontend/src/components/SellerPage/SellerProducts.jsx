import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { deleteProductById, getAllCates, getAllProducts, getOneCate } from "../../api/app";
import { withSwal } from 'react-sweetalert2';

function SellerProducts ({swal}, sellerId) {
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
    const params = useParams();
    const [products, setProducts] = useState([])

    const [categories, setCategories] = useState([])

    const [msg, setMsg] = useState('')
    const [id, setId] = useState(params.sellerId)

    useEffect(() => {
        // console.log(params.id)
        getUser()
        getAllProducts(id).then(res => {
            setProducts(res.data)
        })
        fetchCategories()
    }, []);

    function getUser() {
        axios.get("http://localhost:4000")
        .then(res => {
            if(res.data.Status === "Success") {
                setId(res.data.id)
            } else {
                setMsg(res.data.Error)
            }
        })
        .then(err => console.log(err))
    }

    function fetchCategories() {
        getAllCates().then(res => {
          setCategories(res.cate)
        })
    }

    const handleDelete = (pro) => {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${pro.title}`,
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Yes, Delete!",
            reverseButtons: true,
            confirmButtonColor: '#d55',
          }).then(result => {
            if (result.isConfirmed) {
                deleteProductById(pro.id)
                window.location.reload();
            }
              console.log({result})
          });
      }

    return (
        <div className="products">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="titlepage">
                            <h2>Product's Table</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Image</th>
                            <th scope="col">Length</th>
                            <th scope="col">Width</th>
                            <th scope="col">Height</th>
                            <th scope="col">Category</th>
                            <th scope="col">Properties</th>
                            <th scope="col">Seller ID</th>
                            <th scope="col">Create At</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map(pro => (
                            <tr>
                                <th scope="row">{pro.id}</th>
                                <td>{pro.title}</td>
                                <td>{pro.description}</td>
                                <td>{pro.price}</td>
                                <td><img src={imageBasePath + pro.image} className="proImage" alt="" /></td>
                                <td>{pro.length}</td>
                                <td>{pro.width}</td>
                                <td>{pro.height}</td>
                                <td>{categories && categories.filter(cate => cate._id == pro.category).map(cate => (cate.name))}</td>
                                <td>{pro.properties}</td>
                                <td>{pro.sellerId}</td>
                                <td>{pro.createdAt}</td>
                                <td>
                                    <NavLink to={`/seller/${id}/editProduct/${pro.id}`}>
                                        <button type="button" class="actionBtn editBtn">Edit</button>
                                    </NavLink>
                                    
                                    <button type="button" class="actionBtn deleteBtn" onClick={() => handleDelete(pro)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <NavLink to={`/seller/${id}/newProduct`}>
                <button type="button" class="actionBtn">Create</button>
            </NavLink>
        </div>  
    )
}

export default withSwal (({swal}, ref) => (
    <SellerProducts swal={swal} />
  ))