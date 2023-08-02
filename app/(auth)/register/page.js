"use client"

import SimpleLoader from '@/components/Loader/simpleLoader';
import RegistrationTab from '@/components/Tabs/RegistrationTab';
import { removeSymbols } from '@/lib/removeSymbols';
import { signUp } from '@/lib/signup';
import { signIn } from 'next-auth/react';
import { M_PLUS_1 } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Index = () => {
const router = useRouter();
const [ state, setState ] = useState({email: "", password : "", firstName : "", lastName : "", username: "", mobile : "", residential_address : "", business_name : ""})
const [ { loading, error }, setStatus ] = useState({ loading : false, error : null});

const handleChanges = (e) => {
    const { value, name } = e.target;

    setState(prev => ({
        ...prev, 
        [name] : value
    }));
}

const handleSubmit = async (e, userType) => {
    try {
        e.preventDefault();
        setStatus({loading : true, error : null});
        const req = await signUp({...state, user_type : userType});       

        const login = await signIn("credentials", {
            email : state.email,
            password : state.password,
            redirect : false
        });

        login.ok && router.push(userType === "buyer" ? "/dashboard" : "/vendor");
    } catch (error) {
        console.log(error)
        setStatus({ loading : false,  error : error?.response.data});
    }
}

return (
    <div className='flex min-h-screen relative font-[nunito] justify-center items-center bg-pry-300'>
        {
            loading && <SimpleLoader/>
        }
        <div className="p-8 rounded-lg shadow-lg bg-white max-w-sm">
        <div className='text-center flex justify-center pb-5'>
             <img src='/next.svg' className='h-8'/>
        </div>

        {
            error && (
                <div className='bg-red-500 rounded text-white my-2 capitalize text-sm px-4 py-2'>
                    <p>{error}</p>
                </div>
            )
        }
        <RegistrationTab
        buyer={<BuyerForm 
            handleSubmit={handleSubmit}
            state={state}
            handleChanges={handleChanges} />}
        
        seller={<SellerForm 
            handleSubmit={handleSubmit}
            state={state}
            handleChanges={handleChanges} />}/>
        </div>
    </div>
  )
}

const BuyerForm = ({handleChanges, handleSubmit, state}) => {
    return(
        <form onSubmit={(e) => handleSubmit(e, "buyer")}>
        <div className='flex gap-3'>
            <div className="form-floating mb-3">
                <input type="text" name='firstName' onChange={handleChanges} value={state.firstName}  className="form-control
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
                focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="First Name"/>
                <label for="floatingInput" className="text-gray-700">First Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name='lastName' onChange={handleChanges} value={state.lastName}  className="form-control
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
                focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="name@example.com"/>
                <label for="floatingInput" className="text-gray-700">Last Name</label>
        </div>
        </div>

        <div className="form-floating mb-3">
            <input type="text" name='username' onChange={handleChanges} value={state.username}  className="form-control
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
            focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput" className="text-gray-700">Username</label>
        </div>
        <div className="form-floating mb-3">
            <input type="email" name='email' onChange={handleChanges} value={state.email}  className="form-control
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
            focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput" className="text-gray-700">Email address</label>
        </div>

        <div className="form-floating mb-3">
            <input type="text" name='mobile' onChange={handleChanges} value={state.mobile}  className="form-control
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
            focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput" className="text-gray-700">Mobile</label>
        </div>
    <div className="form-floating mb-3">
        <input name='password' onChange={handleChanges} value={state.password} type="password" className="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="Password"/>
        <label for="floatingInput" className="text-gray-700">Password</label>
    </div>

        <button type="submit" className="
        w-full
        px-6
        py-4
        bg-pry-600
        text-white
        font-medium
        text-sm
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-pry-700 hover:shadow-lg
        focus:bg-pry-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-pry-800 active:shadow-lg
        transition
        duration-150
        ease-in-out">Register</button>
        <p className="text-gray-800 mt-6 text-center">Already have an account? <Link href="/login"
            className="text-pry-600 hover:text-pry-700 focus:text-pry-700 transition duration-200 ease-in-out">Sign in</Link>
        </p>
    </form>
    )
}

const SellerForm = ({handleChanges, handleSubmit, state}) => {
    return(
        <form onSubmit={(e) => handleSubmit(e, "vendor")}>
        <div className='flex gap-3'>
            <div className="form-floating mb-3">
                <input type="text" name='firstName' autoComplete='firstname' onChange={handleChanges} value={state.firstName}  className="form-control
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
                focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="First Name"/>
                <label for="floatingInput" className="text-gray-700">First Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name='lastName' autoComplete='lastname' onChange={handleChanges} value={state.lastName}  className="form-control
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
                focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="name@example.com"/>
                <label for="floatingInput" className="text-gray-700">Last Name</label>
        </div>
        </div>

        <div className="form-floating mb-3">
            <input type="text" name='username' onChange={handleChanges} value={state.username}  className="form-control
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
            focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput" className="text-gray-700">Username</label>
        </div>

        <div className="form-floating mb-3">
            <input type="text" name='business_name' onChange={handleChanges} value={state.business_name}  className="form-control
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
            focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput" className="text-gray-700">Business Name</label>
        </div>
        <div className="form-floating mb-3">
            <input type="email" name='email' onChange={handleChanges} value={state.email}  className="form-control
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
            focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput" className="text-gray-700">Email address</label>
        </div>

        <div className="form-floating mb-3">
            <input type="text"  name='mobile' onChange={handleChanges} value={state.mobile}  className="form-control
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
            focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput" className="text-gray-700">Mobile</label>
        </div>
    <div className="form-floating mb-3">
        <input name='password' onChange={handleChanges} value={state.password} type="password" className="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="Password"/>
        <label for="floatingInput" className="text-gray-700">Password</label>
    </div>
    <div className="form-floating mb-3">
        <input name='residential_address' onChange={handleChanges} value={state.residential_address} type="text" className="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-pry-600 focus:outline-none" id="floatingInput" placeholder="Password"/>
        <label for="floatingInput" className="text-gray-700">Residential Address</label>
    </div>

        <button type="submit" className="
        w-full
        px-6
        py-4
        bg-pry-600
        text-white
        font-medium
        text-sm
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-pry-700 hover:shadow-lg
        focus:bg-pry-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-pry-800 active:shadow-lg
        transition
        duration-150
        ease-in-out">Register</button>
        <p className="text-gray-800 mt-6 text-center">Already have an account? <Link href="/login"
            className="text-pry-600 hover:text-pry-700 focus:text-pry-700 transition duration-200 ease-in-out">Sign in</Link>
        </p>
    </form>
    )
}

export default Index;
