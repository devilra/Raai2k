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
    ASYNC THUNKS
===================================================== */

// 1️⃣ Fetch ALL CEO Messages (ADMIN)
export const fetchCeoMessages = createAsyncThunk(
  "ceoContent/fetchMessages",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/about-ceo");
      return res.data;
    } catch (error) {
      const message = getThunkError(error, "CEO Message fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Fetch ACTIVE CEO Message (FRONTEND)
// குறிப்பு: உங்கள் Backend-இல் இதற்கான தனி Route (எ.கா: /admin/about-ceo-active) இருந்தால் மாற்றிக்கொள்ளவும்.
export const fetchActiveCeoMessage = createAsyncThunk(
  "ceoContent/fetchActive",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/active-ceo"); // UI-க்கு மட்டும்
      return res.data;
    } catch (error) {
      const message = getThunkError(error, "Active CEO Message fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Create CEO Message (ADMIN)
export const createCeoMessage = createAsyncThunk(
  "ceoContent/createMessage",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/admin/create-ceo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (error) {
      const message = getThunkError(error, "CEO Message create error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Update CEO Message (ADMIN)
export const updateCeoMessage = createAsyncThunk(
  "ceoContent/updateMessage",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(`/admin/update-ceo/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (error) {
      const message = getThunkError(error, "CEO Message Update Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 5️⃣ Delete CEO Message (ADMIN)
export const deleteCeoMessage = createAsyncThunk(
  "ceoContent/deleteMessage",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/delete-ceo/${id}`);
      return id;
    } catch (error) {
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
    // Admin States
    messages: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

    // Frontend (Active Content) States
    activeMessages: [],
    isActiveLoading: false,
    isActiveSuccess: false,
    isActiveError: false,
    activeMessage: "",
  },
  reducers: {
    resetCeoState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isActiveLoading = false;
      state.isActiveError = false;
    },
  },

  extraReducers: (builder) => {
    builder
      /* --------- ADMIN: FETCH ALL --------- */
      .addCase(fetchCeoMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCeoMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(fetchCeoMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* --------- FRONTEND: FETCH ACTIVE --------- */
      .addCase(fetchActiveCeoMessage.pending, (state) => {
        state.isActiveLoading = true;
      })
      .addCase(fetchActiveCeoMessage.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeMessages = action.payload; // Frontend data
      })
      .addCase(fetchActiveCeoMessage.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      /* --------- ADMIN: CREATE --------- */
      .addCase(createCeoMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "CEO Message Created Successfully.";
        if (action.payload) {
          state.messages.push(action.payload);
        }
      })

      /* --------- ADMIN: UPDATE --------- */
      .addCase(updateCeoMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.messages.findIndex(
          (m) => m.id === action.payload.id
        );
        if (index !== -1) state.messages[index] = action.payload;
      })

      /* --------- ADMIN: DELETE --------- */
      .addCase(deleteCeoMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = state.messages.filter((m) => m.id !== action.payload);
      });
  },
});

export const { resetCeoState } = ceoMessageSlice.actions;
export default ceoMessageSlice.reducer;
