import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {Logo, Container, Button, LogoutBtn} from '../index'
import { Link } from 'react-router-dom';

function Header() {

    const isUserLoggedIn = useSelector( (state) => state.auth.isLoggedIn );
    const userInfo = useSelector((state) => state.auth.userData);

    const [toggleBtnOpen, setToggleBtnOpen] = useState(false);

    const handleClick = () => {
        setToggleBtnOpen(!toggleBtnOpen);
    }

  return (
    <header className='w-full bg-gray-500 py-5 shadow-md'>
        <Container className='md:flex md:justify-between md:items-center relative'>
            <div>
                <Link to="/" className='flex'>
                    <Logo width='60px' className='mix-blend-overlay' />
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
                    <li className='px-6 py-2 hover:rounded-full hover:bg-slate-100 '><Link to="/">Home</Link></li>

                    {
                        !isUserLoggedIn ? (
                            <>
                                <li className='px-6 py-2 hover:rounded-full hover:bg-slate-100 '><Link to="/login">Login</Link></li>
                                <li className='px-6 py-2 hover:rounded-full hover:bg-slate-100 '><Link to="/signup">Signup</Link></li>
                            </>
                        ) : (
                            <>
                                <li className='px-6 py-2 hover:rounded-full hover:bg-slate-100 '><Link to={`/my-blogs/${userInfo.$id}`}>My Blogs</Link></li>
                                <li className='px-6 py-2 hover:rounded-full hover:bg-slate-100 '><Link to="/add-blog">Add Blog</Link></li>
                                <li className="px-6 py-2 hover:rounded-full hover:bg-slate-100 "><LogoutBtn /></li>
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