import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogPostsDetails, getAuthorInfo } from "../services/api";
import Comments from "../components/Comments";
import "./styles.css";

function BlogDetails() {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState({});
  const [author, setAuthor] = useState({});

  useEffect(() => {
    // Fetch blog post details and author information
    getBlogPostsDetails(id)
      .then((response) => {
        setBlogPost(response.data);
        // After fetching the blog post details, fetch the author info
        getAuthorInfo(response.data.userId)
          .then((authorResponse) => setAuthor(authorResponse.data[0]))
          .catch((authorError) => console.error(authorError));
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleAddToFavorites = () => {
    // Get the current favorites from local storage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Add the current blog post to the favorites
    favorites.push(blogPost);

    // Store the updated favorites in local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div className="blog-details-container">
      <h1 className="blog-title">{blogPost.title}</h1>
      <p className="blog-content">{blogPost.body}</p>
      <p>Author: {author.name}</p>
      <Comments postId={id} />
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
}

export default BlogDetails;
