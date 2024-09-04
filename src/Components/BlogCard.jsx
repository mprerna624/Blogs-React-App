import React, { useEffect } from 'react'
import appwriteService from '../appwrite/configService'
import { Link } from 'react-router-dom'

function BlogCard({$id, slug, featuredImage, title}) {
  return (
    <Link to={`/blog/${slug}/${$id}`}>
      <figure>
        <img src={appwriteService.getFilePreview(featuredImage)} alt="Blog Image" />
        <figcaption>{title}</figcaption>
      </figure>
    </Link>
  )
}

export default BlogCard