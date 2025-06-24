import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRegistration = createAsyncThunk(
  'registration/fetchRegistration', 
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://blog-platform.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData })
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.errors || 'Registration failed');
      }
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    formErrors: {},
    loading: false,
    alert: null, // Изменено с 'pending' на null
  },
  reducers: {
    setFieldError: (state, action) => {
      state.formErrors[action.payload.field] = action.payload.message;
    },
    clearFieldError: (state, action) => {
      delete state.formErrors[action.payload];
    },
    resetRegistrationState: (state) => { // Новый reducer
      state.alert = null;
      state.formErrors = {};
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(fetchRegistration.fulfilled, (state) => {
        state.loading = false;
        state.alert = 'success';
        state.formErrors = {};
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.loading = false;
        state.alert = 'error';
        // Обработка ошибок от сервера
        if (action.payload?.username) {
          state.formErrors.username = 'Username is already taken';
        }
        if (action.payload?.email) {
          state.formErrors.email = 'Email is already registered';
        }
      });
  }
});

export const { 
  setFieldError, 
  clearFieldError,
  resetRegistrationState // Экспортируем новый action
} = registrationSlice.actions;

export default registrationSlice.reducer;