import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// для обновления данных пользователя
export const updateUserProfile = createAsyncThunk(
  'editProfile/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return rejectWithValue('No authentication token found');
    }

    try {
      const response = await fetch('https://blog-platform.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ user: userData })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.errors || 'Failed to update profile');
      }
      
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const initialState = {
  username: '',
  email: '',
  image: '',
  password: '',
  isLoading: false,
  error: null
};

const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    // Редьюсер для сброса к начальным значениям из auth
    resetToAuthValues: (state, action) => {
      const { user } = action.payload;
      if (user) {
        state.username = user.username;
        state.email = user.email;
        state.image = user.image;
        state.password = '';
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.image = action.payload.image;
        state.password = '';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  setUsername, 
  setEmail, 
  setImage, 
  setPassword,
  resetToAuthValues,
  clearError
} = editProfileSlice.actions;

export default editProfileSlice.reducer;