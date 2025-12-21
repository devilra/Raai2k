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

  // Server-இல் இருந்து message கிடைக்கவில்லை என்றால் default message-ஐ பயன்படுத்தவும்
  return message === "Request failed with status code 401"
    ? defaultMessage
    : message;
};

/* =====================================================
    ASYNC THUNKS (API Calls)
===================================================== */

// 1️⃣ Fetch ALL Solution Banners (ADMIN - List Mode)
export const fetchAllSolutionBanners = createAsyncThunk(
  "solutionBanner/fetchAll",
  async (_, thunkAPI) => {
    try {
      // 💡 Admin Route: /api/admin/solution-banner/solutionbanner-all
      const res = await api.get("/admin/solutionbanner-all");
      //console.log(res.data);
      return res.data; // Array of all banners
    } catch (error) {
      const message = getThunkError(error, "Solution Banners fetch Error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2️⃣ Fetch Active Solution Banners (PUBLIC - UI)
export const fetchPublishedSolutionBanner = createAsyncThunk(
  "solutionBanner/fetchPublished",
  async (_, thunkAPI) => {
    try {
      // 💡 Public Route: /api/solution-banner/solutionbanner-active
      // உங்கள் Routes-இல் /api/solution-banner/solutionbanner-active என்று Public Route அமைத்துள்ளீர்கள்.
      const res = await api.get("/admin/solutionbanner-active");
      return res.data; // Array of active banners
    } catch (error) {
      const message = getThunkError(
        error,
        "Published Solution Banner fetch Error"
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3️⃣ Create Solution Banner (ADMIN)
export const createSolutionBanner = createAsyncThunk(
  "solutionBanner/create",
  async (formData, thunkAPI) => {
    try {
      // 💡 Admin Route: /api/admin/solution-banner/solutionbanner-create
      const res = await api.post("/admin/solutionbanner-create", formData, {
        headers: {
          // ⚠️ FormData-வைப் பயன்படுத்தும் போது Content-Type: multipart/form-data அவசியம்
          "Content-Type": "multipart/form-data",
        },
      });
      // Controller-இல் content: newBanner என்று இருப்பதால், அதை return செய்கிறோம்
      return res.data.content;
    } catch (error) {
      //console.log(error.message);
      const message = getThunkError(error, "Solution Banner creation failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4️⃣ Update Solution Banner (ADMIN)
export const updateSolutionBanner = createAsyncThunk(
  "solutionBanner/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      // 💡 Admin Route: /api/admin/solution-banner/solutionbanner-update/:id
      const res = await api.put(
        `/admin/solutionbanner-update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Controller-இல் content: banner என்று இருப்பதால், அதை return செய்கிறோம்
      return res.data.content;
    } catch (error) {
      const message = getThunkError(error, "Solution Banner update failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 5️⃣ Delete Solution Banner (ADMIN)
export const deleteSolutionBanner = createAsyncThunk(
  "solutionBanner/delete",
  async (id, thunkAPI) => {
    try {
      // 💡 Admin Route: /api/admin/solution-banner/solutionbanner-delete/:id
      await api.delete(`/admin/solutionbanner-delete/${id}`);
      return id; // id-ஐ மட்டும் திரும்ப அனுப்பினால், state-ல் இருந்து நீக்கலாம்
    } catch (error) {
      const message = getThunkError(error, "Solution Banner deletion failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* =====================================================
    SLICE (State Management)
===================================================== */

const solutionBannerSlice = createSlice({
  name: "solutionBanner",
  initialState: {
    // 'banners' என்பது Admin list மற்றும் Public list இரண்டிற்கும் பயன்படுத்தப்படும்.
    banners: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetSolutionBannerState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= FETCH ALL / PUBLISHED BANNERS STATUS ================= */
      // Fetch All (Admin) மற்றும் Fetch Published (Public) இரண்டிற்கும் பொதுவான Logic பயன்படுத்தப்பட்டுள்ளது.

      // Fetch All Banners
      .addCase(fetchAllSolutionBanners.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchAllSolutionBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.banners = action.payload; // All banners array
      })
      .addCase(fetchAllSolutionBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.banners = [];
        state.message = action.payload;
      })

      // Fetch Published Banners
      .addCase(fetchPublishedSolutionBanner.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchPublishedSolutionBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.banners = action.payload; // Active banners array
      })
      .addCase(fetchPublishedSolutionBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.banners = [];
        state.message = action.payload;
      })

      /* ================= CREATE BANNER STATUS (ADMIN) ================= */
      .addCase(createSolutionBanner.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createSolutionBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Solution Banner created successfully.";

        // புதிதாக உருவாக்கப்பட்ட பேனரை Array-இல் சேர்க்கவும்
        const newBanner = action.payload;
        if (newBanner) {
          // இது Admin List-ஐ மட்டுமே update செய்யும், Public List-க்கு fetchPublishedSolutionBanner மீண்டும் அழைக்கப்பட வேண்டும்
          state.banners.push(newBanner);
        }
      })
      .addCase(createSolutionBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* ================= UPDATE BANNER STATUS (ADMIN) ================= */
      .addCase(updateSolutionBanner.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateSolutionBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Solution Banner updated successfully";

        const updatedBanner = action.payload;

        // Array-இல் உள்ள பழைய பேனரை புதிய data மூலம் மாற்றவும்
        const index = state.banners.findIndex(
          (banner) => banner.id === updatedBanner.id
        );

        if (index !== -1) {
          state.banners[index] = updatedBanner;
        }
      })
      .addCase(updateSolutionBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* ================= DELETE BANNER STATUS (ADMIN) ================= */
      .addCase(deleteSolutionBanner.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteSolutionBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Solution Banner deleted successfully";

        // நீக்கப்பட்ட id-ஐத் தவிர மற்றவற்றை மட்டும் Array-இல் வைக்கவும்
        state.banners = state.banners.filter(
          (banner) => banner.id !== action.payload
        );
      })
      .addCase(deleteSolutionBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetSolutionBannerState } = solutionBannerSlice.actions;
export default solutionBannerSlice.reducer;
