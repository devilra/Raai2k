import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  createServiceBanner,
  fetchAllServiceBanners,
  updateServiceBanner,
} from "../../../../redux/AdminServiceSlice/ServiceBannerSlice";

const initialFormData = {
  title: "",
  description: "",
  fontVariant: "hero",
  isActive: true,
  image: null,
};

const ServiceBannerForm = ({
  isOpen,
  onClose,
  serviceBannerData,
  setAlert,
}) => {
  const { isLoading } = useSelector((state) => state.serviceBanner);
  const [formData, setFormData] = useState(initialFormData);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();

  const isEditMode = !!serviceBannerData;

  useEffect(() => {
    if (serviceBannerData) {
      setFormData({
        title: serviceBannerData.title,
        description: serviceBannerData.description,
        fontVariant: serviceBannerData.fontVariant,
        isActive: serviceBannerData.isActive,
        image: null,
      });
      setPreviewImage(serviceBannerData.image);
    } else {
      setFormData(initialFormData);
      setPreviewImage(null);
    }
  }, [serviceBannerData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "isActive") {
      newValue = value === "true";
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiFormData = new FormData();
    apiFormData.append("title", formData.title);
    apiFormData.append("description", formData.description);
    apiFormData.append("fontVariant", formData.fontVariant);
    apiFormData.append("isActive", formData.isActive);

    if (formData.image) {
      apiFormData.append("image", formData.image);
    }

    const successMessage = isEditMode
      ? "Service Banner successfully updated!"
      : "New Service Banner successfully created!";

    const action = isEditMode
      ? updateServiceBanner({ id: serviceBannerData.id, formData: apiFormData })
      : createServiceBanner(apiFormData);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(fetchAllServiceBanners());
        onClose();
        if (setAlert) setAlert({ type: "success", message: successMessage });
      })
      .catch((error) => {
        if (setAlert) setAlert({ type: "error", message: `Failed: ${error}` });
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pt-12 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          {isEditMode ? "Edit Service Banner" : "Create New Service Banner"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows="3"
            ></textarea>
          </div>

          <div className="border p-4 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              accept="image/*"
            />
            {previewImage && (
              <div className="mt-3 relative w-full h-40 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Font Variant
              </label>
              <select
                name="fontVariant"
                value={formData.fontVariant}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
              >
                <option value="hero">Hero</option>
                <option value="highlight">Highlight</option>
                <option value="normal">Normal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="isActive"
                value={formData.isActive.toString()}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={onClose}
              className="mr-3 text-gray-700 border-gray-300"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaCloudUploadAlt className="mr-2" />
              )}
              {isEditMode ? "Update Banner" : "Create Banner"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceBannerForm;
