import "./Home.css";
import { Navbar, FilterArea, MainListingArea } from "../../components/Home";
import { useEffect, useState } from "react";
import { filters, priceDefaults } from "../../constants/commons";
import { cities, states } from "../../constants/UsStates";

import { useDispatch, useSelector } from "react-redux";
import {
  propertyTypeFilterReducer,
  setDateFilterReducer,
  setFilteredData,
  setLocationFilterReducer,
  setPriceFilterReducer,
} from "../../slices/data";
import { fetchFilteredData } from "../../components/Home/FilterArea/fetchFilteredData";

export const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const filteredData = useSelector((state) => state.data.filteredData);

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsDisplay, setSuggestionsDisplay] = useState(true);
  const [searchName, setSearchName] = useState("");

  const [locationFilter, setLocationFilter] = useState(
    useSelector((state) => state.data.locationFilter)
  );
  const [dateFilter, setDateFilter] = useState(
    useSelector((state) => state.data.dateFilter)
  );
  const [priceFilter, setPriceFilter] = useState({
    min: useSelector((state) => state.data.priceFilter.min),
    max: useSelector((state) => state.data.priceFilter.max),
    leftPercentage: useSelector(
      (state) => state.data.priceFilter.leftPercentage
    ),
    rightPercentage: useSelector(
      (state) => state.data.priceFilter.rightPercentage
    ),
  });
  const [propertyType, setPropertyType] = useState(
    useSelector((state) => state.data.propertyTypeFilter)
  );

  const setFilters = (filter) => {
    if (filter.type === filters.LOCATION) {
      setLocationFilter(filter.value);
    } else if (filter.type === filters.DATE) {
      setDateFilter(filter.value);
    } else if (filter.type === filters.PRICE) {
      setPriceFilter({
        min: filter.min,
        max: filter.max,
        leftPercentage: filter.leftPercentage,
        rightPercentage: filter.rightPercentage,
      });
    } else {
      setPropertyType(filter.value);
    }
  };

  const searchHandler = () => {
    dispatch(setLocationFilterReducer(locationFilter));
    dispatch(setDateFilterReducer(dateFilter));
    dispatch(
      setPriceFilterReducer({
        min: priceFilter.min,
        max: priceFilter.max,
        leftPercentage: priceFilter.leftPercentage,
        rightPercentage: priceFilter.rightPercentage,
      })
    );
    dispatch(propertyTypeFilterReducer(propertyType));
    dispatch(
      setFilteredData(
        fetchFilteredData(
          data,
          propertyType,
          priceFilter,
          locationFilter,
          dateFilter
        )
      )
    );
  };

  const onInputChange = (e) => {
    const searchField = e.target.value;
    if (searchField.length) {
      setSearchName(searchField);
      setSuggestionsDisplay(true);
      let allPropertyNames = data.map((property) => property.name);
      allPropertyNames = [...new Set(allPropertyNames)];
      const lengthOfInput = searchField.length;
      setSuggestions(
        allPropertyNames.filter(
          (name) =>
            name.substring(0, lengthOfInput).toLowerCase() ===
            searchField.toLowerCase()
        )
      );
    } else {
      setSearchName("");
      setSuggestionsDisplay(false);
      dispatch(setFilteredData(data));
    }
  };
  const clickSuggestion = (e) => {
    const searchField = e.target.value;
    setSearchName(searchField);
    setSuggestionsDisplay(false);
    dispatch(
      setFilteredData(data.filter((property) => property.name === searchField))
    );
  };

  const resetFilters = () => {
    dispatch(setLocationFilterReducer(""));
    dispatch(setDateFilterReducer(null));
    dispatch(setPriceFilterReducer("All"));
    dispatch(
      setPriceFilterReducer({
        min: priceDefaults.MIN,
        max: priceDefaults.MAX,
        leftPercentage: priceDefaults.LEFT_PERCENTAGE,
        rightPercentage: priceDefaults.RIGHT_PERCENTAGE,
      })
    );
    dispatch(setFilteredData(data));
    setLocationFilter("");
    setDateFilter(null);
    setPropertyType("All");
    setPriceFilter({
      min: priceDefaults.MIN,
      max: priceDefaults.MAX,
      leftPercentage: priceDefaults.LEFT_PERCENTAGE,
      rightPercentage: priceDefaults.RIGHT_PERCENTAGE,
    });
    setSearchName("");
    setSuggestions([]);
    setSuggestionsDisplay(false);
  };

  return (
    <div className="flex-col">
      <Navbar />
      <FilterArea
        setFilters={setFilters}
        locationFilter={locationFilter}
        dateFilter={dateFilter}
        priceFilter={priceFilter}
        propertyType={propertyType}
        searchHandler={searchHandler}
        resetFilters={resetFilters}
        suggestions={suggestions}
        suggestionsDisplay={suggestionsDisplay}
        searchName={searchName}
        onInputChange={onInputChange}
        clickSuggestion={clickSuggestion}
      />
      <MainListingArea data={filteredData} />
    </div>
  );
};
