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

// 1️⃣ Fetch ALL Service Banners (ADMIN)
export const fetchAllServiceBanners = createAsyncThunk(
  "serviceBanner/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/service/servicebanner-all");
      return res.data;
    } catch (error) {
      const message = getThunkError(error, "Service Banners fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Fetch Active Service Banners (PUBLIC - UI)
export const fetchPublishedServiceBanners = createAsyncThunk(
  "serviceBanner/fetchPublished",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/service/servicebanner-active");
      return res.data;
    } catch (error) {
      const message = getThunkError(
        error,
        "Published Service Banner fetch Error"
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Create Service Banner (ADMIN)
export const createServiceBanner = createAsyncThunk(
  "serviceBanner/create",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post(
        "/admin/service/servicebanner-create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data.content;
    } catch (error) {
      const message = getThunkError(error, "Service Banner creation failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Update Service Banner (ADMIN)
export const updateServiceBanner = createAsyncThunk(
  "serviceBanner/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(
        `/admin/service/servicebanner-update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data.content;
    } catch (error) {
      const message = getThunkError(error, "Service Banner update failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 5️⃣ Delete Service Banner (ADMIN)
export const deleteServiceBanner = createAsyncThunk(
  "serviceBanner/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/service/servicebanner-delete/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Service Banner deletion failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
    SLICE (State Management)
===================================================== */

const serviceBannerSlice = createSlice({
  name: "serviceBanner",
  initialState: {
    // Admin States
    serviceBanners: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

    // Frontend (Active) States
    activeServiceBanners: [],
    isActiveLoading: false,
    isActiveSuccess: false,
    isActiveError: false,
    activeMessage: "",
  },
  reducers: {
    resetServiceBannerState: (state) => {
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
      /* --- FETCH ALL (ADMIN) --- */
      .addCase(fetchAllServiceBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllServiceBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.serviceBanners = action.payload;
      })
      .addCase(fetchAllServiceBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* --- FETCH PUBLISHED (FRONTEND) --- */
      .addCase(fetchPublishedServiceBanners.pending, (state) => {
        state.isActiveLoading = true;
      })
      .addCase(fetchPublishedServiceBanners.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        // API response-ல் content இருந்தால் அதைப் பயன்படுத்தவும், இல்லையெனில் நேரடி action.payload
        state.activeServiceBanners = action.payload.content || action.payload;
      })
      .addCase(fetchPublishedServiceBanners.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      /* --- CREATE (ADMIN) --- */
      .addCase(createServiceBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createServiceBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.serviceBanners.push(action.payload);
        state.message = "Service Banner created successfully.";
      })
      .addCase(createServiceBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* --- UPDATE (ADMIN) --- */
      .addCase(updateServiceBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateServiceBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.serviceBanners.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) state.serviceBanners[index] = action.payload;
        state.message = "Service Banner updated successfully.";
      })
      .addCase(updateServiceBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* --- DELETE (ADMIN) --- */
      .addCase(deleteServiceBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteServiceBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.serviceBanners = state.serviceBanners.filter(
          (b) => b.id !== action.payload
        );
        state.message = "Service Banner deleted successfully.";
      })
      .addCase(deleteServiceBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetServiceBannerState } = serviceBannerSlice.actions;
export default serviceBannerSlice.reducer;
