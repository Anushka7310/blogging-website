import React, { useEffect, useState } from "react";
import "./styles.css";

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Retrieve favorites from local storage
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  const handleRemoveFromFavourites = (postId) => {
    // Remove the selected post from favorites
    const updatedFavourites = favourites.filter((post) => post.id !== postId);
    setFavourites(updatedFavourites);

    // Update local storage with the updated list of favorites
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div className="favorites-container">
      <h1>Favorites Page</h1>
      <ul>
        {favourites.map((post) => (
          <li key={post.id} className="favorite-post">
            {post.title} - {post.author}
            <button
              onClick={() => handleRemoveFromFavourites(post.id)}
              className="favourite-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favourites;
