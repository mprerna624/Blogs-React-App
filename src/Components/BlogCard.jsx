import React, { useEffect } from 'react'
import appwriteService from '../appwrite/configService'

function BlogCard({featuredImage, title}) {
  return (
    <figure>
      <img src={appwriteService.getFilePreview(featuredImage)} alt="Blog Image" />
      <figcaption>{title}</figcaption>
    </figure>
  )
}

export default BlogCard