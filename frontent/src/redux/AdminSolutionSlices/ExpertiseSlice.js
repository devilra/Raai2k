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

export const fetchExpertise = createAsyncThunk(
  "expertise/fetchExpertise",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/expertise");
      console.log(res.data);
      return res.data; // Slides data-vai return pannudhu
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "Expertise fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Create Slide (ADMIN)
export const createExpertise = createAsyncThunk(
  "expertise/createExpertise",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/admin/create-expertise", formData, {
        headers: {
          // ⚠️ FormData-வைப் பயன்படுத்தும் போது Content-Type: multipart/form-data அவசியம்
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.slide);
      return res.data.slide;
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "Expertise create error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Update Slide (ADMIN)
export const updateExpertise = createAsyncThunk(
  "expertise/updateExpertise",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(`/admin/update-expertise/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.slide);
      return res.data.slide;
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "Expertise Update Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Delete Slide (ADMIN)
export const deleteExpertise = createAsyncThunk(
  "expertise/deleteExpertise",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/delete-expertise/${id}`);
      //console.log(id);
      return id;
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "Expertise Delete Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
   SLICE (State Management)
===================================================== */

const Expertise = createSlice({
  name: "expertise",
  initialState: {
    expertises: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    // Ellam status-ayum default value-ku reset panna
    resetExpertiseState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      /* ================= FETCH SLIDES STATUS ================= */
      .addCase(fetchExpertise.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(fetchExpertise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expertises = action.payload;
      })
      .addCase(fetchExpertise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })

      /* ================= CREATE SLIDE STATUS ================= */
      .addCase(createExpertise.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(createExpertise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.message = "Slide Created Successfull.";
        // 🚨 முக்கிய மாற்றம்: புதிதாக உருவாக்கப்பட்ட ஸ்லைடை state.slides Array-இல் சேர்க்கவும்
        const newSlide = action.payload; // API response-இல் புதிதாகச் உருவாக்கப்பட்ட ஸ்லைடு டேட்டா இருக்க வேண்டும்.
        if (newSlide) {
          state.expertises.push(newSlide);
        }
      })
      .addCase(createExpertise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })

      /* ================= UPDATE SLIDE STATUS ================= */
      .addCase(updateExpertise.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(updateExpertise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Slide Update Successfull";

        const updatedSlide = action.payload;

        const index = state.expertises.findIndex(
          (slide) => slide.id === updatedSlide.id
        );

        if (index !== -1) {
          state.expertises[index] = updatedSlide;
        }
      })
      .addCase(updateExpertise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })
      /* ================= DELETE SLIDE STATUS ================= */
      .addCase(deleteExpertise.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(deleteExpertise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expertises = state.slides.filter(
          (slide) => slide.id !== action.payload
        );
        state.message = "Slide Delete Successfull";
      })
      .addCase(deleteExpertise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      });
  },
});

export const { resetExpertiseState } = Expertise.actions;
export default Expertise.reducer;
