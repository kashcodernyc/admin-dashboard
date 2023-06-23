import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      return {
        usersData: list,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const userDataSlice = createSlice({
  name: "usersData",
  initialState: {
    usersData: [],
  },
  reducers: {
    // Other reducers if needed
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.usersData = action.payload.usersData;
    });
  },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
