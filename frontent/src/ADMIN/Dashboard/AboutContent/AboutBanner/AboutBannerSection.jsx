import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// 💡 உங்கள் Redux Path-ஐ மாற்றவும்
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { FaEdit } from "react-icons/fa";
import {
  deleteAboutBanner,
  fetchAllAboutBanners,
  resetAboutBannerState,
} from "../../../../redux/AdminAboutSlices/aboutBannerSlice";
import AboutBannerForm from "./AboutBannerContactForm";

// MUI Alert Component-ஐ எளிதாகப் பயன்படுத்த ஒரு Helper Component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AboutBannerSection = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null); // Edit செய்யும்போது பயன்படுத்த

  // ----------------------------------------------------
  // 💡 Snackbar State Management
  // ----------------------------------------------------
  const [snackOpen, setSnackOpen] = useState(false); // snackbar
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("info"); // 'success', 'error', 'warning', 'info'

  // 💡 solutionBanner state-ஐப் பயன்படுத்துகிறோம்
  const { AboutBanners, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.aboutBanner // 💡 Redux Store-இல் உள்ள solutionBanner slice name
  );

  // ----------------------------------------------------
  // 1. Initial Data Fetch (பேனர்களைப் பெறுதல்)
  // ----------------------------------------------------
  useEffect(() => {
    // Admin List-க்கான API அழைப்பு
    dispatch(fetchAllAboutBanners());
  }, [dispatch]);

  // ----------------------------------------------------
  // 2. Status / Message Handling (Toast Notifications)
  // ----------------------------------------------------
  useEffect(() => {
    if (isError && message) {
      setSnackType("error");
      setSnackMsg(message);
      setSnackOpen(true);
    }

    if (isSuccess && message) {
      if (message !== "") {
        setSnackType("success");
        setSnackMsg(message);
        setSnackOpen(true);
      }
    }

    // CRUD operations முடிந்த பிறகு state-ஐ reset செய்ய
    // Note: Reset செய்த பிறகு دوباره fetch செய்ய மாட்டோம், ஏனெனில் CRUD fulfilled-இல் state update செய்யப்பட்டுள்ளது.
    if (isSuccess || isError) {
      dispatch(resetAboutBannerState());
    }
  }, [isError, isSuccess, message, dispatch]);

  // Snackbar close handler
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  // ----------------------------------------------------
  // 3. Handlers
  // ----------------------------------------------------

  // 💡 setAlert Helper Function
  const setAlert = ({ type, message }) => {
    setSnackType(type);
    setSnackMsg(message);
    setSnackOpen(true);
  };

  const handleAddBanner = () => {
    setCurrentBanner(null);
    setIsModalOpen(true);
  };

  const handleEditBanner = (banner) => {
    setCurrentBanner(banner);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this Solution Banner?")
    ) {
      dispatch(deleteAboutBanner(id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentBanner(null);
  };

  if (isLoading && AboutBanners.length === 0) {
    // Initial load-க்கு மட்டும் Loading காட்டு
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl" />{" "}
        <p className="ml-2">Loading Solution Banners...</p>
      </div>
    );
  }

  // 💡 Table Content-ஐ Solution Banner Model-க்கு ஏற்ப மாற்றியுள்ளேன்
  return (
    <div>
      <div className="p-6 ">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            About Banner Management
          </h2>
          <Button variant="contained" onClick={handleAddBanner}>
            <FaPlus className="mr-2" /> New Banner
          </Button>
        </header>

        {/* Banner List Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {/* Solution Banner-இல் Order தேவையில்லை, Title/Description போதும் */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title / Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Font Variant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {AboutBanners.length > 0 ? (
                // 💡 banners (slides அல்ல) பயன்படுத்துகிறோம்
                AboutBanners.map((banner) => (
                  <tr key={banner.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Image Optional என்பதால், check செய்கிறோம் */}
                      {banner.image ? (
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-20 h-12 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <div className="text-sm font-semibold text-gray-900 truncate">
                        {banner.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {banner.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {banner.fontVariant || "hero"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {banner.isActive ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        onClick={() => handleEditBanner(banner)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4 rounded hover:bg-gray-100"
                        title="Edit Banner"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        color="error"
                        onClick={() => handleDelete(banner.id)}
                        className="text-red-600 hover:text-red-900 rounded hover:bg-gray-100"
                        title="Delete Banner"
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Solution Banners found. Click 'New Banner' to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AboutBannerForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        aboutBannerData={currentBanner} // slideData-க்கு பதிலாக bannerData
        setAlert={setAlert}
      />

      {/* 💡 MUI Snackbar Component */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000} // 4 seconds
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackType} // 'success', 'error'
          elevation={6}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AboutBannerSection;
