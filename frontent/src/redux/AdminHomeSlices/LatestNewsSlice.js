import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

/* =====================================================
    HELPERS
===================================================== */
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

// 1️⃣ Fetch Active News (FRONTEND - Public)
export const fetchActiveNews = createAsyncThunk(
  "latestNews/fetchActive",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/home/active-news");
      return res.data;
    } catch (error) {
      const message = getThunkError(error, "Failed to fetch active news");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Fetch All News (ADMIN)
export const fetchAllNews = createAsyncThunk(
  "latestNews/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/home/all-news");
      return res.data;
    } catch (error) {
      const message = getThunkError(error, "Failed to fetch all news");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Create News (ADMIN)
export const createNews = createAsyncThunk(
  "latestNews/create",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/admin/home/create-news", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (error) {
      const message = getThunkError(error, "News creation failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Update News (ADMIN)
export const updateNews = createAsyncThunk(
  "latestNews/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(`/admin/home/update-news/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (error) {
      const message = getThunkError(error, "News update failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 5️⃣ Delete News (ADMIN)
export const deleteNews = createAsyncThunk(
  "latestNews/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/home/delete-news/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "News deletion failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
    SLICE (State Management)
===================================================== */

const latestNewsSlice = createSlice({
  name: "latestNews",
  initialState: {
    // Admin States
    news: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

    // Frontend (Active) States
    activeNews: [],
    isActiveLoading: false,
    isActiveSuccess: false,
    isActiveError: false,
    activeMessage: "",
  },
  reducers: {
    resetNewsState: (state) => {
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
      /* === FETCH ACTIVE NEWS (PUBLIC) === */
      .addCase(fetchActiveNews.pending, (state) => {
        state.isActiveLoading = true;
        state.isActiveError = false;
      })
      .addCase(fetchActiveNews.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeNews = action.payload;
      })
      .addCase(fetchActiveNews.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      /* === FETCH ALL NEWS (ADMIN) === */
      .addCase(fetchAllNews.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news = action.payload;
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === CREATE NEWS (ADMIN) === */
      .addCase(createNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news.push(action.payload);
        state.message = "News created successfully";
      })
      .addCase(createNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === UPDATE NEWS (ADMIN) === */
      .addCase(updateNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.news.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) {
          state.news[index] = action.payload;
        }
        state.message = "News updated successfully";
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === DELETE NEWS (ADMIN) === */
      .addCase(deleteNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news = state.news.filter((n) => n.id !== action.payload);
        state.message = "News deleted successfully";
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetNewsState } = latestNewsSlice.actions;
export default latestNewsSlice.reducer;
