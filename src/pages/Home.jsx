import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/configService';
import { useSelector } from 'react-redux';
import { BlogCard, Container } from '../Components';

function Home() {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        appwriteService.getActiveBlogs()
            .then((activeBlogs) => {
                if(activeBlogs) setBlogs(activeBlogs.documents)
        })
    }, []);

    const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if(!isUserLoggedIn) {
        return (
            <div className='flex-grow bg-gray-400 flex items-center'>
                <Container>
                    <div className='flex flex-col justify-center items-center text-center'>
                        <h1 className='font-bold text-4xl'>Welcome to our Blogs App - WriteWise!</h1>
                        <p className='m-6 font-semibold text-xl italic leading-9'>Login and explore some blogs of your interest. <br /> And feel free to add some of your own creative blogs📝</p>
                    </div>
                </Container>
            </div>
        )
    } else {
     if(blogs.length === 0) {
        return (
            <div className='flex-grow bg-gray-400 flex items-center'>
                <Container>
                    <div className='flex flex-col justify-center items-center text-center'>
                        <h1 className='font-bold text-4xl'>Welcome to our Blogs App - WriteWise!</h1>
                        <p className='m-6 font-semibold text-xl italic leading-9'>Looks like there are no posts here. <br /> And feel free to add some of your own creative blogs📝</p>
                    </div>
                </Container>
            </div>
        )
     }   
    }

  return (
    <div className='flex-grow bg-gray-400'>
        <Container>
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                {
                    blogs.map((eachBlog) => <BlogCard key={eachBlog.$id} {...eachBlog} />)
                }
            </div>
        </Container>
    </div>
  )
}

export default Home