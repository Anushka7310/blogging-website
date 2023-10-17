import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { addFavorite, isFavorite, removeFavorite } from "../utils/favorites";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [isFavorited, setIsFavorited] = useState(isFavorite(postId));
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch the blog post
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
        // Fetch the author
        axios
          .get(`https://jsonplaceholder.typicode.com/users?id=${response.data.userId}`)
          .then((authorResponse) => {
            setAuthor(authorResponse.data[0]);
          });
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });

    // Fetch comments for the blog post
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((commentsResponse) => {
        setComments(commentsResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [postId]);

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFavorite(postId);
    } else {
      addFavorite(postId);
    }
    setIsFavorited(!isFavorited);
  };

  if (!post || !author) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg relative">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Main Page
        </Link>

        <hr className="my-6" />

        <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Author: {author.name}</h3>
          <p>Email: {author.email}</p>
        </div>
        <p className="text-gray-700">{post.body}</p>

        <button
          onClick={handleFavoriteToggle}
          className={`px-6 py-3 rounded-full absolute top-4 right-4 ${
            isFavorited
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {isFavorited ? (
           <div className="flex items-center">
              <FontAwesomeIcon icon={faHeart} />
              <span className="hidden sm:block sm:ml-2"> Remove From Favorites</span>  
            </div>
          ) : (
            <div className="flex items-center">
              <FontAwesomeIcon icon={faHeartRegular} className="" /> 
              <span className="hidden sm:block sm:ml-2"> Add to Favorites</span>            </div>
          )}
        </button>
        <hr className="my-6" />

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Comments</h3>
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id}>
                <h4 className="text-lg font-semibold">{comment.name}</h4>
                <p>{comment.body}</p>
                <hr className="my-6" />

              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
