import React, { useEffect, useState } from 'react'
import { Button, Container } from '../Components'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/configService';
import parse from "html-react-parser";

function Blog() {

    const userInfo = useSelector((state) => state.auth.userData);
    const { blogId } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if(blogId) {
            appwriteService.getBlog(blogId)
                .then((blogPost) => {
                    if(blogPost) setBlog(blogPost)
                    else navigate('/');
                })
        } else {
            navigate('/');
        }
    }, [blogId, navigate])

    const isBlogAuthor = blog && userInfo ? (blog.userId === userInfo.$id) : false ;

    const deleteBlogPost = () => {
       appwriteService.deleteBlog(blog.$id).then((isBlogDeleted) => {
            if(isBlogDeleted) {
                appwriteService.deleteFile(blog.featuredImage);
                navigate('/');
            }
        })
    }


  return blog ? (
    <div className='flex-grow bg-gray-400'>
        <Container>
            <div className='py-8 relative'>

                {
                    isBlogAuthor && (
                        <div className="flex justify-between gap-4 absolute right-0">
                            <Link to={`/edit-blog/${blog.slug}/${blog.$id}`}>
                                <Button bgColor='bg-green-500' className='px-4 py-2'>Edit</Button>
                            </Link>
                            <Button bgColor='bg-red-500' className='px-4 py-2' onClick={deleteBlogPost}>Delete</Button>
                        </div>
                    )
                }
                

                <img src={appwriteService.getFilePreview(blog.featuredImage)} alt={blog.slug} className='w-80 mx-auto rounded-xl' />
                <h1 className='mt-8 font-bold text-3xl text-center text-orange-700'>{blog.title}</h1>
                <div className='mt-4 mb-8 mx-auto w-4/5 flex flex-col gap-4'>{parse(blog.content)}</div>
            </div>
        </Container>
    </div>
  ) : null
}

export default Blog