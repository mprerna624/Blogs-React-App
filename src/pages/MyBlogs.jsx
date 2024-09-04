import React, { useEffect, useState } from 'react'
import { BlogCard, Container } from '../Components'
import appwriteService from '../appwrite/configService'
import { useSelector } from 'react-redux'

function MyBlogs() {

    const userInfo = useSelector((state) => state.auth.userData);

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        appwriteService.getUserBlogs(userInfo.$id)
            .then((userBlogs) => {
                if(userBlogs) setBlogs(userBlogs.documents)
            })
    }, [])

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

export default MyBlogs