/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import CaretLeft from "../assets/icons/CaretLeft";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link to={destination}>
        <Button variant="secondary" size="icon">
          <CaretLeft className="" />
        </Button>
      </Link>
    </div>
  );
};

export default BackButton;
