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

    const deleteBlogPost = async() => {
        const status =  await appwriteService.deleteBlog(blog.$id);
        if(status) {
            await appwriteService.deleteFile(blog.featuredImage);
            navigate('/');
        }
    }


  return blog ? (
    <div className='flex-grow bg-gray-400'>
        <Container>
            <div>

                {
                    isBlogAuthor && (
                        <div className="flex justify-between">
                            <Link to={`/edit-blog/${blog.slug}/${blog.$id}`}>
                                <Button bgColor='bg-green-500'>Edit</Button>
                            </Link>
                            <Button bgColor='bg-red-500' onClick={deleteBlogPost}>Delete</Button>
                        </div>
                    )
                }
                

                <img src={appwriteService.getFilePreview(blog.featuredImage)} alt="Blog Image" />
                <h1>{blog.title}</h1>
                <div>{parse(blog.content)}</div>
            </div>
        </Container>
    </div>
  ) : null
}

export default Blog