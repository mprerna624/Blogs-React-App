import React from 'react'
import { BlogForm, Container } from '../Components'

function AddBlog() {
  return (
    <div className='flex-grow bg-gray-400'>
        <Container>
            <BlogForm />
        </Container>
    </div>
  )
}

export default AddBlog