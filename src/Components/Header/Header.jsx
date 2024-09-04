import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {Logo, Container, Button, LogoutBtn} from '../index'
import { Link } from 'react-router-dom';

function Header() {

    const isUserLoggedIn = useSelector( (state) => state.auth.isLoggedIn );

    const [toggleBtnOpen, setToggleBtnOpen] = useState(false);

    const handleClick = () => {
        setToggleBtnOpen(!toggleBtnOpen);
    }

  return (
    <header className='w-full bg-gray-500 py-5 shadow-md'>
        <Container className='md:flex md:justify-between md:items-center relative'>
            <div>
                <Link to="#" className='flex'>
                    <Logo width='60px'/>
                    <span className='ml-4 mt-2 font-bold text-xl min-[375px]:text-2xl'>WriteWise</span>
                </Link>
            </div>

            <button 
                className='outline-0 border-none cursor-pointer rounded-md bg-blue-600 text-white text-4xl leading-none px-2 pb-[6px] absolute top-0 right-0 md:hidden' 
                onClick={handleClick}>
                    &#8801;   {/* Hamburger Icon Menu Button */}
            </button>


            <nav className={`${toggleBtnOpen ? "visible h-auto" : "invisible h-0"} md:visible md:h-auto `}>
                <ul className={`text-center md:flex`}>
                    <li className='m-2'><Link to="/">Home</Link></li>

                    {
                        !isUserLoggedIn ? (
                            <>
                                <li className='m-2'><Link to="/login">Login</Link></li>
                                <li className='m-2'><Link to="/signup">Signup</Link></li>
                            </>
                        ) : (
                            <>
                                <li className='m-2'><Link to="/my-blogs">My Blogs</Link></li>
                                <li className='m-2'><Link to="/">Add Blog</Link></li>
                                <li className="m-2"><LogoutBtn /></li>
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