import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarReducer";
import userDataReducer from "./userReducer";
import ticketDataReducer from "./ticketReducer";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    usersData: userDataReducer,
    ticketsData: ticketDataReducer,
  },
});

export default store;
