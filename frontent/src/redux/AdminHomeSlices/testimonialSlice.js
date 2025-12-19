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

// 1️⃣ Fetch Active Testimonials (FRONTEND - Public)
export const fetchActiveTestimonials = createAsyncThunk(
  "testimonials/fetchActive",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/home/active-testimonials");
      return res.data;
    } catch (error) {
      const message = getThunkError(
        error,
        "Failed to fetch active testimonials"
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Fetch All Testimonials (ADMIN)
export const fetchAllTestimonials = createAsyncThunk(
  "testimonials/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/home/all-testimonials");
      return res.data;
    } catch (error) {
      const message = getThunkError(error, "Failed to fetch all testimonials");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Create Testimonial (ADMIN)
export const createTestimonial = createAsyncThunk(
  "testimonials/create",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/admin/home/create-testimonial", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (error) {
      const message = getThunkError(error, "Testimonial creation failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Update Testimonial (ADMIN)
export const updateTestimonial = createAsyncThunk(
  "testimonials/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(
        `/admin/home/update-testimonial/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data.data;
    } catch (error) {
      const message = getThunkError(error, "Testimonial update failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 5️⃣ Delete Testimonial (ADMIN)
export const deleteTestimonial = createAsyncThunk(
  "testimonials/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/home/delete-testimonial/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Testimonial deletion failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
    SLICE (State Management)
===================================================== */

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    // Admin States
    testimonials: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

    // Frontend (Active) States
    activeTestimonials: [],
    isActiveLoading: false,
    isActiveSuccess: false,
    isActiveError: false,
    activeMessage: "",
  },
  reducers: {
    resetTestimonialState: (state) => {
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
      /* === FETCH ACTIVE TESTIMONIALS === */
      .addCase(fetchActiveTestimonials.pending, (state) => {
        state.isActiveLoading = true;
        state.isActiveError = false;
      })
      .addCase(fetchActiveTestimonials.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeTestimonials = action.payload;
      })
      .addCase(fetchActiveTestimonials.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      /* === FETCH ALL TESTIMONIALS === */
      .addCase(fetchAllTestimonials.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllTestimonials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.testimonials = action.payload;
      })
      .addCase(fetchAllTestimonials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === CREATE TESTIMONIAL === */
      .addCase(createTestimonial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.testimonials.push(action.payload);
        state.message = "Testimonial created successfully";
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === UPDATE TESTIMONIAL === */
      .addCase(updateTestimonial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.testimonials.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
        state.message = "Testimonial updated successfully";
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === DELETE TESTIMONIAL === */
      .addCase(deleteTestimonial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.testimonials = state.testimonials.filter(
          (t) => t.id !== action.payload
        );
        state.message = "Testimonial deleted successfully";
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetTestimonialState } = testimonialSlice.actions;
export default testimonialSlice.reducer;
