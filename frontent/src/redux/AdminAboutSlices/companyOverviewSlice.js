import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// ----------------------------------------------------
// 1. ASYNC THUNKS (API Calls)
// ----------------------------------------------------

// ---------------------------
// Error Message Retrieval Logic (homeContentSlice-இல் உள்ளதைப் போன்றது)
// ---------------------------
const getThunkError = (error, defaultMessage) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

  // Server-இல் இருந்து message கிடைக்கவில்லை என்றால் default message-ஐ பயன்படுத்தவும்
  return message === "Request failed with status code 401"
    ? defaultMessage
    : message;
};

export const fetchCompanyOverviews = createAsyncThunk(
  "companyOverview/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/about/overview-all");
      //console.log("Our-Solution", response.data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Overview fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createCompanyOverview = createAsyncThunk(
  "companyOverview/create",
  async (overviewData, thunkAPI) => {
    try {
      const response = await api.post(
        "/admin/about/overview-create",
        overviewData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Overview create error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCompanyOverview = createAsyncThunk(
  "companyOverview/update",
  async ({ id, data }, thunkAPI) => {
    try {
      console.log(data);
      const response = await api.put(
        `/admin/about/overview-update/${id}`,
        data
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Overview Update Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCompanyOverview = createAsyncThunk(
  "companyOverview/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/about/overview-delete/${id}`);
      return id; // வெற்றிகரமாக delete ஆன ID-ஐத் திரும்ப அனுப்பவும்
    } catch (error) {
      const message = getThunkError(error, "Overview Delete Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ----------------------------------------------------
// 2. INITIAL STATE
// ----------------------------------------------------

const initialState = {
  overviews: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// ----------------------------------------------------
// 3. SLICE DEFINITION
// ----------------------------------------------------

export const companyOverviewSlice = createSlice({
  name: "companyOverview",
  initialState,
  reducers: {
    resetOverviewState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= FETCH CONTENT STATUS =================
      .addCase(fetchCompanyOverviews.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(fetchCompanyOverviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.overviews = action.payload;
        state.message = ""; // Success message-ஐ fetch-க்கு வைக்கத் தேவையில்லை
      })
      .addCase(fetchCompanyOverviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
        state.overviews = []; // Error-இல் array-ஐ காலி செய்யலாம்
      })
      // ================= CREATE CONTENT STATUS =================
      .addCase(createCompanyOverview.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(createCompanyOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Company Overview created successfully.";
        // கன்ட்ரோலரில் response 'data' என்ற கீ-யில் வருவதால்:
        if (action.payload.data) {
          state.overviews.unshift(action.payload.data); // புதியதை முதலில் சேர்க்க unshift
        }
      })
      .addCase(createCompanyOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })
      // ================= UPDATE CONTENT STATUS =================
      .addCase(updateCompanyOverview.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
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
      .addCase(updateCompanyOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })
      // ================= DELETE CONTENT STATUS =================
      .addCase(deleteCompanyOverview.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(deleteCompanyOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Company Overview deleted successfully.";
        state.overviews = state.overviews.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteCompanyOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      });
  },
});

export const { resetOverviewState } = companyOverviewSlice.actions;
export default companyOverviewSlice.reducer;
