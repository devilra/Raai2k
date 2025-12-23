import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// ----------------------------------------------------
// 1. ERROR HELPER
// ----------------------------------------------------
const getThunkError = (error, defaultMessage) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

  return message === "Request failed with status code 401"
    ? defaultMessage
    : message;
};

// ----------------------------------------------------
// 2. ASYNC THUNKS (API Calls)
// ----------------------------------------------------

// Admin: அனைத்து Video Content-களையும் பெறுதல்
export const fetchVideoContent = createAsyncThunk(
  "video/fetchContent",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/home/video-all");
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Video Content fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Frontend: Active Video Content-ஐ மட்டும் பெறுதல்
export const fetchActiveVideo = createAsyncThunk(
  "video/fetchActive",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/home/video-active");
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Active Video fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin: புதிய Video Content உருவாக்குதல்
export const createVideoContent = createAsyncThunk(
  "video/createContent",
  async (contentData, thunkAPI) => {
    try {
      const response = await api.post("/admin/home/video-create", contentData);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Video Content create error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin: Video Content-ஐப் புதுப்பித்தல்
export const updateVideoContent = createAsyncThunk(
  "video/updateContent",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(`/admin/home/video-content/${id}`, data);
      return response.data;
    } catch (error) {
      const message = getThunkError(error, "Video Content Update Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin: Video Content-ஐ நீக்குதல்
export const deleteVideoContent = createAsyncThunk(
  "video/deleteContent",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/home/video-content/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Video Content Delete Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ----------------------------------------------------
// 3. INITIAL STATE
// ----------------------------------------------------
const initialState = {
  // Admin States
  videoContents: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",

  // Frontend (Active) States
  activeVideo: [],
  isActiveLoading: false,
  isActiveSuccess: false,
  isActiveError: false,
  activeMessage: "",
};

// ----------------------------------------------------
// 4. SLICE DEFINITION
// ----------------------------------------------------
export const videoContentSlice = createSlice({
  name: "videoContent",
  initialState,
  reducers: {
    resetVideoContentState: (state) => {
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
      // ================= FETCH ALL (Admin) =================
      .addCase(fetchVideoContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVideoContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.videoContents = action.payload;
      })
      .addCase(fetchVideoContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= FETCH ACTIVE (Frontend) =================
      .addCase(fetchActiveVideo.pending, (state) => {
        state.isActiveLoading = true;
      })
      .addCase(fetchActiveVideo.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeVideo = action.payload;
      })
      .addCase(fetchActiveVideo.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      // ================= CREATE CONTENT =================
      .addCase(createVideoContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVideoContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Video Content created successfully.";
        const newContent = action.payload.content;
        if (newContent) {
          state.videoContents.push(newContent);
        }
      })
      .addCase(createVideoContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= UPDATE CONTENT =================
      .addCase(updateVideoContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVideoContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Video Content updated successfully.";
        const updatedContent = action.payload.content;
        const index = state.videoContents.findIndex(
          (content) => content.id === updatedContent.id
        );
        if (index !== -1) {
          state.videoContents[index] = updatedContent;
        }
      })
      .addCase(updateVideoContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= DELETE CONTENT =================
      .addCase(deleteVideoContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVideoContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Video Content deleted successfully.";
        state.videoContents = state.videoContents.filter(
          (content) => content.id !== action.payload
        );
      })
      .addCase(deleteVideoContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetVideoContentState } = videoContentSlice.actions;
export default videoContentSlice.reducer;
