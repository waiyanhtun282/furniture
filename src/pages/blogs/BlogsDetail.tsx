import React from 'react'
import { useParams } from 'react-router'

function BlogsDetail() {
  const {postId} =useParams();
  return (
    <div>BlogsDetail: {postId}</div>
  )
}

export default BlogsDetail