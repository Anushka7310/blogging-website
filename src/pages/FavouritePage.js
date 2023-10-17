import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { isFavorite, getFavourites, removeFavorite } from "../utils/favorites";

function Favorites() {
  const favorites = getFavourites();
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    // Fetch favorite posts based on the post IDs in the favorites list
    const fetchFavoritePosts = async () => {
      const favoritePostPromises = favorites.map(async (postId) => {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
          const author = await axios.get(`https://jsonplaceholder.typicode.com/users?id=${response.data.userId}`);
          return { post: response.data, author: author.data[0] };
        } catch (error) {
          console.error("Error fetching post:", error);
          return null;
        }
      });

      const favoritePostsData = await Promise.all(favoritePostPromises);
      setFavoritePosts(favoritePostsData.filter((post) => post !== null));
    };

    fetchFavoritePosts();
  }, []);

  const handleRemoveFavorite = (postId) => {
    removeFavorite(String(postId));
    setFavoritePosts(favoritePosts.filter((favorite) => favorite.post.id !== postId));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Favorite Blogs</h1>
      <Link to="/" className="block text-blue-500 hover:underline mb-4">
        Back to Main Page
      </Link>
      <ul className="space-y-4">
        {favoritePosts.map((favorite) => (
          <li key={favorite.post.id} className="bg-white rounded-lg shadow-lg p-4">
            <Link to={`/post/${favorite.post.id}`}>
              <h3 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
                Title: {favorite.post.title}
              </h3>
              <p>Author: {favorite.author.name}</p>
            </Link>
            <button
              onClick={() => handleRemoveFavorite(favorite.post.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-full mt-2"
            >
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
