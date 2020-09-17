import React from "react";
import "./Card.css";

const Card = ({ image, deg, positionX, positionY, value, suit }) => {
  return (
    <img
      className="Card"
      style={{
        transform: `rotate(${deg}deg) translate(${positionX}px,${positionY}px)`,
      }}
      src={image}
      alt={`${value} ${suit}`}
    />
  );
};

export default Card;
