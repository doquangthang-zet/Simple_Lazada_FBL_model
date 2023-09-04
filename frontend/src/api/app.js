import axios from "axios";

const baseUrl = "http://localhost:4000/";

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