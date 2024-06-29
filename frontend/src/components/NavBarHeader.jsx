import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { BiSearch } from "react-icons/bi";

const NavBarHeader = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/search?query=${searchQuery}`);
    // console.log(e.req.body);
  };

  return (
    <>
      <style>
        {`.header {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--color-primary);
            color: var(--color-secondary);
            font-size: 1.2rem;
            font-weight: 600;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
            z-index: 1000;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 80px;
            backdrop-filter: blur(50px);
          }
          .header ul {
            display: flex;
            list-style: none;
          }
          .header li {
            margin: 0 10px;
            }
            .content {
              padding-top: 40px; /* Adjust based on header height */
              }
              
  @media (max-width: 450px) {
            .header {
            font-size: 1.2rem;

              flex-direction: column;
              align-items: center;
              height: 150px;
              }
              .search{
              padding-top: 40px; 
              }
              .search-form {
              padding: 1rem;
              width: 50%;
              margin-bottom: 1rem;
            }
          }


  .search {
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.074);
    border: 1px solid rgba(255, 255, 255, 0.222);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 0.7rem;
    transition: all ease 0.3s;
 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
 
    margin-bottom: 0.5rem;
  
    margin: 0;
    letter-spacing: 0.1em;
 
    font-size: 1rem;
    font-weight: 300;

    width: 100%;
 
    margin-right: 0.2rem;
    margin-left: 0.2rem;
  }

  .search:active {
    border: 1px solid rgba(255, 255, 255, 0.454);

  }
  .search:hover {
    box-shadow: 0px 0px 20px 1px #ffbb763f;
    border: 1px solid rgba(255, 255, 255, 0.454);
          `}
      </style>

      <nav className="header">
        <h1 className="text-3xl mb-1 text-green-300">PenNest</h1>
        {/* Search */}
        <form onSubmit={handleSearch} className="flex flex-row items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search max-w-400 text-lg"
            placeholder="Search..."
            required
          />
          <button type="submit">
            <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
              <BiSearch className="text-2xl" />
            </div>
          </button>
        </form>

        <ul>
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </nav>
      <div className="content">
        {/* Placeholder for the content to ensure it is pushed below the header */}
      </div>
    </>
  );
};

export default NavBarHeader;
