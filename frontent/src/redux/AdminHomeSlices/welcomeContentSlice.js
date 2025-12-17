import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// ----------------------------------------------------
// 1. ASYNC THUNKS (API Calls)
// ----------------------------------------------------

// ---------------------------
// Error Message Retrieval Logic (homeContentSlice-இல் உள்ளதைப் போன்றது)
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

export const fetchWelcomeContent = createAsyncThunk(
  "welcome/fetchContent",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/welcome-all");
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Welcome Content fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createWelcomeContent = createAsyncThunk(
  "welcome/createContent",
  async (contentData, thunkAPI) => {
    try {
      const response = await api.post("/admin/welcome-create", contentData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Welcome Content create error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateWelcomeContent = createAsyncThunk(
  "welcome/updateContent",
  async ({ id, data }, thunkAPI) => {
    try {
      console.log(data);
      const response = await api.put(`/admin/welcome-content/${id}`, data);

      console.log(response.data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Welcome Content Update Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteWelcomeContent = createAsyncThunk(
  "welcome/deleteContent",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/welcome-content/${id}`);
      return id; // வெற்றிகரமாக delete ஆன ID-ஐத் திரும்ப அனுப்பவும்
    } catch (error) {
      const message = getThunkError(error, "Welcome Content Delete Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ----------------------------------------------------
// 2. INITIAL STATE
// ----------------------------------------------------

const initialState = {
  welcomeContents: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// ----------------------------------------------------
// 3. SLICE DEFINITION
// ----------------------------------------------------

export const welcomeContentSlice = createSlice({
  name: "welcomeContent",
  initialState,
  reducers: {
    resetWelcomeContentState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= FETCH CONTENT STATUS =================
      .addCase(fetchWelcomeContent.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(fetchWelcomeContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.welcomeContents = action.payload;
        state.message = ""; // Success message-ஐ fetch-க்கு வைக்கத் தேவையில்லை
      })
      .addCase(fetchWelcomeContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
        state.welcomeContents = []; // Error-இல் array-ஐ காலி செய்யலாம்
      })
      // ================= CREATE CONTENT STATUS =================
      .addCase(createWelcomeContent.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(createWelcomeContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Welcome Content created successfully.";

        // response-இன் structure-ஐப் பொறுத்து .content-ஐப் பயன்படுத்துகிறோம்
        const newContent = action.payload.content;
        if (newContent) {
          state.welcomeContents.push(newContent);
        }
      })
      .addCase(createWelcomeContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })
      // ================= UPDATE CONTENT STATUS =================
      .addCase(updateWelcomeContent.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(updateWelcomeContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Welcome Content updated successfully.";

        // புதுப்பிக்கப்பட்ட entry-ஐ list-இல் மாற்றுகிறோம்
        const updatedContent = action.payload.content;
        const index = state.welcomeContents.findIndex(
          (content) => content.id === updatedContent.id
        );

        if (index !== -1) {
          state.welcomeContents[index] = updatedContent;
        }
      })
      .addCase(updateWelcomeContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })
      // ================= DELETE CONTENT STATUS =================
      .addCase(deleteWelcomeContent.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(deleteWelcomeContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Welcome Content deleted successfully.";
        // நீக்கப்பட்ட ID-ஐப் பயன்படுத்தி list-இல் இருந்து நீக்குகிறோம்
        state.welcomeContents = state.welcomeContents.filter(
          (content) => content.id !== action.payload
        );
      })
      .addCase(deleteWelcomeContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      });
  },
});

export const { resetWelcomeContentState } = welcomeContentSlice.actions;
export default welcomeContentSlice.reducer;
