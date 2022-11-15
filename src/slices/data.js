import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    favourites: [],
    filteredData: [],
    locationFilter: "",
    dateFilter: null,
    priceFilter: {
      min: 2000,
      max: 9000,
      leftPercentage: "20%",
      rightPercentage: "90%",
    },
    propertyTypeFilter: "All",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFavourites: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFromFavourites: (state, action) => {
      let arr = state.favourites;
      arr = arr.splice(arr.indexOf(action.payload), 1);
      state.favourites = arr;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },

    setLocationFilterReducer: (state, action) => {
      state.locationFilter = action.payload;
    },
    setDateFilterReducer: (state, action) => {
      state.dateFilter = action.payload;
    },
    setPriceFilterReducer: (state, action) => {
      state.priceFilter.min = action.payload.min;
      state.priceFilter.max = action.payload.max;
      state.priceFilter.leftPercentage = action.payload.leftPercentage;
      state.priceFilter.rightPercentage = action.payload.rightPercentage;
    },
    propertyTypeFilterReducer: (state, action) => {
      state.propertyTypeFilter = action.payload;
    },
  },
});

export const {
  setData,
  setFavourites,
  removeFromFavourites,
  setFilteredData,
  setLocationFilterReducer,
  setDateFilterReducer,
  setPriceFilterReducer,
  propertyTypeFilterReducer,
} = authSlice.actions;

export default authSlice.reducer;
