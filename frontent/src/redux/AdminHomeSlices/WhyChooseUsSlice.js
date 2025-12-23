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

// 1️⃣ Fetch Active WhyChoose Us Items (FRONTEND - Public)
export const fetchActiveWhyChoose = createAsyncThunk(
  "whyChoose/fetchActive",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/home/active-whychoose");
      return res.data;
    } catch (error) {
      const message = getThunkError(
        error,
        "Failed to fetch active why choose content"
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Fetch All WhyChoose Us Items (ADMIN)
export const fetchAllWhyChoose = createAsyncThunk(
  "whyChoose/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/home/all-whychoose");
      return res.data;
    } catch (error) {
      const message = getThunkError(
        error,
        "Failed to fetch all why choose items"
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Create WhyChoose Item (ADMIN)
export const createWhyChooseItem = createAsyncThunk(
  "whyChoose/create",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/admin/home/create-whychoose", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (error) {
      const message = getThunkError(error, "Failed to create new item");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Update WhyChoose Item (ADMIN)
export const updateWhyChooseItem = createAsyncThunk(
  "whyChoose/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(
        `/admin/home/update-whychoose/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data.data;
    } catch (error) {
      const message = getThunkError(error, "Failed to update item");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 5️⃣ Delete WhyChoose Item (ADMIN)
export const deleteWhyChooseItem = createAsyncThunk(
  "whyChoose/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/home/delete-whychoose/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Deletion failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
    SLICE (State Management)
===================================================== */

const whyChooseSlice = createSlice({
  name: "whyChooseUs",
  initialState: {
    // Admin States
    whyChooseItems: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

    // Frontend (Active) States
    activeWhyChoose: [],
    isActiveLoading: false,
    isActiveSuccess: false,
    isActiveError: false,
    activeMessage: "",
  },
  reducers: {
    resetWhyChooseState: (state) => {
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
      /* === FETCH ACTIVE === */
      .addCase(fetchActiveWhyChoose.pending, (state) => {
        state.isActiveLoading = true;
        state.isActiveError = false;
      })
      .addCase(fetchActiveWhyChoose.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeWhyChoose = action.payload;
      })
      .addCase(fetchActiveWhyChoose.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      /* === FETCH ALL === */
      .addCase(fetchAllWhyChoose.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllWhyChoose.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.whyChooseItems = action.payload;
      })
      .addCase(fetchAllWhyChoose.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === CREATE === */
      .addCase(createWhyChooseItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWhyChooseItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.whyChooseItems.push(action.payload);
        state.message = "Item created successfully";
      })
      .addCase(createWhyChooseItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === UPDATE === */
      .addCase(updateWhyChooseItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWhyChooseItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.whyChooseItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.whyChooseItems[index] = action.payload;
        }
        state.message = "Updated successfully";
      })
      .addCase(updateWhyChooseItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === DELETE === */
      .addCase(deleteWhyChooseItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWhyChooseItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.whyChooseItems = state.whyChooseItems.filter(
          (item) => item.id !== action.payload
        );
        state.message = "Deleted successfully";
      })
      .addCase(deleteWhyChooseItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetWhyChooseState } = whyChooseSlice.actions;
export default whyChooseSlice.reducer;
