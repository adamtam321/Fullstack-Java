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

const getTodosApi = () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/todos`;
    return axios.get(url);
}

const createTodoApi = (title: string, description: string, priority: string, dueDate: string, username: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/todos`;
    return axios.post(url, { title, description, priority, dueDate, username, completed: false })
}

const updateTodoApi = (id: number, title: string, description: string, priority: string, dueDate: string, username: string, completed: boolean) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/todos/${id}`;
    return axios.put(url, { title, description, priority, dueDate, username, completed })
}

const deleteTodoApi = (id: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/todos/${id}`;
    return axios.delete(url)
}

export {
    getUsersApi, createUserApi, updateUserApi, deleteUserApi, loginApi,
    getTodosApi, createTodoApi, updateTodoApi, deleteTodoApi
}