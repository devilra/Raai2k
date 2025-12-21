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

// A. PUBLIC: Frontend Active தகவல்களைப் பெறுதல்
export const fetchActiveFinTech = createAsyncThunk(
  "finTech/fetchActive",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/service/fintech-active");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error fetching active services");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// B. ADMIN: அனைத்து தகவல்களையும் பெறுதல்
export const fetchAllFinTech = createAsyncThunk(
  "finTech/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/service/fintech-all");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error fetching all services");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// C. ADMIN: புதிய சேவை உருவாக்குதல்
export const createFinTechService = createAsyncThunk(
  "finTech/create",
  async (contentData, thunkAPI) => {
    try {
      const response = await api.post(
        "/admin/service/fintech-create",
        contentData
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error creating service");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// D. ADMIN: தகவலைப் புதுப்பித்தல்
export const updateFinTechService = createAsyncThunk(
  "finTech/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(
        `/admin/service/fintech-content/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error updating service");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// E. ADMIN: தகவலை நீக்குதல்
export const deleteFinTechService = createAsyncThunk(
  "finTech/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/service/fintech-content/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Error deleting service");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ----------------------------------------------------
// 2. INITIAL STATE
// ----------------------------------------------------

const initialState = {
  // Admin States
  services: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",

  // Frontend States
  activeServices: [],
  isActiveLoading: false,
  isActiveSuccess: false,
  isActiveError: false,
  activeMessage: "",

  singleItem: null,
};

// ----------------------------------------------------
// 3. SLICE DEFINITION
// ----------------------------------------------------

export const finTechSlice = createSlice({
  name: "finTech",
  initialState,
  reducers: {
    resetFinTechState: (state) => {
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
      // ================= FETCH ACTIVE =================
      .addCase(fetchActiveFinTech.pending, (state) => {
        state.isActiveLoading = true;
        state.isActiveError = false;
      })
      .addCase(fetchActiveFinTech.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeServices = action.payload;
      })
      .addCase(fetchActiveFinTech.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      // ================= FETCH ALL =================
      .addCase(fetchAllFinTech.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFinTech.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(fetchAllFinTech.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= CREATE =================
      .addCase(createFinTechService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFinTechService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.services.push(action.payload.data);
        }
      })
      .addCase(createFinTechService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= UPDATE =================
      .addCase(updateFinTechService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFinTechService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        const updated = action.payload.data;
        const index = state.services.findIndex(
          (item) => item.id === updated.id
        );
        if (index !== -1) {
          state.services[index] = updated;
        }
      })
      .addCase(updateFinTechService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= DELETE =================
      .addCase(deleteFinTechService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFinTechService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Service deleted successfully!";
        state.services = state.services.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteFinTechService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetFinTechState } = finTechSlice.actions;
export default finTechSlice.reducer;
