import React, { useEffect, useState } from "react";
import { getBlogPostsDetails } from "../services/api";
import "./styles.css";

function Main() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    getBlogPostsDetails()
      .then((response) => setBlogPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="main-container">
      <h1>Main Page</h1>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id} className="blog-post">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
