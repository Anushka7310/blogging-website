// PostCard.js
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <Link to={`/post/${post.id}`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-blue-600 hover:underline mb-2">
            {post.title}
          </h2>
          <p className="text-gray-700">{post.body}</p>
          {/* Random placeholder image (replace with actual images) */}
          <div
            className="w-full h-32 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(https://loremflickr.com/320/240?random=${post.id})` }}
          ></div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
