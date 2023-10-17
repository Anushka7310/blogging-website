// favorites.js

// Function to add a post to favorites
export const addFavorite = (postId) => {
    const favorites = getFavourites();
    if (!favorites.includes(postId)) {
      favorites.push(postId);
      setFavorites(favorites);
    }
  };
  
  // Function to check if a post is in favorites
  export const isFavorite = (postId) => {
    const favorites = getFavourites();
    return favorites.includes(postId);
  };
  
  // Function to remove a post from favorites
  export const removeFavorite = (postId) => {
    const favorites = getFavourites();
    const updatedFavorites = favorites.filter((id) => id !== postId);
    setFavorites(updatedFavorites);
  };
  
  // Helper function to get favorites from local storage
  export const getFavourites = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
  };
  
  // Helper function to set favorites in local storage
  const setFavorites = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  