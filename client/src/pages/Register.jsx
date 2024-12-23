import React from 'react'
import {registerUser} from '../utils/api'
import AuthForm from '../components/AuthForm'


const Register =()=>{
    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

            try {
                const { data } = await registerUser({name,email,password});
                console.log('Registered',data);
            } catch (error) {
                console.error('Registration error', error.response.data.message)
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