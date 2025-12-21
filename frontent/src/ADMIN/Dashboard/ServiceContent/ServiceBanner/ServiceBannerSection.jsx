import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import Button from "@mui/material/Button";
import {
  deleteServiceBanner,
  fetchAllServiceBanners,
  resetServiceBannerState,
} from "../../../../redux/AdminServiceSlice/ServiceBannerSlice";
import ServiceBannerForm from "./ServiceBannerForm";
import { FaEdit } from "react-icons/fa";

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const ServiceBannerSection = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: "", type: "info" });

  const { serviceBanners, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.serviceBanner);

  useEffect(() => {
    dispatch(fetchAllServiceBanners());
  }, [dispatch]);

  useEffect(() => {
    if ((isError || isSuccess) && message) {
      setSnack({
        open: true,
        msg: message,
        type: isError ? "error" : "success",
      });
      dispatch(resetServiceBannerState());
    }
  }, [isError, isSuccess, message, dispatch]);

  const setAlert = ({ type, message }) => {
    setSnack({ open: true, msg: message, type });
  };

  const handleAdd = () => {
    setCurrentBanner(null);
    setIsModalOpen(true);
  };

  const handleEdit = (banner) => {
    setCurrentBanner(banner);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this Service Banner?")
    ) {
      dispatch(deleteServiceBanner(id));
    }
  };

  if (isLoading && serviceBanners.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl mb-4" />
        <p>Loading Service Banners...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8 pb-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          Service Banner Management
        </h2>
        <Button variant="contained" onClick={handleAdd} startIcon={<FaPlus />}>
          New Banner
        </Button>
      </header>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Title / Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {serviceBanners.length > 0 ? (
              serviceBanners.map((banner) => (
                <tr key={banner.id}>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900 truncate max-w-xs">
                      {banner.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">
                      {banner.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        banner.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      onClick={() => handleEdit(banner)}
                      className="text-indigo-600"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      onClick={() => handleDelete(banner.id)}
                      color="error"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No Service Banners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ServiceBannerForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceBannerData={currentBanner}
        setAlert={setAlert}
      />

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity={snack.type}>{snack.msg}</Alert>
      </Snackbar>
    </div>
  );
};

export default ServiceBannerSection;
