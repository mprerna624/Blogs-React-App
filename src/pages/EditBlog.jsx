import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/configService';
import { Container, BlogForm } from "../Components";

function EditBlog() {

    const {blogId} = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if(blogId) {
            appwriteService.getBlog(blogId)
                .then((blogPost) => {
                    if(blogPost) setBlog(blogPost)
                })
        } else {
            navigate('/');
        }
    }, [blogId, navigate])

  return blog ? (
    <div className='flex-grow bg-gray-400'>
        <Container>
            <BlogForm blog={blog} />
        </Container>
    </div>
  ) : null
}

export default EditBlog