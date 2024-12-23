import React from 'react'
import {registerUser} from '../utils/api'
import AuthForm from '../components/AuthForm'
import {toast} from 'react-toastify'

const Register =()=>{
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

            try {
                const { data } = await registerUser({name,email,password});
                toast.success('Registration successfull Please login.');
                window.location.href= '/login'
                
            } catch (error) {
                toast.error(error.response?.data?.message || 'Registration failed')
            }
    }

    return (
        <AuthForm 
        title="Register"
        handleSubmit={handleSubmit}
        buttonText="Register"
        fields={[
            {name:'name',type:"text",placeholder:"Enter Name"},
            {name:"email",type:"email",placeholder:"Enter Email"},
            {name:"password",type:"password",placeholder:"Enter Password"}
        ]}
        />
    );
};

export default Register;