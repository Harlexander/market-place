"use client";

import Link from 'next/link';
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import SimpleLoader from '@/components/Loader/simpleLoader';
import { useRouter } from 'next/navigation';

const Login = () => {

const router = useRouter();
const [ {email, password, error, loading }, setState ] = useState({email: "", password : "", error : "", loading : false});

const handleChanges = (e) => {
    const { value, name } = e.target;

    setState(prev => ({
        ...prev, 
        [name] : value
    }));
}

const handleSubmit = async (e) => {
    e.preventDefault();
    setState(prev => ({
        ...prev, 
        loading : true
    }))

    const login = await signIn("credentials", {
        email : email,
        password : password,
        redirect : false
    });

    if(login.error) {setState(prev => ({
        ...prev, 
        error : login.error,
        loading : false
    }))}else{
        router.push("/dashboard")
    }
}

return (
    <div className='flex min-h-screen font-[nunito] justify-center items-center bg-blue-300'>
        {
            loading && <SimpleLoader/>
        }
        <div className="p-8 rounded-lg shadow-lg bg-white max-w-sm">
        <div className='text-center flex justify-center pb-5'>
             <img src='/next.svg' className='h-8'/>
        </div>
        <form onSubmit={handleSubmit}>
            {
                error && (
                    <div className='bg-red-500 rounded text-white my-2 capitalize text-sm px-4 py-2'>
                        <p>{error}</p>
                    </div>
                )
            }
            <div className="form-floating mb-3">
            <input type="email" name='email' onChange={handleChanges} value={email}  className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput" className="text-gray-700">Email address</label>
        </div>
        <div className="form-floating mb-3">
            <input name='password' onChange={handleChanges} value={password} type="password" className="form-control
           block
           w-full
           px-3
           py-1.5
           text-base
           font-normal
           text-gray-700
           bg-white bg-clip-padding
           border border-solid border-gray-300
           rounded
           transition
           ease-in-out
           m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="Password"/>
            <label for="floatingInput" className="text-gray-700">Password</label>
        </div>
            <div className="flex justify-between flex-wrap  gap-4 items-center mb-6">
            <div className="form-group form-check">
                <input type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck2"/>
                <label className="form-check-label inline-block text-gray-800" for="exampleCheck2">Remember me</label>
            </div>
            <a href="#!"
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Forgot
                password?</a>
            </div>
            <button type="submit" className="
            w-full
            px-6
            py-4
            bg-blue-600
            text-white
            font-medium
            text-sm
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition
            duration-150
            ease-in-out">Sign in</button>
            <p className="text-gray-800 mt-6 text-center">Don&apos;t have an account? <Link href="/register"
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Register</Link>
            </p>
        </form>
        </div>
    </div>
  )
}


export default Login