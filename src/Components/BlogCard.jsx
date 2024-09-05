import React from 'react'
import appwriteService from '../appwrite/configService'
import { Link } from 'react-router-dom'

function BlogCard({$id, slug, featuredImage, title}) {
  return (
    <Link to={`/blog/${slug}/${$id}`}>
      <figure className='bg-slate-100 p-4 rounded-xl h-[275px]'>
        <img src={appwriteService.getFilePreview(featuredImage)} alt="Blog Image" className='w-[250px] h-5/6 rounded-xl' />
        <figcaption className='mt-4 font-bold text-xl'>{title}</figcaption>
      </figure>
    </Link>
  )
}

export default BlogCard