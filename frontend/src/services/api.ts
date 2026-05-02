import axios from "axios";

// Create an axios instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add a request interceptor to include the JWT token
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const getUsersApi = () => {
    return instance.get("/users");
}

const createUserApi = (name: string, email: string, password?: string, role?: string) => {
    return instance.post("/users", { name, email, password, role })
}

const updateUserApi = (id: number, name: string, email: string, password?: string, role?: string) => {
    return instance.put(`/users/${id}`, { id, name, email, password, role })
}

const deleteUserApi = (id: number) => {
    return instance.delete(`/users/${id}`)
}

const loginApi = (email: string, password?: string) => {
    return instance.post("/auth/login", { email, password })
}

const getTodosApi = () => {
    return instance.get("/todos");
}

const createTodoApi = (title: string, description: string, priority: string, dueDate: string, username: string) => {
    return instance.post("/todos", { title, description, priority, dueDate, username, completed: false })
}

const updateTodoApi = (id: number, title: string, description: string, priority: string, dueDate: string, username: string, completed: boolean) => {
    return instance.put(`/todos/${id}`, { title, description, priority, dueDate, username, completed })
}

const deleteTodoApi = (id: number) => {
    return instance.delete(`/todos/${id}`)
}

export {
    getUsersApi, createUserApi, updateUserApi, deleteUserApi, loginApi,
    getTodosApi, createTodoApi, updateTodoApi, deleteTodoApi
}