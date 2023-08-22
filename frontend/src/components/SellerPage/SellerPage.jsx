import SideBar from "../Layout/SideBar";

export default function SellerPage() {
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
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
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <div class="d-flex flex-column product-card">
                            <div class="d-flex justify-content-center align-items-center bg-light">
                                <img class="product-img" src={imageBasePath + "lazada-logo.jpg"} />
                            </div>

                            <div class="text-center">
                                <h5>Lazada Logo</h5>
                                <p>$100</p>
                            </div>
                        </div> 
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <div class="d-flex flex-column product-card">
                            <div class="d-flex justify-content-center align-items-center bg-light">
                                <img class="product-img" src={imageBasePath + "logo512.png"} />
                            </div>

                            <div class="text-center">
                                <h5>Lazada Logo</h5>
                                <p>$100</p>
                            </div>
                        </div> 
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <div class="d-flex flex-column product-card">
                            <div class="d-flex justify-content-center align-items-center bg-light">
                                <img class="product-img" src={imageBasePath + "logo512.png"} />
                            </div>

                            <div class="text-center">
                                <h5>Lazada Logo</h5>
                                <p>$100</p>
                            </div>
                        </div> 
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <div class="d-flex flex-column product-card">
                            <div class="d-flex justify-content-center align-items-center bg-light">
                                <img class="product-img" src={imageBasePath + "logo512.png"} />
                            </div>

                            <div class="text-center">
                                <h5>Lazada Logo</h5>
                                <p>$100</p>
                            </div>
                        </div> 
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <div class="d-flex flex-column product-card">
                            <div class="d-flex justify-content-center align-items-center bg-light">
                                <img class="product-img" src={imageBasePath + "logo512.png"} />
                            </div>

                            <div class="text-center">
                                <h5>Lazada Logo</h5>
                                <p>$100</p>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>

        </div>  
    )
}