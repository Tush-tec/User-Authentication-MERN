import React from 'react'
import { loginUser } from '../utils/api'
import AuthForm from '../components/AuthForm'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value
        const password = e.target.password.value

        try {
            const { data } = await loginUser({ email, password });
            localStorage.setItem('authToken', data.token);
            toast.success("Login successfull")
            navigate('/chat');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
        //    e.target.email.value =''
        //    e.target.password.value =''
    }
    return (
        <AuthForm
            title="Login"
            handleSubmit={handleSubmit}
            buttonText="Login"
            fields={[
                { name: 'email', type: 'email', placeholder: 'Enter Email' },
                { name: 'password', type: 'password', placeholder: 'Enter Password' }
            ]}
        />
    )
}

export default Login