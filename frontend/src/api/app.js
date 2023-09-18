import axios from "axios";

const baseUrl = "http://localhost:4000/";

// Categories part
// Get all categories
export const getAllCates = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/category/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
}

// Crate new category
export const saveNewCate = async (data) => {
    try {
        const res = axios.post(`${baseUrl}api/category/save`, {...data});
        return (await res).data.savedCate;
    } catch (error) {
        return null;
    }
}

// Get one cate by id
export const getOneCate = async (cateId) => {
    try {
        const res = await axios.get(`${baseUrl}api/category/getOne/${cateId}`);
        return res.data;
    } catch (error) {
        return null;
    }
}

// Edit category
export const updateCategory = async (cateId, data) => {
    try {
        const res = axios.put(`${baseUrl}api/category/update/${cateId}`, {...data});
        return (await res).data.savedCate;
    } catch (error) {
        return null;
    }
}

// Delete catefory
export const deleteCateById = async (cateId) => {
    try {
        const res = axios.delete(`${baseUrl}api/category/delete/${cateId}`);
        return res
    } catch (error) {
        return null;
    }
}

// Product part
// Get all products
export const getAllProducts = async (sellerId) => {
    try {
        const res =  axios.get(`${baseUrl}product/${sellerId}`);
        return await res;
    } catch (error) {
        return null;
    }
}

// Save new product
export const saveNewProduct = async (data) => {
    try {
        const res = axios.post(`${baseUrl}createProduct`, {...data});
        return (await res).data;
    } catch (error) {
        return null;
    }
}

//Delete product
export const deleteProductById = async (proId) => {
    try {
        const res = await axios.delete("http://localhost:4000/deleteProduct/" + proId);
        return res
    } catch (error) {
        return null;
    }
}

// Get one product
export const getOneProduct = async (proId) => {
    try {
        const res = await axios.get(`${baseUrl}getOneProduct/${proId}`);
        return res.data;
    } catch (error) {
        return null;
    }
}


//Edit product
export const updateProduct = async (proId, data) => {
    try {
        const res = axios.put(`${baseUrl}editProduct/${proId}`, {...data}, {headers: {
            "Content-Type": "multipart/form-data"
        }});
        return (await res).data;
    } catch (error) {
        return null;
    }
}

// CART PART
// Delete cart items
export const deleteCartItemsByID = async (itemId) => {
    try {
        const res = await axios.delete("http://localhost:4000/deleteCartItems/" + itemId);
        return res
    } catch (error) {
        return null;
    }
}

// Save new cart items
export const saveNewCartItem = async (data) => {
    try {
        const res = axios.post(`${baseUrl}addToCart`, {...data});
        return (await res).data;
    } catch (error) {
        return null;
    }
}

// Get one cart item
export const getOneCartItems = async (userId, proId) => {
    try {
        const res = await axios.get(`${baseUrl}getOneCartItem`, {params: {userId: userId, proId: proId}});
        return res.data;
    } catch (error) {
        return null;
    }
}

// Edit cart item
export const updateCartItem = async (itemId, data) => {
    try {
        const res = axios.put(`${baseUrl}editCartItem/${itemId}`, {...data});
        return (await res).data;
    } catch (error) {
        return null;
    }
}

// Check valid quantity in cart
export const checkQuantity = async (userId) => {
    try {
        const res = axios.put(`${baseUrl}checkQuantity/${userId}`);
        return (await res).data;
    } catch (error) {
        return null;
    }
}

//Order
// delete order
export const deleteOrderByID = async (userId) => {
    try {
        const res = await axios.delete("http://localhost:4000/deleteOrder/" + userId);
        return res
    } catch (error) {
        return null;
    }
}