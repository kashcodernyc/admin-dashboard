import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export const fetchTicketData = createAsyncThunk(
  "ticketsData/fetchTicketData",
  async () => {
    try {
      const snapshot = await getDocs(collection(db, "invoices"));
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      console.log(list);
      return {
        ticketData: list,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const addTicket = createAsyncThunk(
  "ticketsData/addTicket",
  async (ticketData) => {
    try {
      // Add a new document with a generated id.
      await addDoc(collection(db, "invoices"), {
        ...ticketData,
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const deleteTicket = createAsyncThunk(
  "ticketsData/deleteTicket",
  async (ticketId, { getState }) => {
    try {
      const state = getState();
      const ticketData = state.ticketsData.ticketsData;

      await deleteDoc(doc(db, "invoices", ticketId));

      const updatedTicketData = ticketData.filter(
        (item) => item.id !== ticketId
      );

      return updatedTicketData;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const ticketDataSlice = createSlice({
  name: "ticketsData",
  initialState: {
    ticketsData: [],
  },
  reducers: {
    setTicketData: (state, action) => {
      state.ticketsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTicketData.fulfilled, (state, action) => {
      state.ticketsData = action.payload.ticketData;
    });
    builder.addCase(addTicket.fulfilled, (state, action) => {
      state.ticketsData.push(action.payload);
    });
    builder.addCase(deleteTicket.fulfilled, (state, action) => {
      state.ticketsData = action.payload.ticketData;
    });
  },
});

export const { setTicketData } = ticketDataSlice.actions;
export default ticketDataSlice.reducer;
