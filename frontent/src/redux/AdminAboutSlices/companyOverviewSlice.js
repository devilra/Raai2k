import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// ---------------------------
// Error Message Retrieval Logic
// ---------------------------
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
    ASYNC THUNKS (API Calls)
===================================================== */

// 1️⃣ Fetch ALL Company Overviews (ADMIN)
export const fetchCompanyOverviews = createAsyncThunk(
  "companyOverview/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/about/overview-all");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Overview fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Fetch ACTIVE Company Overviews (FRONTEND/PUBLIC)
export const fetchActiveCompanyOverviews = createAsyncThunk(
  "companyOverview/fetchActive",
  async (_, thunkAPI) => {
    try {
      // உங்கள் Backend-ல் ஆக்டிவ் கன்டென்ட்க்கு என தனி Route இருந்தால் அதை இங்கு மாற்றவும்
      const response = await api.get("/admin/about/overview-active");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Active Overview fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Create Company Overview (ADMIN)
export const createCompanyOverview = createAsyncThunk(
  "companyOverview/create",
  async (overviewData, thunkAPI) => {
    try {
      const response = await api.post(
        "/admin/about/overview-create",
        overviewData
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Overview create error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Update Company Overview (ADMIN)
export const updateCompanyOverview = createAsyncThunk(
  "companyOverview/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(
        `/admin/about/overview-update/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Overview Update Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 5️⃣ Delete Company Overview (ADMIN)
export const deleteCompanyOverview = createAsyncThunk(
  "companyOverview/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/about/overview-delete/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Overview Delete Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
    SLICE DEFINITION
===================================================== */

const initialState = {
  // Admin States
  overviews: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",

  // Frontend (Active Content) States
  activeOverviews: [],
  isActiveLoading: false,
  isActiveSuccess: false,
  isActiveError: false,
  activeMessage: "",
};

export const companyOverviewSlice = createSlice({
  name: "companyOverview",
  initialState,
  reducers: {
    resetOverviewState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isActiveLoading = false;
      state.isActiveError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* --------- ADMIN: FETCH ALL --------- */
      .addCase(fetchCompanyOverviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCompanyOverviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.overviews = action.payload;
      })
      .addCase(fetchCompanyOverviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* --------- FRONTEND: FETCH ACTIVE --------- */
      .addCase(fetchActiveCompanyOverviews.pending, (state) => {
        state.isActiveLoading = true;
      })
      .addCase(fetchActiveCompanyOverviews.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeOverviews = action.payload; // UI க்கான ஆக்டிவ் டேட்டா மட்டும்
      })
      .addCase(fetchActiveCompanyOverviews.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      /* --------- ADMIN: CREATE --------- */
      .addCase(createCompanyOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Company Overview created successfully.";
        if (action.payload.data) {
          state.overviews.unshift(action.payload.data);
        }
      })

      /* --------- ADMIN: UPDATE --------- */
      .addCase(updateCompanyOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Company Overview updated successfully.";
        const updatedData = action.payload.data;
        const index = state.overviews.findIndex(
          (item) => item.id === updatedData.id
        );
        if (index !== -1) {
          state.overviews[index] = updatedData;
        }
      })

      /* --------- ADMIN: DELETE --------- */
      .addCase(deleteCompanyOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Company Overview deleted successfully.";
        state.overviews = state.overviews.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const { resetOverviewState } = companyOverviewSlice.actions;
export default companyOverviewSlice.reducer;
