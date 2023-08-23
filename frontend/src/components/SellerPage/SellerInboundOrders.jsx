export default function SellerInboundOrders() {
    return (
        <div className="products">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="titlepage">
                            <h2>Inbound Orders</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div>
            <form>
                <div class="mb-3">
                    <label for="product" class="form-label">Product</label>
                    <input type="text" class="form-control" id="product" />
                </div>
                <div class="mb-3">
                    <label for="quantity" class="form-label">Quantity</label>
                    <input type="number" class="form-control" id="quantity" placeholder="Enter quantity" />
                </div>
                <button type="submit" class="actionBtn">Submit</button>
            </form>
            </div>
        </div>
    )
}