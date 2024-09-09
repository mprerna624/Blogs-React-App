import React, { useEffect, useState } from 'react'
import { BlogCard, Container } from '../Components'
import appwriteService from '../appwrite/configService'
import { useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'

export const userBlogsLoader = async({params}) => {
    const userId = params.userId;
    const userBlogs = await appwriteService.getUserBlogs(userId);
    if(userBlogs) return userBlogs.documents;
    return [];
}

function MyBlogs() {

    // const userInfo = useSelector((state) => state.auth.userData);

    // const [blogs, setBlogs] = useState([]);

    // useEffect(() => {
    //     // appwriteService.getUserBlogs(userInfo.$id)
    //     //     .then((userBlogs) => {
    //     //         if(userBlogs) setBlogs(userBlogs.documents)
    //     //     })
    // }, [userInfo.$id])

    const blogs = useLoaderData();

  return blogs.length === 0 ? (
    <div className="flex-grow bg-gray-400 flex items-center">
        <Container>
            <div className='flex flex-col justify-center items-center text-center py-8'>
                <h1 className='font-bold text-4xl'>Welcome to our Blogs App - WriteWise!</h1>
                <p className='m-6 font-semibold text-xl italic leading-9'>
                    Looks like there are <span className='text-orange-700'>no posts</span> here. <br /> And feel free to add some of your own creative blogs📝
                </p>
            </div>
        </Container>
    </div>
  ) : (
    <div className='flex-grow bg-gray-400'>
        <Container>
            <div className="py-8 flex flex-wrap gap-5">
                {
                    blogs.map((eachBlog) => <BlogCard key={eachBlog.$id} {...eachBlog} />)
                }
            </div>
        </Container>
    </div>
  )
}

export default MyBlogs