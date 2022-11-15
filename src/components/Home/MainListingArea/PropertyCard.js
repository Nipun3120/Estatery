import "./PropertyCard.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiBed, BiBath } from "react-icons/bi";
import { TbDimensions } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const PropertyCard = ({
  propertyIndex,
  image,
  alt,
  price,
  name,
  state,
  headline,
  details,
  availability,
  favouriteProperty,
  displayIcon,
  propertyId,
}) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const favouritesData = useSelector((state) => state.data.favourites);

  const markAsFavourite = () => {
    if (!favouritesData.includes(propertyId)) {
      favouriteProperty(propertyIndex, true);
      setIsFavourite(true);
    }
  };

  useEffect(() => {
    if (favouritesData.find((property) => property.data.name === name)) {
      setIsFavourite(true);
    }
  }, []);

  const priceAmount = { 0: price.split("/")[0], 1: price.split("/")[1] };

  return (
    <div className="property-card">
      <div className="">
        <img className="card-image" src={image} alt={alt}></img>
      </div>
      <div className="card-description flex-col">
        <div className="flex-row justify-space-between">
          <div>
            <span className="card-price">{priceAmount[0]} </span>
            <span className="font-small">/{priceAmount[1]}</span>
          </div>
          {displayIcon &&
            (!isFavourite ? (
              <AiOutlineHeart
                size={15}
                className="heart-icon"
                onClick={() => markAsFavourite()}
              />
            ) : (
              <AiFillHeart
                sixe={15}
                className="heart-icon"
                onClick={() => markAsFavourite()}
              />
            ))}
        </div>
        <div className="flex-col">
          <span className="card-description__name">{name}</span>
          <span className="card-headline">{headline}</span>
        </div>
        <hr></hr>
        <div className="card-details flex-row font-small justify-space-between">
          <div className="flex-row">
            <BiBed className="card-icons" />
            <span>{details.beds}</span>
          </div>
          <div className="flex-row">
            <BiBath className="card-icons" />
            <span>{details.bathrooms}</span>
          </div>
          <div className="flex-row">
            <TbDimensions className="card-icons" />
            <span>
              {details.length}x{details.width} m<sup>2</sup>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
