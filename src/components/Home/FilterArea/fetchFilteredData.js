import { priceDefaults } from "../../../constants/commons";

export const fetchFilteredData = (
  data,
  propertyTypeFilter,
  priceFilter,
  locationFilter,
  dateFilter
) => {
  let filteredData = data;

  // property type
  if (propertyTypeFilter !== "All") {
    filteredData = data.filter(
      (property) => property.propertyType === propertyTypeFilter
    );
  }

  // price filter
  if (
    priceFilter.min !== priceDefaults.MIN &&
    priceFilter.max !== priceDefaults.MAX &&
    priceFilter.leftPercentage !== priceDefaults.LEFT_PERCENTAGE &&
    priceFilter.rightPercentage !== priceDefaults.RIGHT_PERCENTAGE
  ) {
    filteredData = filteredData.filter((property) => {
      const propertyPrice = parseInt(
        property.price.split("/")[0].split("$")[1]
      );
      return (
        property &&
        propertyPrice >= priceFilter.min &&
        propertyPrice <= priceFilter.max
      );
    });
  }

  // location filter
  if (locationFilter !== "") {
    filteredData = filteredData.filter(
      (property) =>
        property.state.toLowerCase() === locationFilter.toLowerCase() ||
        property.city.toLowerCase() === locationFilter.toLowerCase()
    );
  }

  // date filter
  if (dateFilter) {
    filteredData = filteredData.filter(
      (property) => dateFilter > property.dateAvailableFrom
    );
  }
  return filteredData;
};
