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

// 1️⃣ Fetch Active Leaders (FRONTEND - Public)
export const fetchActiveLeaders = createAsyncThunk(
  "leadership/fetchActive",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/about/active-leaders");
      return res.data;
    } catch (error) {
      const message = getThunkError(error, "Failed to fetch active leaders");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Fetch All Leaders (ADMIN)
export const fetchAllLeaders = createAsyncThunk(
  "leadership/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/about/all-leaders");
      return res.data;
    } catch (error) {
      const message = getThunkError(error, "Failed to fetch all leaders");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Create Global Leader (ADMIN)
export const createLeader = createAsyncThunk(
  "leadership/create",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/admin/about/create-leader", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (error) {
      const message = getThunkError(error, "Leader creation failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Update Global Leader (ADMIN)
export const updateLeader = createAsyncThunk(
  "leadership/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(`/admin/about/update-leader/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (error) {
      const message = getThunkError(error, "Leader update failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 5️⃣ Delete Global Leader (ADMIN)
export const deleteLeader = createAsyncThunk(
  "leadership/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/admin/about/delete-leader/${id}`);
      return id;
    } catch (error) {
      const message = getThunkError(error, "Leader deletion failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
   SLICE (State Management)
===================================================== */

const globalLeadershipSlice = createSlice({
  name: "globalLeadership",
  initialState: {
    // Admin States
    leaders: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

    // Frontend (Active) States - தனித்தனியாகப் பிரிக்கப்பட்டுள்ளது
    activeLeaders: [],
    isActiveLoading: false,
    isActiveSuccess: false,
    isActiveError: false,
    activeMessage: "",
  },
  reducers: {
    resetLeadershipState: (state) => {
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
      /* === FETCH ACTIVE LEADERS (PUBLIC) === */
      .addCase(fetchActiveLeaders.pending, (state) => {
        state.isActiveLoading = true;
        state.isActiveError = false;
      })
      .addCase(fetchActiveLeaders.fulfilled, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveSuccess = true;
        state.activeLeaders = action.payload;
      })
      .addCase(fetchActiveLeaders.rejected, (state, action) => {
        state.isActiveLoading = false;
        state.isActiveError = true;
        state.activeMessage = action.payload;
      })

      /* === FETCH ALL LEADERS (ADMIN) === */
      .addCase(fetchAllLeaders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllLeaders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leaders = action.payload;
      })
      .addCase(fetchAllLeaders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === CREATE LEADER (ADMIN) === */
      .addCase(createLeader.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLeader.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leaders.push(action.payload);
        state.message = "Leader created successfully";
      })
      .addCase(createLeader.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === UPDATE LEADER (ADMIN) === */
      .addCase(updateLeader.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLeader.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.leaders.findIndex(
          (l) => l.id === action.payload.id
        );
        if (index !== -1) {
          state.leaders[index] = action.payload;
        }
        state.message = "Leader updated successfully";
      })
      .addCase(updateLeader.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* === DELETE LEADER (ADMIN) === */
      .addCase(deleteLeader.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLeader.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leaders = state.leaders.filter((l) => l.id !== action.payload);
        state.message = "Leader deleted successfully";
      })
      .addCase(deleteLeader.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetLeadershipState } = globalLeadershipSlice.actions;
export default globalLeadershipSlice.reducer;
