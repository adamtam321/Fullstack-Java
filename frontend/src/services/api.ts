import axios from "axios";

// Enable sending cookies across domains for session-based auth
axios.defaults.withCredentials = true;

const getUsersApi = () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users`;
    return axios.get(url);
}

const createUserApi = (name: string, email: string, password?: string, role?: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users`;
    return axios.post(url, { name, email, password, role })
}

const updateUserApi = (id: number, name: string, email: string, password?: string, role?: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users/${id}`;
    return axios.put(url, { id, name, email, password, role })
}

const deleteUserApi = (id: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users/${id}`;
    return axios.delete(url)
}

const loginApi = (email: string, password?: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
    return axios.post(url, { email, password })
}

export {
    getUsersApi, createUserApi, updateUserApi, deleteUserApi, loginApi
}