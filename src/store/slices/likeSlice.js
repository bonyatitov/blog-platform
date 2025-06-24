import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInfo } from "./allInfoSlice";

export const sendLike = createAsyncThunk(
  "like/sendLike",
  async ({ slug, liked }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const method = liked ? "DELETE" : "POST";
    const response = await fetch(
      `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
      {
        method,
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    if (!response.ok) {
      return rejectWithValue("Ошибка лайка");
    }
    await dispatch(fetchInfo(slug));
    return { slug, liked: !liked };
  }
);

const likeSlice = createSlice({
  name: 'like',
  initialState: {
    likes: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendLike.fulfilled, (state, action) => {
      const { slug, liked } = action.payload;
      state.likes[slug] = liked ? '#ff0000' : null;
    });
  }
});

export default likeSlice.reducer;