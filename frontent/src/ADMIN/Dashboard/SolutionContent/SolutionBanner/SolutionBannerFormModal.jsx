import Button from "@mui/material/Button";
import React from "react";
import { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  createSolutionBanner, // Thunk
  fetchAllSolutionBanners, // Thunk
  updateSolutionBanner, // Thunk
} from "../../../../redux/AdminSolutionSlices/solutionBannerSlice"; // 💡 உங்கள் Redux Path-ஐ மாற்றவும்

const initialFormData = {
  title: "",
  description: "",
  fontVariant: "hero", // normal, highlight, hero
  isActive: true,
  image: null, // File Object
};

// 💡 Component Name and Prop names changed: slideData -> bannerData
const SolutionBannerFormModal = ({ isOpen, onClose, bannerData, setAlert }) => {
  // 💡 solutionBanner state-ஐப் பயன்படுத்துகிறோம்
  const { isLoading } = useSelector((state) => state.solutionBanner);
  const [formData, setFormData] = useState(initialFormData);
  const [isImageChange, setIsImageChange] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();

  const isEditMode = !!bannerData; // bannerData இருந்தால் Edit Mode

  // ----------------------------------------------------
  // 1. Initialize Form Data (Edit Mode)
  // ----------------------------------------------------
  useEffect(() => {
    if (bannerData) {
      // 💡 Solution Banner Model-க்கு ஏற்ப fields-ஐ மாற்றவும்
      setFormData({
        title: bannerData.title,
        description: bannerData.description,
        fontVariant: bannerData.fontVariant,
        isActive: bannerData.isActive,
        image: null,
      });
      setPreviewImage(bannerData.image);
      setIsImageChange(false);
    } else {
      setFormData(initialFormData);
      setPreviewImage(null);
      setIsImageChange(false);
    }
  }, [bannerData, isOpen]);

  // ----------------------------------------------------
  // 2. Change Handlers
  // ----------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    // isActive field-இல் இருந்து வரும் string-ஐ Boolean ஆக மாற்றுகிறோம்
    if (name === "isActive") {
      newValue = value === "true";
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
    setIsImageChange(true);
  };

  // ----------------------------------------------------
  // 3. Submit Handler
  // ----------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. **Pudhiya FormData Object-ஐ உருவாக்கவும்**
    const apiFormData = new FormData();

    apiFormData.append("title", formData.title);
    apiFormData.append("description", formData.description);
    apiFormData.append("fontVariant", formData.fontVariant);
    apiFormData.append("isActive", formData.isActive);

    // 💡 Image Optional: Create-இல் image இல்லாமல் இருந்தால் தடுக்க வேண்டாம்.
    if (isEditMode) {
      // Edit Mode: படம் இருந்தால் மட்டும் append செய்கிறோம்
      if (formData.image) {
        apiFormData.append("image", formData.image);
      }
    } else {
      // Create Mode: படம் இருந்தால் append செய்கிறோம்
      if (formData.image) {
        apiFormData.append("image", formData.image);
      }
    }

    // 4. **API Call Dispatch**
    const successMessage = isEditMode
      ? "Solution Banner successfully updated!"
      : "New Solution Banner successfully created!";

    const action = isEditMode
      ? updateSolutionBanner({ id: bannerData.id, formData: apiFormData })
      : createSolutionBanner(apiFormData); // 💡 createSolutionBanner action

    dispatch(action)
      .unwrap()
      .then(() => {
        // Update/Create முடிந்த பிறகு, List-ஐ Refresh செய்ய மீண்டும் fetch செய்கிறோம்.
        dispatch(fetchAllSolutionBanners());
        onClose();
        if (setAlert) {
          setAlert({ type: "success", message: successMessage });
        }
      })
      .catch((error) => {
        const errorMessage = error.message || "An unknown error occurred.";
        if (setAlert) {
          setAlert({ type: "error", message: `Failed: ${errorMessage}` });
        }
      });
  };

  if (!isOpen) return null;

  // 💡 Form Content-ஐ Solution Banner Model-க்கு ஏற்ப மாற்றியுள்ளேன்
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
          {isEditMode ? "Edit Solution Banner" : "Create New Solution Banner"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          {/* space-y-2 -> space-y-4 */}
          {/* Title */}
          <div className="mb-4">
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
          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows="3"
            ></textarea>
          </div>
          {/* Image Upload */}
          <div className="mb-6 border p-4 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isEditMode
                ? "Change Image (Optional)"
                : "Banner Image (Optional)"}
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              accept="image/*"
            />
            {(previewImage || (isEditMode && bannerData.image)) && (
              <div className="mt-3 relative w-full h-40 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={previewImage || bannerData.image}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <span className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded">
                  Preview
                </span>
              </div>
            )}
          </div>
          {/* Controls: Font Variant & Is Active */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Font Variant */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Font Size / Variant
              </label>
              <select
                name="fontVariant"
                value={formData.fontVariant}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
              >
                <option value="hero">Hero</option>
                <option value="highlight">Highlight</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            {/* Is Active */}
            <div className="col-span-1">
              <label
                htmlFor="isActive"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="isActive"
                name="isActive"
                value={formData.isActive.toString()}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 flex gap-2 items-center"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaCloudUploadAlt className="mr-2" />
              )}
              {isEditMode
                ? isLoading
                  ? "Updating..."
                  : "Update Banner"
                : isLoading
                ? "Creating..."
                : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SolutionBannerFormModal;
