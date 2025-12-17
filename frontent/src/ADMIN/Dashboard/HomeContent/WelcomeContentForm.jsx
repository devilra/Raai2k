import Button from "@mui/material/Button";
import React from "react";
import { useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import {
  createWelcomeContent,
  fetchWelcomeContent,
  updateWelcomeContent,
} from "../../../redux/AdminHomeSlices/welcomeContentSlice";

const initialFormData = {
  mainHeading: "",
  subText: "",
  order: 1,
  sectionActive: true,
};

const WelcomeContentForm = ({ isOpen, onClose, welcomeData, setAlert }) => {
  const { isLoading } = useSelector((state) => state.welcomeContent);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  //console.log(formData);

  const isEditMode = !!welcomeData; // slideData இருந்தால் Edit Mode

  useEffect(() => {
    if (welcomeData) {
      setFormData({
        mainHeading: welcomeData.mainHeading || "",
        subText: welcomeData.subText || "",
        order: welcomeData.order || 1,
        sectionActive: welcomeData.sectionActive,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [welcomeData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    // isActive (Select) field-இல் இருந்து வரும் string மதிப்பை Boolean ஆக மாற்றுகிறோம்
    if (name === "sectionActive") {
      // 'true' என்ற string-ஐ true (Boolean) ஆகவும், 'false' என்ற string-ஐ false (Boolean) ஆகவும் மாற்றும்.
      newValue = value === "true";
    }
    // order field (string-ஆக வரும்)
    if (name === "order") {
      newValue = Number(value);
    }

    // மற்ற fields (text, number, other selects) value-ஐ அப்படியே எடுத்துக்கொள்ளும்.
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. **Data Validation** (தேவைப்பட்டால் இங்கு சேர்க்கலாம்)

    // 2. **API-க்கு அனுப்ப வேண்டிய Data Object-ஐ உருவாக்கவும்**
    // 💡 Welcome Content-க்கு JSON object-ஐ அனுப்பினால் போதும், FormData தேவையில்லை.
    const dataToSave = {
      mainHeading: formData.mainHeading,
      subText: formData.subText,
      // Order-ஐ API-க்கு அனுப்பும் முன் Number-ஆக மாற்றுவது சிறந்தது.
      order: Number(formData.order),
      sectionActive: formData.sectionActive, // Boolean-ஆகவே அனுப்பலாம்
    };

    // 4. **API Call Dispatch**

    const successMessage = isEditMode
      ? "Welcome Content successfully updated!"
      : "New Welcome Content successfully created!";

    // 💡 Dispatch செய்ய வேண்டிய action-ஐ தீர்மானிக்கவும்
    const action = isEditMode
      ? updateWelcomeContent({ id: welcomeData.id, data: dataToSave })
      : createWelcomeContent(dataToSave); // 💡 createSlide action சேர்க்கப்பட்டுள்ளது

    dispatch(action)
      .unwrap() // Thunk Success/Failure-ஐ கையாள
      .then(() => {
        dispatch(fetchWelcomeContent());
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
          setAlert({ type: "error", message: error.message });
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
          {isEditMode ? "Edit Welcome Content" : "Create New Welcome Content"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Main Heading
            </label>
            <input
              type="text"
              name="mainHeading"
              value={formData.mainHeading}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description (Sub Text)
            </label>
            <textarea
              name="subText"
              value={formData.subText}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows="3"
              required
            ></textarea>
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
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="1"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {/* Is Active (Updated to Select) */}
            <div className="mb-6">
              <label
                htmlFor="sectionActive"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="sectionActive"
                name="sectionActive"
                // Boolean value-ஐ string ஆக convert செய்து Select value-இல் காட்டுகிறோம்
                value={formData.sectionActive.toString()}
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

export default WelcomeContentForm;
