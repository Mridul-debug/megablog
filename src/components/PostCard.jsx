import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="w-full mb-4 overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard
