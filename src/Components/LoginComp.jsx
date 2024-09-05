import React, { useState } from 'react'
import { Logo, InputBox, Button }from '../Components'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/authService';
import { useDispatch } from 'react-redux';
import {login as storeLogin} from "../store/authSlice"

function LoginComp() {

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const formSubmitHandler = async(data) => {
        setError("");
        try {
            const session = await authService.login(data);

            if(session){
                const userInfo = await authService.getCurrentUser();
                if(userInfo) dispatch(storeLogin(userInfo));
                navigate("/");
            }
        } catch (e) {
            setError(e.message);
        }
    }

  return (
    <div className='bg-gray-100 p-10 mx-auto my-10 rounded-xl max-w-lg w-full'>
        <div className='flex justify-center'>
            <Logo width='90px'/>
        </div>

        <h2 className='font-bold text-2xl mt-1 text-center'>Log in to your account.</h2>
        <p className='text-gray-600 mt-2 mb-2 text-center'>Don't have an account? <Link to='/signup' className='font-medium hover:underline'>Sign Up</Link></p>

        {error && <p className='text-center text-red-600'>{error}</p>}

        <form onSubmit={handleSubmit(formSubmitHandler)} className='w-full mt-10 flex flex-col gap-6'>
            <InputBox 
                label="Email:" 
                type='email' 
                placeholder="Enter your email" 
                {
                    ...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                        }
                    })
                }
            />

            <InputBox 
                label="Password:" 
                type='password' 
                placeholder="Enter your password" 
                {
                    ...register("password", {
                        required: true
                    })
                }
            />

            <Button type='submit'>Log In</Button>
        </form>
    </div>
  )
}

export default LoginComp