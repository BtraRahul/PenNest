/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete, MdReport } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";

const DropdownMenu = ({ blogId, blogAuthor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.email === blogAuthor) {
      setIsAuthor(true);
    }
  }, [blogAuthor]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="inline-block text-left relative">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-20 rounded-md border shadow-sm px-4 py-2 bg-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Actions
          <svg
            className={`-mr-1 ml-2 h-5 w-5 transform ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {isAuthor ? (
              <>
                <Link
                  to={`/blogs/edit/${blogId}`}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  tabIndex="-1"
                >
                  <AiOutlineEdit className="mr-2 text-3xl text-yellow-600" />
                  Edit
                </Link>
                <Link
                  to={`/blogs/delete/${blogId}`}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  tabIndex="-1"
                >
                  <MdOutlineDelete className="mr-2 text-3xl text-red-800" />
                  Delete
                </Link>
              </>
            ) : (
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                tabIndex="-1"
                onClick={() => alert("Report this post")}
              >
                <MdReport className="text-2xl text-red-600" />
                Report
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
