import React from "react";
import PropTypes from "prop-types";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

function DarkMode({ extraClasses }) {
  const [dark, setDark] = React.useState(true); // Set the initial state to true

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className={extraClasses}>
      <button onClick={() => darkModeHandler()}>
        {dark && <IoSunny />}
        {!dark && <IoMoon />}
      </button>
    </div>
  );
}

DarkMode.propTypes = {
  extraClasses: PropTypes.string,
};

export default DarkMode;
