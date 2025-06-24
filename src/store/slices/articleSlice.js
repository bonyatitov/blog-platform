import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async ({page, pageSize}) => {
  const offset = (page - 1) * pageSize;
  const response = await fetch(`https://blog-platform.kata.academy/api/articles?limit=${pageSize}&offset=${offset}`);
  return await response.json();
});

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://blog-platform.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ article: articleData })
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.errors || 'Failed to create article');
      }
      return data.article;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ slug, articleData }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ article: articleData })
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.errors || 'Failed to update article');
      }
      return data.article;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (slug, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.errors || 'Failed to delete article');
      }
      return slug;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    data: [],
    allPages: null,
    pageSize: 5, 
    status: 'idle',
    error: null,
    createStatus: 'idle',
    createError: null,
    updateStatus: 'idle',
    updateError: null,
    deleteStatus: 'idle',
    deleteError: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.status = 'loading'
    }).addCase(fetchArticles.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload.articles
      state.allPages = action.payload.articlesCount
    }).addCase(fetchArticles.rejected, (state, action) => {
      state.data = []
      state.status = 'filed'
      state.error = action.error.message
    }).addCase(createArticle.pending, (state) => {
      state.createStatus = 'loading';
      state.createError = null;
    }).addCase(createArticle.fulfilled, (state) => {
      state.createStatus = 'succeeded';
      state.createError = null;
    }).addCase(createArticle.rejected, (state, action) => {
      state.createStatus = 'failed';
      state.createError = action.payload || 'Ошибка создания статьи';
    }).addCase(updateArticle.pending, (state) => {
      state.updateStatus = 'loading';
      state.updateError = null;
    }).addCase(updateArticle.fulfilled, (state) => {
      state.updateStatus = 'succeeded';
      state.updateError = null;
    }).addCase(updateArticle.rejected, (state, action) => {
      state.updateStatus = 'failed';
      state.updateError = action.payload || 'Ошибка обновления статьи';
    }).addCase(deleteArticle.pending, (state) => {
      state.deleteStatus = 'loading';
      state.deleteError = null;
    }).addCase(deleteArticle.fulfilled, (state) => {
      state.deleteStatus = 'succeeded';
      state.deleteError = null;
    }).addCase(deleteArticle.rejected, (state, action) => {
      state.deleteStatus = 'failed';
      state.deleteError = action.payload || 'Ошибка удаления статьи';
    });
  }
});

export default articlesSlice.reducer;