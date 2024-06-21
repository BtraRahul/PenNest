import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BlogSingleCard from "./home/BlogSingleCard";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get("query");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching data");
        const response = await axios.get(
          `http://localhost:5555/blogs/search?query=${query}`
        );
        console.log("hello again!");
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError(error.response?.data?.message || "Something went wrong");
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  return (
    <div className="container py-10">
      <h2 className="text-2xl my-4">Search Results for "{query}"</h2>
      {error ? (
        <p>{error}</p>
      ) : results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {results.map((result) => (
            <BlogSingleCard key={result._id} blog={result} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
