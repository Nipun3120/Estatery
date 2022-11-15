import { useEffect, useRef, useState } from "react";
import "./FilterArea.css";
import { AiOutlineDown } from "react-icons/ai";
import { states } from "../../../constants/UsStates";
import { filters, propertyTypes } from "../../../constants/commons";

export const FilterArea = ({
  setFilters,
  locationFilter,
  dateFilter,
  priceFilter,
  propertyType,
  searchHandler,
  resetFilters,
  suggestions,
  suggestionsDisplay,
  searchName,
  onInputChange,
  clickSuggestion,
}) => {
  //   const debounce = (func, timeout = 300) => {
  //     console.log(func);

  //     let timer;
  //     return (...args) => {
  //       clearTimeout(timer);
  //       timer = setTimeout(() => {
  //         func.apply(this, args);
  //       }, timeout);
  //     };
  //   };
  const ref = useRef(null);
  const priceRange = document.querySelectorAll(".priceRangeInput");

  const priceRangeChange = (e) => {
    if (priceRange[1].value - priceRange[0].value > 999) {
      setFilters({
        type: filters.PRICE,
        min: priceRange[0].value,
        max: priceRange[1].value,
        leftPercentage: `${(priceRange[0].value / priceRange[0].max) * 100}%`,
        rightPercentage: `${
          100 - (priceRange[1].value / priceRange[1].max) * 100
        }%`,
      });
    }
  };

  return (
    <div className="filter-area">
      <div className="flex-row search-bar">
        <h1>Search properties to rent</h1>
        <div className="relative">
          <input
            onChange={(e) => onInputChange(e)}
            placeholder="Search Property"
            value={searchName}
            className="searchProperty"
          ></input>
          {suggestionsDisplay && suggestions.length !== 0 && (
            <div className="dropdown">
              {suggestions.map((suggestion, id) => {
                return (
                  <option
                    key={id}
                    onClick={(e) => clickSuggestion(e)}
                    value={suggestion}
                    ref={ref}
                  >
                    {suggestion}
                  </option>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="filter-bar flex-row justify-space-between align-stretch">
        <div className="flex-col">
          <span className="filter-bar-title">Location</span>
          <input
            className="filer-bar-value location-filter"
            type="text"
            autoComplete="on"
            options={states}
            value={locationFilter}
            placeholder="eg: San Francisco"
            onChange={(e) =>
              setFilters({ type: filters.LOCATION, value: e.target.value })
            }
          ></input>
        </div>
        <div className="flex-col border-left">
          <span className="filter-bar-title">When</span>
          {/* <span className="filter-bar-value">Select Move-in Date</span> */}
          <input
            type="date"
            className="dateInput"
            onChange={(e) =>
              setFilters({ type: filters.DATE, value: e.target.value })
            }
          ></input>
        </div>
        <div className="flex-col border-left">
          <span className="filter-bar-title">Price</span>
          <span className="filter-bar-value">
            ${priceFilter.min} - $
            {priceFilter.max === "10000"
              ? `${priceFilter.max}+`
              : priceFilter.max}
          </span>
          <div className="priceRangeSlider">
            <div
              className="progress"
              style={{
                left: priceFilter.leftPercentage,
                right: priceFilter.rightPercentage,
              }}
            ></div>
            <div className="priceRangeInputWrapper">
              <input
                type="range"
                className="priceRangeInput-min priceRangeInput"
                min={1000}
                max={10000}
                value={priceFilter.min}
                onChange={priceRangeChange}
                step={100}
              ></input>
              <input
                type="range"
                className="priceRangeInput-max priceRangeInput"
                min={0}
                max={10000}
                value={priceFilter.max}
                onChange={priceRangeChange}
                step={100}
              ></input>
            </div>
          </div>
        </div>
        <div className="flex-col border-left property-type-wrapper">
          <div className="filter-bar-title">Property Type</div>
          {/* <span className="filter-bar-value">Houses</span> */}
          <div className="property-type-dropdown">
            <div className="property-dropdown-list">
              <select
                name="country"
                id="country"
                className="dropdown-select-input"
                value={propertyType}
                onChange={(e) =>
                  setFilters({
                    type: filters.PROPERTY_TYPE,
                    value: e.target.value,
                  })
                }
              >
                {propertyTypes.map((type, id) => (
                  <option value={type} key={id}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex-col border-left">
          <button
            className="button button-primary button-search"
            onClick={searchHandler}
          >
            Search
          </button>
          <button
            className="button button-secondary button-reset"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
