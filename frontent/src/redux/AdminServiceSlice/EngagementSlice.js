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

// A. PUBLIC: Frontend-க்காக Active மாடல்களைப் பெறுதல்
export const fetchActiveEngagementModels = createAsyncThunk(
  "engagement/fetchActive",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/service/engagement-active");
      return response.data;
    } catch (error) {
      const message = getThunkError(
        error,
        "Error fetching active engagement models"
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// B. ADMIN: அனைத்து மாடல்களையும் பெறுதல்
export const fetchAllEngagementModels = createAsyncThunk(
  "engagement/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/service/engagement-all");
      return response.data;
    } catch (error) {
      const message = getThunkError(
        error,
        "Error fetching all engagement models"
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// C. ADMIN: புதிய ஒன்றை உருவாக்குதல்
export const createEngagementModel = createAsyncThunk(
  "engagement/create",
  async (contentData, thunkAPI) => {
    try {
      const response = await api.post(
        "/admin/service/engagement-create",
        contentData
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error creating engagement model");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// D. ADMIN: தகவலைப் புதுப்பித்தல்
export const updateEngagementModel = createAsyncThunk(
  "engagement/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(
        `/admin/service/engagement-content/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Error updating engagement model");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// E. ADMIN: தகவலை நீக்குதல்
export const deleteEngagementModel = createAsyncThunk(
  "engagement/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/service/engagement-content/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Error deleting engagement model");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ----------------------------------------------------
// 2. INITIAL STATE
// ----------------------------------------------------

const initialState = {
  // Admin States
  engagementModels: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",

  // Frontend (Active) States
  activeEngagementModels: [],
  isActiveLoading: false,
  isActiveSuccess: false,
  isActiveError: false,
  activeMessage: "",

  singleItem: null,
};

// ----------------------------------------------------
// 3. SLICE DEFINITION
// ----------------------------------------------------

export const engagementSlice = createSlice({
  name: "engagement",
  initialState,
  reducers: {
    resetEngagementState: (state) => {
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
      .addCase(fetchActiveEngagementModels.pending, (state) => {
        state.isActiveLoading = true;
        state.isActiveError = false;
      })
      .addCase(fetchActiveEngagementModels.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeEngagementModels = action.payload;
      })
      .addCase(fetchActiveEngagementModels.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      // ================= FETCH ALL (Admin) =================
      .addCase(fetchAllEngagementModels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllEngagementModels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.engagementModels = action.payload;
      })
      .addCase(fetchAllEngagementModels.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= CREATE =================
      .addCase(createEngagementModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEngagementModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Engagement model created successfully.";
        if (action.payload.data) {
          state.engagementModels.push(action.payload.data);
        }
      })
      .addCase(createEngagementModel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= UPDATE =================
      .addCase(updateEngagementModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEngagementModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Engagement model updated successfully.";
        const updated = action.payload.data;
        const index = state.engagementModels.findIndex(
          (m) => m.id === updated.id
        );
        if (index !== -1) {
          state.engagementModels[index] = updated;
        }
      })
      .addCase(updateEngagementModel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= DELETE =================
      .addCase(deleteEngagementModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEngagementModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Engagement model deleted successfully.";
        state.engagementModels = state.engagementModels.filter(
          (m) => m.id !== action.payload
        );
      })
      .addCase(deleteEngagementModel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetEngagementState } = engagementSlice.actions;
export default engagementSlice.reducer;
