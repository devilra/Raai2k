import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// Error Message Helper
const getThunkError = (error, defaultMessage) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message === "Request failed with status code 401"
    ? defaultMessage
    : message;
};

/* =====================================================
   ASYNC THUNKS
===================================================== */

// 1️⃣ Fetch ALL (ADMIN)
export const fetchExpertise = createAsyncThunk(
  "expertise/fetchExpertise",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/expertise");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getThunkError(error, "Expertise fetch Error")
      );
    }
  }
);

// 2️⃣ Fetch ACTIVE Only (FRONTEND - Public)
export const fetchActiveExpertise = createAsyncThunk(
  "expertise/fetchActiveExpertise",
  async (_, thunkAPI) => {
    try {
      // Ungal public API route-ai inge use seiyavum
      const res = await api.get("/admin/active-expertise");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getThunkError(error, "Active Expertise fetch Error")
      );
    }
  }
);

// 3️⃣ Create Expertise (ADMIN)
export const createExpertise = createAsyncThunk(
  "expertise/createExpertise",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/admin/create-expertise", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.slide;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getThunkError(error, "Expertise create error")
      );
    }
  }
);

// 4️⃣ Update Expertise (ADMIN)
export const updateExpertise = createAsyncThunk(
  "expertise/updateExpertise",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(`/admin/update-expertise/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.slide;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getThunkError(error, "Expertise Update Failed")
      );
    }
  }
);

// 5️⃣ Delete Expertise (ADMIN)
export const deleteExpertise = createAsyncThunk(
  "expertise/deleteExpertise",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/delete-expertise/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getThunkError(error, "Expertise Delete Error")
      );
    }
  }
);

/* =====================================================
   SLICE (State Management)
===================================================== */

const expertiseSlice = createSlice({
  name: "expertise",
  initialState: {
    // Admin States
    expertises: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

    // Frontend (Active) States
    activeExpertise: [],
    isActiveLoading: false,
    isActiveSuccess: false,
    isActiveError: false,
    activeMessage: "",
  },
  reducers: {
    resetExpertiseState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      // Resetting active states
      state.isActiveLoading = false;
      state.isActiveSuccess = false;
      state.isActiveError = false;
      state.activeMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      /* --- ADMIN: FETCH ALL --- */
      .addCase(fetchExpertise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExpertise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expertises = action.payload;
      })
      .addCase(fetchExpertise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* --- FRONTEND: FETCH ACTIVE --- */
      .addCase(fetchActiveExpertise.pending, (state) => {
        state.isActiveLoading = true;
      })
      .addCase(fetchActiveExpertise.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeExpertise = action.payload;
      })
      .addCase(fetchActiveExpertise.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      /* --- CREATE --- */
      .addCase(createExpertise.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createExpertise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expertises.push(action.payload);
        state.message = "Expertise Created Successfully.";
      })

      /* --- UPDATE --- */
      .addCase(updateExpertise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.expertises.findIndex(
          (e) => e.id === action.payload.id
        );
        if (index !== -1) state.expertises[index] = action.payload;
        state.message = "Expertise Updated Successfully.";
      })

      /* --- DELETE --- */
      .addCase(deleteExpertise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expertises = state.expertises.filter(
          (e) => e.id !== action.payload
        );
        state.message = "Expertise Deleted Successfully.";
      });
  },
});

export const { resetExpertiseState } = expertiseSlice.actions;
export default expertiseSlice.reducer;
