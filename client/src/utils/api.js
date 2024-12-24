import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:5000/api"})

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('authToken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export const registerUser = (userData) => API.post('/auth/register',userData)
export const loginUser = (userData)=> API.post('auth/login',userData)