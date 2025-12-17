import Button from "@mui/material/Button";
import React from "react";
import { useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  createSlide,
  fetchHomeSlides,
  updateSlide,
} from "../../../../redux/AdminHomeSlices/adminHomeSlice";
import { useEffect } from "react";

const initialFormData = {
  title: "",
  description: "",
  slideOrder: 1,
  objectPosition: "center", // Image CSS object-position
  fontVariant: "hero", // normal, highlight, hero
  isActive: true,
  image: null, // File Object
};

const SlideFormModal = ({ isOpen, onClose, slideData, setAlert }) => {
  const { isLoading } = useSelector((state) => state.homeCarosel);
  const [formData, setFormData] = useState(initialFormData);
  const [isImageChange, setIsImageChange] = useState(false); // படம் மாற்றப்பட்டதா?
  const [previewImage, setPreviewImage] = useState(null); // Preview URL/Base URL
  const dispatch = useDispatch();

  console.log(formData);

  const isEditMode = !!slideData; // slideData இருந்தால் Edit Mode

  useEffect(() => {
    if (slideData) {
      setFormData({
        title: slideData.title,
        description: slideData.description,
        // Number-ஆக மாற்றாமல், string-ஆகவே வைத்துக்கொள்ளலாம், API call-இல் FormData அதை சரியாக கையாளும்
        slideOrder: slideData.slideOrder,
        objectPosition: slideData.objectPosition,
        fontVariant: slideData.fontVariant,
        isActive: slideData.isActive,
        image: null, // Edit Mode-இல் file object-ஐ நிரப்பாமல், Preview URL-ஐ மட்டும் பயன்படுத்தலாம்
      });
      // 💡 Preview Image: Edit Mode-இல் இருக்கும் image URL-ஐ preview-க்கு பயன்படுத்தவும்
      setPreviewImage(slideData.image);
      setIsImageChange(false);
    } else {
      setFormData(initialFormData);
      setPreviewImage(null);
      setIsImageChange(false);
    }
  }, [slideData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    // isActive (Select) field-இல் இருந்து வரும் string மதிப்பை Boolean ஆக மாற்றுகிறோம்
    if (name === "isActive") {
      // 'true' என்ற string-ஐ true (Boolean) ஆகவும், 'false' என்ற string-ஐ false (Boolean) ஆகவும் மாற்றும்.
      newValue = value === "true";
    }

    // மற்ற fields (text, number, other selects) value-ஐ அப்படியே எடுத்துக்கொள்ளும்.
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file)); // New Image Preview
    setIsImageChange(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. **Pudhiya FormData Object-ஐ உருவாக்கவும்**
    const apiFormData = new FormData();

    apiFormData.append("title", formData.title);
    apiFormData.append("description", formData.description);
    apiFormData.append("slideOrder", formData.slideOrder);
    apiFormData.append("objectPosition", formData.objectPosition);
    apiFormData.append("fontVariant", formData.fontVariant);
    // 💡 Boolean value-ஐ string ஆக append செய்கிறது (true/false)
    apiFormData.append("isActive", formData.isActive);

    // 3. **Image File-ஐச் சேர்க்கவும்**

    if (isEditMode) {
      if (formData.image) {
        apiFormData.append("image", formData.image);
      }
    } else {
      if (!formData.image) {
        alert("Image is required for a new slide.");
        return;
      }
      apiFormData.append("image", formData.image);
    }

    // 4. **API Call Dispatch**

    const successMessage = isEditMode
      ? "Slide successfully updated!"
      : "New slide successfully created!";

    // 💡 Dispatch செய்ய வேண்டிய action-ஐ தீர்மானிக்கவும்
    const action = isEditMode
      ? updateSlide({ id: slideData.id, formData: apiFormData })
      : createSlide(apiFormData); // 💡 createSlide action சேர்க்கப்பட்டுள்ளது

    dispatch(action)
      .unwrap() // Thunk Success/Failure-ஐ கையாள
      .then(() => {
        dispatch(fetchHomeSlides());
        onClose(); // வெற்றியடைந்தால் Modal-ஐ மூடுக
        if (setAlert) {
          setAlert({ type: "success", message: successMessage });
        }
      })
      .catch((error) => {
        // ❌ Error: Error Message-ஐக் காட்டுக
        // error.message அல்லது API response-இல் இருந்து கிடைக்கும் error message-ஐப் பயன்படுத்தலாம்.
        const errorMessage = error.message || "An unknown error occurred.";
        if (setAlert) {
          setAlert({ type: "error", message: `Failed: ${errorMessage}` });
        }
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50 pt-12 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          {isEditMode ? "Edit Carousel Slide" : "Create New Slide"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
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
          {/* Image Upload */}
          <div className="mb-6 border p-4 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isEditMode ? "Change Image (Optional)" : "Slide Image *"}
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required={!isEditMode || (isEditMode && isImageChange)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              accept="image/*"
            />
            {previewImage && (
              <div className="mt-3 relative w-full h-40 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <span className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded">
                  Preview
                </span>
              </div>
            )}
          </div>

          {/* Layout Controls: Order, Position, Font */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/* Slide Order */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Order
              </label>
              <input
                type="number"
                name="slideOrder"
                value={formData.slideOrder}
                onChange={handleChange}
                min="1"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            {/* Object Position */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Image Position
              </label>
              <select
                name="objectPosition"
                value={formData.objectPosition}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            {/* Font Variant (Updated) */}
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
                <option value="normal">Normal (Small Text)</option>
                {/* Model enum: highlight */}
                <option value="highlight">Highlight (Medium Text)</option>
                {/* Model enum: hero (Default) */}

                <option value="hero">Hero (Large Text)</option>
              </select>
            </div>

            {/* Is Active (Updated to Select) */}
            <div className="mb-6">
              <label
                htmlFor="isActive"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="isActive"
                name="isActive"
                // Boolean value-ஐ string ஆக convert செய்து Select value-இல் காட்டுகிறோம்
                value={formData.isActive.toString()}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
              >
                <option value="true">Active</option>

                <option value="false">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end items-center">
              <div>
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center"
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    <FaCloudUploadAlt className="mr-2" />
                  )}
                  {isEditMode
                    ? isLoading
                      ? "Updating..."
                      : "Update"
                    : isLoading
                    ? "Creating..."
                    : "Create"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlideFormModal;
