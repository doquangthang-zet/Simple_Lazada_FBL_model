export default function SellerCreateProduct() {
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
                <form>
                    <div class="mb-3">
                        <label for="cartegory">Choose a cartegory:  </label>
                        <select name="cartegory" id="cartegory">
                            <option value="E-devices">E-devices</option>
                            <option value="Cloth">Cloth</option>
                            <option value="Car">Car</option>
                            <option value="Toy">Toy</option>
                        </select>
                    </div>
                    

                    <div class="mb-3">
                        <label for="productName" class="form-label">Product Name</label>
                        <input type="text" class="form-control" id="productName" />
                    </div>

                    <div class="mb-3">
                        <label for="productDes" class="form-label">Product Description</label>
                        <input type="text" class="form-control" id="productDes" />
                    </div>

                    <div class="mb-3">
                        <label for="productPrice" class="form-label">Product Price</label>
                        <input type="number" class="form-control" id="productPrice" />
                    </div>

                    <div class="mb-3">
                        <label for="productImage" class="form-label">Product Image</label>
                        <input type="file" class="form-control" id="productImage" />
                    </div>

                    <div class="mb-3">
                        <label for="productLength" class="form-label">Product length</label>
                        <input type="number" class="form-control" id="productLength" placeholder="Enter length" />
                    </div>

                    <div class="mb-3">
                        <label for="productWidth" class="form-label">Product width</label>
                        <input type="number" class="form-control" id="productWidth" placeholder="Enter width" />
                    </div>

                    <div class="mb-3">
                        <label for="productHeight" class="form-label">Product height</label>
                        <input type="number" class="form-control" id="productHeight" placeholder="Enter height" />
                    </div>
                    <button type="submit" class="actionBtn">Submit</button>
                </form>
            </div>
        </div>
    )
}