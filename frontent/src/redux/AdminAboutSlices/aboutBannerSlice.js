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

// 1️⃣ Fetch ALL About Banners (ADMIN)
export const fetchAllAboutBanners = createAsyncThunk(
  "aboutBanner/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/aboutbanner-all");
      return res.data;
    } catch (error) {
      const message = getThunkError(error, "About Banners fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Fetch Active About Banners (FRONTEND/PUBLIC)
export const fetchPublishedAboutBanner = createAsyncThunk(
  "aboutBanner/fetchPublished",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/aboutbanner-active");
      return res.data;
    } catch (error) {
      const message = getThunkError(
        error,
        "Published About Banner fetch Error"
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Create About Banner (ADMIN)
export const createAboutBanner = createAsyncThunk(
  "aboutBanner/create",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/admin/aboutbanner-create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.content;
    } catch (error) {
      const message = getThunkError(error, "About Banner creation failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Update About Banner (ADMIN)
export const updateAboutBanner = createAsyncThunk(
  "aboutBanner/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(`/admin/aboutbanner-update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.content;
    } catch (error) {
      const message = getThunkError(error, "About Banner update failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 5️⃣ Delete About Banner (ADMIN)
export const deleteAboutBanner = createAsyncThunk(
  "aboutBanner/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/aboutbanner-delete/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "About Banner deletion failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
    SLICE (State Management)
===================================================== */

const AboutBannerSlice = createSlice({
  name: "aboutBanner",
  initialState: {
    // Admin States
    AboutBanners: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

    // Frontend (Active Content) States
    activeAboutBanners: [],
    isActiveLoading: false,
    isActiveSuccess: false,
    isActiveError: false,
    activeMessage: "",
  },
  reducers: {
    resetAboutBannerState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      // Frontend state reset (Optional - தேவைப்பட்டால் மட்டும்)
      state.isActiveLoading = false;
      state.isActiveSuccess = false;
      state.isActiveError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* --------- ADMIN: FETCH ALL --------- */
      .addCase(fetchAllAboutBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAboutBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.AboutBanners = action.payload;
      })
      .addCase(fetchAllAboutBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* --------- FRONTEND: FETCH ACTIVE --------- */
      .addCase(fetchPublishedAboutBanner.pending, (state) => {
        state.isActiveLoading = true;
      })
      .addCase(fetchPublishedAboutBanner.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeAboutBanners = action.payload; // Active content only
      })
      .addCase(fetchPublishedAboutBanner.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      /* --------- ADMIN: CREATE --------- */
      .addCase(createAboutBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAboutBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.AboutBanners.push(action.payload);
      })
      .addCase(createAboutBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* --------- ADMIN: UPDATE --------- */
      .addCase(updateAboutBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.AboutBanners.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) state.AboutBanners[index] = action.payload;
      })

      /* --------- ADMIN: DELETE --------- */
      .addCase(deleteAboutBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.AboutBanners = state.AboutBanners.filter(
          (b) => b.id !== action.payload
        );
      });
  },
});

export const { resetAboutBannerState } = AboutBannerSlice.actions;
export default AboutBannerSlice.reducer;
