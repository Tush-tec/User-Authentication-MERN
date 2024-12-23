import React from 'react';
const AuthForm = ({title,handleSubmit,buttonText,fields})=>{

    return(
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className='text-2xl font-bold text-center mb-4'>{title}</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {fields.map(({name,type,placeholder},index)=>(
                    <div key={index}>
                        <input 
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        className='w-full px-5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-blue-400'
                        required
                        />
                    </div>
                ))}
                <button
                type='submit'
                className='w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600'
                >
                    {buttonText}
                </button>
            </form>
        </div>
    )
}

export default AuthForm