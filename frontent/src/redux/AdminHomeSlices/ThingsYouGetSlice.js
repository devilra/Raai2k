import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// ----------------------------------------------------
// Helper: Error Message Retrieval
// ----------------------------------------------------
const getThunkError = (error, defaultMessage) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

  return message === "Request failed with status code 401"
    ? defaultMessage
    : message;
};

// ----------------------------------------------------
// 1. ASYNC THUNKS (API Calls)
// ----------------------------------------------------

// A. PUBLIC: Frontend-க்காக Active தகவல்களைப் பெறுதல்
export const fetchActiveThings = createAsyncThunk(
  "thingsYouGet/fetchActive",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/home/things-active");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error fetching active items");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// B. ADMIN: அனைத்து தகவல்களையும் பெறுதல்
export const fetchAllThings = createAsyncThunk(
  "thingsYouGet/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/home/things-all");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error fetching all items");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// C. ADMIN: புதிய ஒன்றை உருவாக்குதல்
export const createThingsYouGet = createAsyncThunk(
  "thingsYouGet/create",
  async (contentData, thunkAPI) => {
    try {
      const response = await api.post("/admin/home/things-create", contentData);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error creating item");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// D. ADMIN: தகவலைப் புதுப்பித்தல்
export const updateThingsYouGet = createAsyncThunk(
  "thingsYouGet/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(`/admin/home/things-content/${id}`, data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error updating item");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// E. ADMIN: தகவலை நீக்குதல்
export const deleteThingsYouGet = createAsyncThunk(
  "thingsYouGet/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/home/things-content/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Error deleting item");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ----------------------------------------------------
// 2. INITIAL STATE (As per your pattern)
// ----------------------------------------------------

const initialState = {
  // Admin States
  things: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",

  // Frontend (Active) States
  activeThings: [],
  isActiveLoading: false,
  isActiveSuccess: false,
  isActiveError: false,
  activeMessage: "",

  singleItem: null, // Edit-க்காக
};

// ----------------------------------------------------
// 3. SLICE DEFINITION
// ----------------------------------------------------

export const thingsYouGetSlice = createSlice({
  name: "thingsYouGet",
  initialState,
  reducers: {
    resetThingsState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isActiveLoading = false;
      state.isActiveSuccess = false;
      state.isActiveError = false;
      state.activeMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= FETCH ACTIVE (Frontend) =================
      .addCase(fetchActiveThings.pending, (state) => {
        state.isActiveLoading = true;
        state.isActiveError = false;
      })
      .addCase(fetchActiveThings.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeThings = action.payload;
      })
      .addCase(fetchActiveThings.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      // ================= FETCH ALL (Admin) =================
      .addCase(fetchAllThings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllThings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.things = action.payload;
      })
      .addCase(fetchAllThings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= CREATE =================
      .addCase(createThingsYouGet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createThingsYouGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.things.push(action.payload.data);
        }
      })
      .addCase(createThingsYouGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= UPDATE =================
      .addCase(updateThingsYouGet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateThingsYouGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        const updated = action.payload.data;
        const index = state.things.findIndex((item) => item.id === updated.id);
        if (index !== -1) {
          state.things[index] = updated;
        }
      })
      .addCase(updateThingsYouGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= DELETE =================
      .addCase(deleteThingsYouGet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteThingsYouGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Deleted successfully!";
        state.things = state.things.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteThingsYouGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetThingsState } = thingsYouGetSlice.actions;
export default thingsYouGetSlice.reducer;
