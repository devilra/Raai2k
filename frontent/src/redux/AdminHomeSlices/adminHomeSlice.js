import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

/* =====================================================
   ASYNC THUNKS
===================================================== */

// 1️⃣ Get Active Slides (PUBLIC - Home Page)
// 1️⃣ Fetch Active Slides (PUBLIC)
// Home page-la kaatura active slides-a eduka use aagudhu.
// Admin auth illama, yaar venumnaalum idha access pannalam.

// ---------------------------
// Error Message Retrieval Logic (AdminAuth-இல் உள்ளதைப் போன்றது)
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

export const fetchHomeSlides = createAsyncThunk(
  "homeContent/fetchSlides",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin");
      console.log(res.data);
      return res.data; // Slides data-vai return pannudhu
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "Slides fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Fetch ACTIVE Slides (PUBLIC) - Home Page-க்காக
export const fetchActiveSlides = createAsyncThunk(
  "homeContent/fetchActiveSlides",
  async (_, thunkAPI) => {
    try {
      // நாங்கள் உருவாக்கிய புதிய Route: router.get("/active", getActiveSlides);
      const res = await api.get("/admin/active");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getThunkError(error, "Fetch Active Slides Error")
      );
    }
  }
);

// 2️⃣ Create Slide (ADMIN)
export const createSlide = createAsyncThunk(
  "homeContent/createSlide",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/admin/createSlides", formData, {
        headers: {
          // ⚠️ FormData-வைப் பயன்படுத்தும் போது Content-Type: multipart/form-data அவசியம்
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.slide);
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "Slide create error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Update Slide (ADMIN)
export const updateSlide = createAsyncThunk(
  "homeContent/updateSlide",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(`/admin/updateSlide/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.slide);
      return res.data.slide;
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "Slide Update Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Delete Slide (ADMIN)
export const deleteSlide = createAsyncThunk(
  "homeContent/deleteSlide",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/deleteSlide/${id}`);
      console.log(id);
      return id;
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "Slide Delete Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
   SLICE (State Management)
===================================================== */

const homeContentSlice = createSlice({
  name: "homeCarosel",
  initialState: {
    slides: [], // Admin-க்கான எல்லா ஸ்லைடுகளும்
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    // Frontend (Home Page) States - தனித்தனியாக
    activeSlides: [],
    isHomeLoading: false,
    homeError: null,
  },
  reducers: {
    // Ellam status-ayum default value-ku reset panna
    resetHomeContentState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isHomeLoading = false; // இதையும் சேர்த்து reset செய்யணும்
      state.homeError = null;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      /* ================= FETCH SLIDES STATUS ================= */
      .addCase(fetchHomeSlides.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(fetchHomeSlides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.slides = action.payload;
      })
      .addCase(fetchHomeSlides.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })

      /* --- FETCH ACTIVE SLIDES (Frontend / Home Page) --- */
      .addCase(fetchActiveSlides.pending, (state) => {
        state.isHomeLoading = true; // தனி Loading
        state.homeError = null;
      })
      .addCase(fetchActiveSlides.fulfilled, (state, action) => {
        state.isHomeLoading = false; // Stop Loading
        state.activeSlides = action.payload;
      })
      .addCase(fetchActiveSlides.rejected, (state, action) => {
        state.isHomeLoading = false;
        state.homeError = action.payload; // தனி Error Message
      })

      /* ================= CREATE SLIDE STATUS ================= */
      .addCase(createSlide.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(createSlide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.message = "Slide Created Successfull.";
        // 🚨 முக்கிய மாற்றம்: புதிதாக உருவாக்கப்பட்ட ஸ்லைடை state.slides Array-இல் சேர்க்கவும்
        const newSlide = action.payload; // API response-இல் புதிதாகச் உருவாக்கப்பட்ட ஸ்லைடு டேட்டா இருக்க வேண்டும்.
        if (newSlide) {
          state.slides.push(newSlide);
        }
      })
      .addCase(createSlide.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })

      /* ================= UPDATE SLIDE STATUS ================= */
      .addCase(updateSlide.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(updateSlide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Slide Update Successfull";

        const updatedSlide = action.payload;

        const index = state.slides.findIndex(
          (slide) => slide.id === updatedSlide.id
        );

        if (index !== -1) {
          state.slides[index] = updatedSlide;
        }
      })
      .addCase(updateSlide.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })
      /* ================= DELETE SLIDE STATUS ================= */
      .addCase(deleteSlide.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(deleteSlide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.slides = state.slides.filter(
          (slide) => slide.id !== action.payload
        );
        state.message = "Slide Delete Successfull";
      })
      .addCase(deleteSlide.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      });
  },
});

export const { resetHomeContentState } = homeContentSlice.actions;
export default homeContentSlice.reducer;
