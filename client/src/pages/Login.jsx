import React from 'react'
import { loginUser } from '../utils/api'
import AuthForm from '../components/AuthForm'


function Login(){

    const handleSubmit = async (e)=>{
        e.preventDefault();

       const email = e.target.email.value
       const password = e.target.password.value

       try {
           const { data } = await loginUser({email,password});
           console.log('Logged in:',data);
           
       } catch (error) {
        console.error('Login error', error.response.data.message)
       }
       e.target.email.value =''
       e.target.password.value =''
    }
    return (
    <AuthForm 
    title="Login"
    handleSubmit={handleSubmit}
    buttonText="Login"
    fields={[
        {name:'email',type:'email',placeholder:'Enter Email'},
        {name:'password',type:'password',placeholder:'Enter Password'}
    ]}
    />
    )
}

export default Login