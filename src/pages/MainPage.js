import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

function MainPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const perPage = 8;
  const scrollToPosts = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const loadMorePosts = () => {
    setPage(page + 1);
  };

  const handleSearch = () => {
    if (searchQuery) {
      // Filter posts based on searchQuery
      const filteredPosts = blogPosts.filter((post) =>
        post.title.includes(searchQuery)
      );
      setSearchResults(filteredPosts);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_start=${
            (page - 1) * perPage
          }&_limit=${perPage}`
        );
        setBlogPosts((prevPosts) => [...prevPosts, ...response.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${"/images/hero.jpg"})` }}
      >
        <div className="h-full flex flex-col justify-center items-center text-white text-3xl">
          <p>Welcome to the Blog</p>
          <button
            onClick={scrollToPosts}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mt-4 rounded-full"
          >
            Scroll to Posts
          </button>
        </div>
      </div>

      <div className="container mx-auto p-8">
        {/* Search Input */}
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full ml-2"
          >
            Search
          </button>
        </div>

        {/* Display Search Results or Posts */}
        {searchResults.length > 0 ? (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        ) : (
          <div>
            {/* Most Popular Posts */}
            {blogPosts.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Most Popular Posts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {blogPosts.slice(0, 4).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Latest Posts */}
            {blogPosts.length > 4 && (
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {blogPosts.slice(4).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Load More Button */}
        <div className="flex justify-center">
          <button
            onClick={loadMorePosts}
            className="bg-blue-600 hover-bg-blue-700 text-white py-2 px-4 mt-4 rounded-full"
          >
            Load More
          </button>
        </div>

        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default MainPage;
