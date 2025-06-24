import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://blog-platform.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData })
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.errors || 'Login failed');
      }
      // Сохраняем токен
      localStorage.setItem('token', data.user.token);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// это для инициализации пользователя при старте приложения
export const initAuth = createAsyncThunk(
  'auth/initAuth',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) return rejectWithValue('No token');
    try {
      const response = await fetch('https://blog-platform.kata.academy/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        localStorage.removeItem('token');
        return rejectWithValue(data.errors || 'Auth failed');
      }
      return data.user;
    } catch (err) {
      localStorage.removeItem('token');
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || 'Ошибка авторизации';
      })
      .addCase(initAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(initAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout, setAuthError, clearAuthError } = authSlice.actions;
export default authSlice.reducer; 