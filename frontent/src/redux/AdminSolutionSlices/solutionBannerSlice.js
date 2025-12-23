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

// 1️⃣ Fetch ALL Solution Banners (ADMIN)
export const fetchAllSolutionBanners = createAsyncThunk(
  "solutionBanner/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/solutionbanner-all");
      return res.data;
    } catch (error) {
      const message = getThunkError(error, "Solution Banners fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Fetch Active Solution Banners (PUBLIC - UI)
export const fetchPublishedSolutionBanner = createAsyncThunk(
  "solutionBanner/fetchPublished",
  async (_, thunkAPI) => {
    try {
      // 💡 Public Route handle panna endpoint
      const res = await api.get("/admin/solutionbanner-active");
      return res.data;
    } catch (error) {
      const message = getThunkError(
        error,
        "Published Solution Banner fetch Error"
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Create Solution Banner (ADMIN)
export const createSolutionBanner = createAsyncThunk(
  "solutionBanner/create",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/admin/solutionbanner-create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.content;
    } catch (error) {
      const message = getThunkError(error, "Solution Banner creation failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Update Solution Banner (ADMIN)
export const updateSolutionBanner = createAsyncThunk(
  "solutionBanner/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(
        `/admin/solutionbanner-update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data.content;
    } catch (error) {
      const message = getThunkError(error, "Solution Banner update failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 5️⃣ Delete Solution Banner (ADMIN)
export const deleteSolutionBanner = createAsyncThunk(
  "solutionBanner/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/solutionbanner-delete/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Solution Banner deletion failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
    SLICE (State Management)
===================================================== */

const solutionBannerSlice = createSlice({
  name: "solutionBanner",
  initialState: {
    // Admin States
    banners: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

    // Frontend (Active) States
    activeBanners: [], // UI-il active banners-ai maintain panna
    isActiveLoading: false,
    isActiveSuccess: false,
    isActiveError: false,
    activeMessage: "",
  },
  reducers: {
    resetSolutionBannerState: (state) => {
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
      /* --- ADMIN: FETCH ALL --- */
      .addCase(fetchAllSolutionBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSolutionBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.banners = action.payload;
      })
      .addCase(fetchAllSolutionBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* --- FRONTEND: FETCH PUBLISHED (ACTIVE) --- */
      .addCase(fetchPublishedSolutionBanner.pending, (state) => {
        state.isActiveLoading = true;
      })
      .addCase(fetchPublishedSolutionBanner.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeBanners = action.payload;
      })
      .addCase(fetchPublishedSolutionBanner.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      /* --- CREATE (ADMIN) --- */
      .addCase(createSolutionBanner.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createSolutionBanner.fulfilled, (state, action) => {
        state.isSuccess = true;
        if (action.payload) {
          state.banners.push(action.payload);
        }
        state.message = "Solution Banner created successfully.";
      })

      /* --- UPDATE (ADMIN) --- */
      .addCase(updateSolutionBanner.fulfilled, (state, action) => {
        state.isSuccess = true;
        const index = state.banners.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) state.banners[index] = action.payload;
        state.message = "Solution Banner updated successfully";
      })

      /* --- DELETE (ADMIN) --- */
      .addCase(deleteSolutionBanner.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.banners = state.banners.filter((b) => b.id !== action.payload);
        state.message = "Solution Banner deleted successfully";
      });
  },
});

export const { resetSolutionBannerState } = solutionBannerSlice.actions;
export default solutionBannerSlice.reducer;
