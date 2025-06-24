import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInfo = createAsyncThunk('info/fetchInfo', async (slug) => {
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`);
  return await response.json();
});

const allInfoSlice = createSlice({
  name: 'allInfo',
  initialState: {
    data: {},
    status: 'idle', // error, loading
    error: null,
  },
  extraReducers: builder => {
    builder.addCase(fetchInfo.pending, (state) => {
      state.status = 'loading'
    }).addCase(fetchInfo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload.article 
    }).addCase(fetchInfo.rejected, (state, action) => {
      state.data = {};
      state.status = 'filed';
      state.error = action.error.message;
    });
  }
});

export default allInfoSlice.reducer;