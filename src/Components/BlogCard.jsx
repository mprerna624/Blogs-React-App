import React, { useEffect } from 'react'
import appwriteService from '../appwrite/configService'

function BlogCard({featuredImage, title}) {
  return (
    <div>
        <div>
            <img src={appwriteService.getFilePreview(featuredImage)} alt="Blog Featured Image" />
        </div>
        <h2>{title}</h2>
    </div>
  )
}

export default BlogCard