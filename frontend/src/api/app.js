import axios from "axios";

const baseUrl = "http://localhost:4000/";

// Categories part
export const getAllCates = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/category/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const saveNewCate = async (data) => {
    try {
        const res = axios.post(`${baseUrl}api/category/save`, {...data});
        return (await res).data.savedCate;
    } catch (error) {
        return null;
    }
}

export const getOneCate = async (cateId) => {
    try {
        const res = await axios.get(`${baseUrl}api/category/getOne/${cateId}`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const updateCategory = async (cateId, data) => {
    try {
        const res = axios.put(`${baseUrl}api/category/update/${cateId}`, {...data});
        return (await res).data.savedCate;
    } catch (error) {
        return null;
    }
}

export const deleteCateById = async (cateId) => {
    try {
        const res = axios.delete(`${baseUrl}api/category/delete/${cateId}`);
        return res
    } catch (error) {
        return null;
    }
}

// Product part
export const saveNewProduct = async (data) => {
    try {
        const res = axios.post(`${baseUrl}createProduct`, {...data});
        return (await res).data;
    } catch (error) {
        return null;
    }
}

export const deleteProductById = async (proId) => {
    try {
        const res = await axios.delete("http://localhost:4000/deleteProduct/" + proId);
        return res
    } catch (error) {
        return null;
    }
}

export const getOneProduct = async (proId) => {
    try {
        const res = await axios.get(`${baseUrl}getOneProduct/${proId}`);
        return res.data;
    } catch (error) {
        return null;
    }
}

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

export const deleteCartItemsByID = async (itemId) => {
    try {
        const res = await axios.delete("http://localhost:4000/deleteOrder/" + itemId);
        return res
    } catch (error) {
        return null;
    }
}

export const saveNewCartItem = async (data) => {
    try {
        const res = axios.post(`${baseUrl}addToCart`, {...data});
        return (await res).data;
    } catch (error) {
        return null;
    }
}


export const getProductByCate = async (cateId) => {
    try {
        const res = await axios.get(`${baseUrl}getProductByCate/${cateId}`)
        return res.data;
    } catch (error) {
        return null;
    }
}