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

// A. PUBLIC: Active தகவல்களைப் பெறுதல்
export const fetchActiveIndustries = createAsyncThunk(
  "industryServe/fetchActive",
  async (_, thunkAPI) => {
    try {
      // Route: /api/admin/service/industries-active
      const response = await api.get("/admin/service/industries-active");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error fetching active industries");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// B. ADMIN: அனைத்து தகவல்களையும் பெறுதல்
export const fetchAllIndustries = createAsyncThunk(
  "industryServe/fetchAll",
  async (_, thunkAPI) => {
    try {
      // Route: /api/admin/service/industries-all
      const response = await api.get("/admin/service/industries-all");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error fetching all industries");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// C. ADMIN: புதிய ஒன்றை உருவாக்குதல்
export const createIndustryServe = createAsyncThunk(
  "industryServe/create",
  async (contentData, thunkAPI) => {
    try {
      // Route: /api/admin/service/industries-create
      const response = await api.post(
        "/admin/service/industries-create",
        contentData
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error creating industry");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// D. ADMIN: தகவலைப் புதுப்பித்தல்
export const updateIndustryServe = createAsyncThunk(
  "industryServe/update",
  async ({ id, data }, thunkAPI) => {
    try {
      // Route: /api/admin/service/industries-content/:id
      const response = await api.put(
        `/admin/service/industries-content/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error updating industry");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// E. ADMIN: தகவலை நீக்குதல்
export const deleteIndustryServe = createAsyncThunk(
  "industryServe/delete",
  async (id, thunkAPI) => {
    try {
      // Route: /api/admin/service/industries-content/:id
      await api.delete(`/admin/service/industries-content/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Error deleting industry");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ----------------------------------------------------
// 2. INITIAL STATE
// ----------------------------------------------------

const initialState = {
  // Admin States
  industries: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",

  // Frontend (Active) States
  activeIndustries: [],
  isActiveLoading: false,
  isActiveSuccess: false,
  isActiveError: false,
  activeMessage: "",
};

// ----------------------------------------------------
// 3. SLICE DEFINITION
// ----------------------------------------------------

export const industryServeSlice = createSlice({
  name: "industryServe",
  initialState,
  reducers: {
    resetIndustryState: (state) => {
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
      .addCase(fetchActiveIndustries.pending, (state) => {
        state.isActiveLoading = true;
        state.isActiveError = false;
      })
      .addCase(fetchActiveIndustries.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeIndustries = action.payload;
      })
      .addCase(fetchActiveIndustries.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      // ================= FETCH ALL (Admin) =================
      .addCase(fetchAllIndustries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllIndustries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.industries = action.payload;
      })
      .addCase(fetchAllIndustries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= CREATE =================
      .addCase(createIndustryServe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIndustryServe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.industries.push(action.payload.data);
        }
      })
      .addCase(createIndustryServe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= UPDATE =================
      .addCase(updateIndustryServe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIndustryServe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        const updated = action.payload.data;
        const index = state.industries.findIndex(
          (item) => item.id === updated.id
        );
        if (index !== -1) {
          state.industries[index] = updated;
        }
      })
      .addCase(updateIndustryServe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= DELETE =================
      .addCase(deleteIndustryServe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIndustryServe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Deleted successfully!";
        state.industries = state.industries.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteIndustryServe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetIndustryState } = industryServeSlice.actions;
export default industryServeSlice.reducer;
