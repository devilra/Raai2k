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

// 1️⃣ Fetch ALL Approaches (ADMIN)
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

// 2️⃣ Fetch ACTIVE Approaches (FRONTEND/PUBLIC)
export const fetchActiveOurApproaches = createAsyncThunk(
  "ourApproach/fetchActive",
  async (_, thunkAPI) => {
    try {
      // Backend-ல் active content-க்கு என தனி route இருப்பின் அதை பயன்படுத்தவும்
      const response = await api.get("/admin/about/approach-active");
      //console.log(response.data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Active Approach fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Create Our Approach (ADMIN)
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

// 4️⃣ Update Our Approach (ADMIN)
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

// 5️⃣ Delete Our Approach (ADMIN)
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
  // Admin States
  approaches: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",

  // Frontend (Active Content) States
  activeApproaches: [],
  isActiveLoading: false,
  isActiveSuccess: false,
  isActiveError: false,
  activeMessage: "",
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
      state.isActiveLoading = false;
      state.isActiveError = false;
      state.activeMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      /* --------- ADMIN: FETCH ALL --------- */
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

      /* --------- FRONTEND: FETCH ACTIVE --------- */
      .addCase(fetchActiveOurApproaches.pending, (state) => {
        state.isActiveLoading = true;
      })
      .addCase(fetchActiveOurApproaches.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeApproaches = action.payload; // UI only active content
      })
      .addCase(fetchActiveOurApproaches.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      /* --------- ADMIN: CREATE --------- */
      .addCase(createOurApproach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Our Approach created successfully.";
        if (action.payload.data) {
          state.approaches.unshift(action.payload.data);
        }
      })

      /* --------- ADMIN: UPDATE --------- */
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

      /* --------- ADMIN: DELETE --------- */
      .addCase(deleteOurApproach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Our Approach deleted successfully.";
        state.approaches = state.approaches.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const { resetApproachState } = ourApproachSlice.actions;
export default ourApproachSlice.reducer;
