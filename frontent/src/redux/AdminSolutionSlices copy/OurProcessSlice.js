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

export const fetchOurProcess = createAsyncThunk(
  "ourProcess/fetchContent",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/ourprocess-all");
      //console.log(response.data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Welcome Content fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createOurProcess = createAsyncThunk(
  "ourProcess/createContent",
  async (contentData, thunkAPI) => {
    try {
      const response = await api.post("/admin/ourprocess-create", contentData);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Welcome Content create error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateOurProcess = createAsyncThunk(
  "ourProcess/updateContent",
  async ({ id, data }, thunkAPI) => {
    try {
      //console.log(data);
      const response = await api.put(`/admin/ourprocess-update/${id}`, data);

      //console.log(response.data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Welcome Content Update Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteOurProcess = createAsyncThunk(
  "ourProcess/deleteContent",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/ourprocess-delete/${id}`);
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
  ourProcess: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// ----------------------------------------------------
// 3. SLICE DEFINITION
// ----------------------------------------------------

export const OurProcess = createSlice({
  name: "ourProcess",
  initialState,
  reducers: {
    resetOurProcessState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= FETCH CONTENT STATUS =================
      .addCase(fetchOurProcess.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(fetchOurProcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ourProcess = action.payload;
        state.message = ""; // Success message-ஐ fetch-க்கு வைக்கத் தேவையில்லை
      })
      .addCase(fetchOurProcess.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
        state.ourProcess = []; // Error-இல் array-ஐ காலி செய்யலாம்
      })
      // ================= CREATE CONTENT STATUS =================
      .addCase(createOurProcess.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(createOurProcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Welcome Content created successfully.";

        // response-இன் structure-ஐப் பொறுத்து .content-ஐப் பயன்படுத்துகிறோம்
        const newContent = action.payload.content;
        if (newContent) {
          state.ourProcess.push(newContent);
        }
      })
      .addCase(createOurProcess.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })
      // ================= UPDATE CONTENT STATUS =================
      .addCase(updateOurProcess.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(updateOurProcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Welcome Content updated successfully.";

        // புதுப்பிக்கப்பட்ட entry-ஐ list-இல் மாற்றுகிறோம்
        const updatedContent = action.payload.content;
        const index = state.ourProcess.findIndex(
          (content) => content.id === updatedContent.id
        );

        if (index !== -1) {
          state.ourProcess[index] = updatedContent;
        }
      })
      .addCase(updateOurProcess.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      })
      // ================= DELETE CONTENT STATUS =================
      .addCase(deleteOurProcess.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset status
        state.isError = false; // Reset status
      })
      .addCase(deleteOurProcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Welcome Content deleted successfully.";
        // நீக்கப்பட்ட ID-ஐப் பயன்படுத்தி list-இல் இருந்து நீக்குகிறோம்
        state.ourProcess = state.ourProcess.filter(
          (content) => content.id !== action.payload
        );
      })
      .addCase(deleteOurProcess.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Failure-இல் success false
        state.message = action.payload;
      });
  },
});

export const { resetOurProcessState } = OurProcess.actions;
export default OurProcess.reducer;
