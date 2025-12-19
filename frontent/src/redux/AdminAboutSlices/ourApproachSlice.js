import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// ----------------------------------------------------
// 1. ERROR HELPER
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
// 2. ASYNC THUNKS (API Calls)
// ----------------------------------------------------

// அனைத்து பதிவுகளையும் பெறுதல்
export const fetchOurApproaches = createAsyncThunk(
  "ourApproach/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/about/approach-all");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Approach fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// புதிய பதிவை உருவாக்குதல்
export const createOurApproach = createAsyncThunk(
  "ourApproach/create",
  async (approachData, thunkAPI) => {
    try {
      const response = await api.post(
        "/admin/about/approach-create",
        approachData
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Approach create error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// பதிவைப் புதுப்பித்தல்
export const updateOurApproach = createAsyncThunk(
  "ourApproach/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(
        `/admin/about/approach-update/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Approach Update Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// பதிவை நீக்குதல்
export const deleteOurApproach = createAsyncThunk(
  "ourApproach/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/about/approach-delete/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Approach Delete Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ----------------------------------------------------
// 3. INITIAL STATE
// ----------------------------------------------------
const initialState = {
  approaches: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// ----------------------------------------------------
// 4. SLICE DEFINITION
// ----------------------------------------------------
export const ourApproachSlice = createSlice({
  name: "ourApproach",
  initialState,
  reducers: {
    resetApproachState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= FETCH STATUS =================
      .addCase(fetchOurApproaches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOurApproaches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.approaches = action.payload;
      })
      .addCase(fetchOurApproaches.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.approaches = [];
      })
      // ================= CREATE STATUS =================
      .addCase(createOurApproach.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOurApproach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Our Approach created successfully.";
        if (action.payload.data) {
          state.approaches.unshift(action.payload.data);
        }
      })
      .addCase(createOurApproach.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // ================= UPDATE STATUS =================
      .addCase(updateOurApproach.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOurApproach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Our Approach updated successfully.";
        const updatedData = action.payload.data;
        const index = state.approaches.findIndex(
          (item) => item.id === updatedData.id
        );
        if (index !== -1) {
          state.approaches[index] = updatedData;
        }
      })
      .addCase(updateOurApproach.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // ================= DELETE STATUS =================
      .addCase(deleteOurApproach.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOurApproach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Our Approach deleted successfully.";
        state.approaches = state.approaches.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteOurApproach.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetApproachState } = ourApproachSlice.actions;
export default ourApproachSlice.reducer;
