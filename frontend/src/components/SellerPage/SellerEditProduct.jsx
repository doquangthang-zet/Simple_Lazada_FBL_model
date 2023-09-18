import axios from "axios";
import { React, useEffect, useState } from "react"
import { getAllCates, getOneCate, getOneProduct, saveNewProduct, updateProduct } from "../../api/app";
import { useNavigate, useParams } from "react-router-dom";

export default function SellerEditProduct() {
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
    const params = useParams();
    const [id, setId] = useState(params.sellerId)
    const [productId, setProductId] = useState(params.id)
    const [categories, setCategories] = useState([])
    const [productProperties, setProductProperties] = useState({})
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({
        title: '',
        description: '',
        image: "",
        price: 0,
        length: 0,
        width: 0,
        height: 0,
        category: '',
    })
    const navigate = useNavigate()

    useEffect(() => {
        fetchCategories()
        getOneProduct(productId).then(res => {
            setProduct({
                title: res[0].title,
                description: res[0].description,
                image: res[0].image,
                price: res[0].price,
                length: res[0].length,
                width: res[0].width,
                height: res[0].height,
                category: res[0].category,
                properties: JSON.parse(res[0].properties),
              });
        })
    }, []);

    // Get all categories
    function fetchCategories() {
        getAllCates().then(res => {
          setCategories(res.cate)
        })
    }

    // Handle editting changes
    const handleChange = ({ currentTarget: input }) => {
        setProduct( { ...product, [input.name]: input.value });
    };

    // Save new product information
    const saveProduct = async (e) => {
        e.preventDefault();
        updateProduct(productId, product)
        navigate(`/seller/${id}/products`);
    }

    // Get all ancestor properties to edit
    const propertiesToFill = []
    if (categories.length > 0 && product.category) {
        let selCate = categories.find(({_id}) => _id === product.category)
        propertiesToFill.push(...selCate.properties)

        while(selCate?.parent?._id) {
            const parentCate = categories.find(({_id}) => _id === selCate?.parent?._id)
            propertiesToFill.push(...parentCate.properties)
            selCate = parentCate;
        }
    }
    
    // Save properties to product infor
    function setProductProps(propName, value) {
        setProductProperties(prev => {
            const newProductProps = {...prev};
            newProductProps[propName] = value;
            setProduct({...product, ["properties"]: newProductProps })
            return newProductProps
        });
    }

    return (
        <div className="products">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="titlepage">
                            <h2>New Product</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="inputForm">
                <form onSubmit={saveProduct}>
                    <div class="mb-3">
                        <label for="category">Choose a cartegory:  </label>
                        <select name="category" id="category" value={product.category} onChange={handleChange}>
                            <option value="">Un-categorized</option>
                            {categories.length > 0 && categories.map(cate => (
                                <option value={cate._id}>{cate.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    {propertiesToFill.length > 0 && propertiesToFill.map( p => (
                        <div>
                            <div>{p.name}</div>
                            <input 
                                type={p.type} 
                                name={p.name} 
                                id={p.name} 
                                required={p.required === "true" ? true : false} 
                                value={product.properties[p.name]} 
                                onChange={ev => 
                                    setProductProps(p.name, ev.target.value)
                                } 
                            />
                        </div>
                    ))}

                    <div class="mb-3">
                        <label for="title" class="form-label">Product Name</label>
                        <input type="text" class="form-control" id="title" name='title' value={product.title} onChange={handleChange} />
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Product Description</label>
                        <input type="text" class="form-control" id="description" name='description' value={product.description} onChange={handleChange} />
                    </div>

                    <div class="mb-3">
                        <label for="price" class="form-label">Product Price</label>
                        <input type="number" class="form-control" id="price" name='price' value={product.price} onChange={handleChange} />
                    </div>

                    <div class="mb-3">
                        <label for="productImage" class="form-label">Product Image</label>
                        <input type="file" class="form-control" id="productImage" name="image" onChange={e => setProduct({...product, [e.target.name]: e.target.files[0] })} required={true} />
                    </div>

                    <div class="mb-3">
                        <label for="length" class="form-label">Product length</label>
                        <input type="number" class="form-control" id="length" placeholder="Enter length" name='length' value={product.length} onChange={handleChange} />
                    </div>

                    <div class="mb-3">
                        <label for="width" class="form-label">Product width</label>
                        <input type="number" class="form-control" id="width" placeholder="Enter width" name='width' value={product.width} onChange={handleChange} />
                    </div>

                    <div class="mb-3">
                        <label for="height" class="form-label">Product height</label>
                        <input type="number" class="form-control" id="height" placeholder="Enter height" name='height' value={product.height} onChange={handleChange} />
                    </div>

                    <button type="submit" class="actionBtn">Submit</button>
                </form>
            </div>
        </div>
    )
}