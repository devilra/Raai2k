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

// A. PUBLIC: Frontend-க்காக Active Case Studies மட்டும் பெறுதல்
export const fetchActiveCaseStudies = createAsyncThunk(
  "caseStudy/fetchActive",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/service/casestudy-active");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Active Case Studies fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// B. ADMIN: அனைத்து பதிவுகளையும் பெறுதல்
export const fetchAllCaseStudies = createAsyncThunk(
  "caseStudy/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/service/casestudy-all");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Case Study fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// C. ADMIN: புதிய பதிவை உருவாக்குதல்
export const createCaseStudy = createAsyncThunk(
  "caseStudy/create",
  async (caseStudyData, thunkAPI) => {
    try {
      const response = await api.post(
        "/admin/service/casestudy-create",
        caseStudyData
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Case Study create error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// D. ADMIN: பதிவைப் புதுப்பித்தல்
export const updateCaseStudy = createAsyncThunk(
  "caseStudy/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(
        `/admin/service/casestudy-update/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Case Study Update Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// E. ADMIN: பதிவை நீக்குதல்
export const deleteCaseStudy = createAsyncThunk(
  "caseStudy/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/service/casestudy-delete/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Case Study Delete Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ----------------------------------------------------
// 3. INITIAL STATE
// ----------------------------------------------------
const initialState = {
  // Admin States
  caseStudies: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",

  // Frontend (Active) States
  activeCaseStudies: [],
  isActiveLoading: false,
  isActiveSuccess: false,
  isActiveError: false,
  activeMessage: "",

  singleItem: null, // Edit-க்காக
};

// ----------------------------------------------------
// 4. SLICE DEFINITION
// ----------------------------------------------------
export const caseStudySlice = createSlice({
  name: "caseStudy",
  initialState,
  reducers: {
    resetCaseStudyState: (state) => {
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
      .addCase(fetchActiveCaseStudies.pending, (state) => {
        state.isActiveLoading = true;
      })
      .addCase(fetchActiveCaseStudies.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeCaseStudies = action.payload;
      })
      .addCase(fetchActiveCaseStudies.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      // ================= FETCH ALL (Admin) =================
      .addCase(fetchAllCaseStudies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCaseStudies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.caseStudies = action.payload;
      })
      .addCase(fetchAllCaseStudies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= CREATE =================
      .addCase(createCaseStudy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCaseStudy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Case Study created successfully.";
        if (action.payload.data) {
          state.caseStudies.unshift(action.payload.data);
        }
      })
      .addCase(createCaseStudy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= UPDATE =================
      .addCase(updateCaseStudy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCaseStudy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Case Study updated successfully.";
        const updatedData = action.payload.data;
        const index = state.caseStudies.findIndex(
          (item) => item.id === updatedData.id
        );
        if (index !== -1) {
          state.caseStudies[index] = updatedData;
        }
      })
      .addCase(updateCaseStudy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= DELETE =================
      .addCase(deleteCaseStudy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCaseStudy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Case Study deleted successfully.";
        state.caseStudies = state.caseStudies.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteCaseStudy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetCaseStudyState } = caseStudySlice.actions;
export default caseStudySlice.reducer;
