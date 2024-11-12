import { createSlice } from "@reduxjs/toolkit";
import BusRoute from "../../Components/cardBus/BusTrips.json";

const busRouteReducer = createSlice({
  name: "BusRoutes",
  initialState: BusRoute,
  reducers: {
    addRoute: (state, action) => {
      console.log(action);
      console.log(state);
      state.push(action.payload);
    },
    updateRoute: (state, action) => {
      const {
        id,
        startCity,
        finishCity,
        startTime,
        finishTime,
        carrier,
        price,
        platformNumber,
        DefaultBusNumber,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      } = action.payload;

      const routeToUpdate = state.find((route) => route.id === id);
      if (routeToUpdate) {
        // Обновляем свойства маршрута
        Object.assign(routeToUpdate, {
          startCity,
          finishCity,
          startTime,
          finishTime,
          carrier,
          price,
          platformNumber,
          DefaultBusNumber,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
        });
      }
    },
    deleteRoute: (state, action) => {
      const { id } = action.payload;
      const index = state.findIndex((route) => route.id === id);
      if (index !== -1) {
        state.splice(index, 1); // Удаляем маршрут по индексу
      }
    },
  },
});

export const { addRoute, updateRoute, deleteRoute } = busRouteReducer.actions;
export const BusRouteReducer = busRouteReducer.reducer;
