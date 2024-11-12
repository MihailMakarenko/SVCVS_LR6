import { configureStore } from "@reduxjs/toolkit";
import { BusRouteReducer } from "./slice/busSlice";

const store = configureStore({
  reducer: {
    BusRoute: BusRouteReducer,
  },
});

console.log("Initial store state:", store.getState());
export default store;
