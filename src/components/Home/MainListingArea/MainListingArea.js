import "./MainListingArea.css";
import { PropertyCard } from "./PropertyCard";
import { useDispatch } from "react-redux";
import { removeFromFavourites, setFavourites } from "../../../slices/data";

export const MainListingArea = ({ data }) => {
  const dispatch = useDispatch();

  const favouriteProperty = (id, option) => {
    if (option) {
      dispatch(setFavourites({ data: data[id] }));
    } else {
      dispatch(removeFromFavourites(data[id]));
    }
  };

  return (
    <div className="listing-area grid">
      {data.length ? (
        data.map((property, id) => {
          return (
            <PropertyCard
              key={id}
              propertyIndex={id}
              image={property.imageUrl}
              alt={property.alternate}
              price={property.price}
              name={property.name}
              state={property.state}
              headline={property.headline}
              details={property.details}
              availability={property.dateAvailable}
              favouriteProperty={favouriteProperty}
              displayIcon={true}
              propertyId={property.id}
            />
          );
        })
      ) : (
        <div className="text-center">
          <h4>No result found</h4>
        </div>
      )}
    </div>
  );
};
