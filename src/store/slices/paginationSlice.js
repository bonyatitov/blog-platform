import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: 1,
  reducers: {
    setPage: (state, action) => {
      return action.payload
    }
  }
})

export const { setPage } = paginationSlice.actions;
export default paginationSlice.reducer;