import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {Logo, Container, Button} from '../index'

function Header() {

    const isUserLoggedIn = useSelector( (state) => state.auth.isLoggedIn );

    const [toggleBtnOpen, setToggleBtnOpen] = useState(false);

    const handleClick = () => {
        setToggleBtnOpen(!toggleBtnOpen);
    }

  return (
    <header className='w-full bg-slate-500 py-5 shadow-md'>
        <Container className='md:flex md:justify-between md:items-center relative'>
            <div>
                <a href="#" className='flex'>
                    <Logo />
                    <span className='ml-4 font-bold text-xl min-[375px]:text-2xl'>Blog React App</span>
                </a>
            </div>

            <button 
                className='outline-0 border-none cursor-pointer rounded-md bg-blue-600 text-white text-4xl leading-none px-2 pb-[6px] absolute top-0 right-0 md:hidden' 
                onClick={handleClick}>
                    &#8801;   {/* Hamburger Icon Menu Button */}
            </button>


            <nav className={`${toggleBtnOpen ? "visible h-auto" : "invisible h-0"} md:visible md:h-auto `}>
                <ul className={`text-center md:flex`}>
                    <li className='m-2'><a href="">Home</a></li>

                    {
                        !isUserLoggedIn ? (
                            <>
                                <li className='m-2'><a href="">Login</a></li>
                                <li className='m-2'><a href="">Signup</a></li>
                            </>
                        ) : (
                            <>
                                <li className='m-2'><a href="">My Posts</a></li>
                                <li className='m-2'><a href="">Add Post</a></li>
                                <li className='m-2'><a href="">Logout</a></li>
                            </>
                        )
                    }
                    
                </ul>
            </nav>

            
        </Container>
    </header>
  )
}
export default Header