import { PropertyCard } from "../../components/Home/MainListingArea/PropertyCard";
import { Navbar } from "../../components/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Favourites = () => {
  let location = useLocation();
  const favourites = useSelector((state) => state.data.favourites);

  return (
    <div className="flex-col">
      <Navbar />
      <h1 className="listing-area">Favourites</h1>
      <div className="listing-area grid">
        {favourites.length ? (
          favourites.map((property, id) => {
            return (
              <PropertyCard
                key={id}
                propertyIndex={id}
                image={property.data.imageUrl}
                alt={property.data.alternate}
                price={property.data.price}
                name={property.data.name}
                state={property.data.state}
                headline={property.data.headline}
                details={property.data.details}
                availability={property.data.dateAvailable}
                displayIcon={location.pathname === "/favourites" ? false : true}
              />
            );
          })
        ) : (
          <div>No Favourite property</div>
        )}
      </div>
    </div>
  );
};
