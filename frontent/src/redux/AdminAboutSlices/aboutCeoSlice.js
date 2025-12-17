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

export const fetchCeoMessages = createAsyncThunk(
  "ceoContent/fetchMessages",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/about-ceo");
      console.log(res.data);
      return res.data; // Slides data-vai return pannudhu
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "CEO Message fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Create CEO Message (ADMIN)
// URL: /api/admin/create-ceo
export const createCeoMessage = createAsyncThunk(
  "ceoContent/createMessage",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/admin/create-ceo", formData, {
        headers: {
          // ⚠️ FormData-வைப் பயன்படுத்தும் போது Content-Type: multipart/form-data அவசியம்
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.data);
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "CEO Message create error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Update CEO Message (ADMIN)
// URL: /api/admin/update-ceo/:id
export const updateCeoMessage = createAsyncThunk(
  "ceoContent/updateMessage",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(`/admin/update-ceo/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "CEO Message Update Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Delete CEO Message (ADMIN)
// URL: /api/admin/delete-ceo/:id
export const deleteCeoMessage = createAsyncThunk(
  "ceoContent/deleteMessage",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/delete-ceo/${id}`);
      console.log(id);
      return id;
    } catch (error) {
      // 🚨 AdminAuth style error handling
      const message = getThunkError(error, "CEO Message Delete Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
   SLICE (State Management)
===================================================== */

const ceoMessageSlice = createSlice({
  name: "ceoContent",
  initialState: {
    messages: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    // Ellam status-ayum default value-ku reset panna
    resetCeoState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      /* ================= FETCH SLIDES STATUS ================= */
      .addCase(fetchCeoMessages.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(fetchCeoMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(fetchCeoMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })

      /* ================= CREATE SLIDE STATUS ================= */
      .addCase(createCeoMessage.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(createCeoMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.message = "Slide Created Successfull.";
        // 🚨 முக்கிய மாற்றம்: புதிதாக உருவாக்கப்பட்ட ஸ்லைடை state.slides Array-இல் சேர்க்கவும்
        const newSlide = action.payload; // API response-இல் புதிதாகச் உருவாக்கப்பட்ட ஸ்லைடு டேட்டா இருக்க வேண்டும்.
        if (newSlide) {
          state.messages.push(newSlide);
        }
      })
      .addCase(createCeoMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })

      /* ================= UPDATE SLIDE STATUS ================= */
      .addCase(updateCeoMessage.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(updateCeoMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Slide Update Successfull";

        const updatedSlide = action.payload;

        const index = state.messages.findIndex(
          (slide) => slide.id === updatedSlide.id
        );

        if (index !== -1) {
          state.messages[index] = updatedSlide;
        }
      })
      .addCase(updateCeoMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })
      /* ================= DELETE SLIDE STATUS ================= */
      .addCase(deleteCeoMessage.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(deleteCeoMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = state.messages.filter(
          (slide) => slide.id !== action.payload
        );
        state.message = "Slide Delete Successfull";
      })
      .addCase(deleteCeoMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      });
  },
});

export const { resetCeoState } = ceoMessageSlice.actions;
export default ceoMessageSlice.reducer;
