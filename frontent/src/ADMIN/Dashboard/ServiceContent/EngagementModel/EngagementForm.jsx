import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCloudUploadAlt, FaTimes, FaSpinner } from "react-icons/fa";
import {
  createEngagementModel,
  fetchAllEngagementModels,
  updateEngagementModel,
} from "../../../../redux/AdminServiceSlice/EngagementSlice";

const initialFormData = {
  pageTitle: "Choose Your Perfect Engagement Model",
  pageDesc: "",
  subtitle: "",
  para: "",
  order: 1,
  isActive: true,
};

const EngagementForm = ({ isOpen, onClose, engagementData, setAlert }) => {
  const { isLoading } = useSelector((state) => state.engagement);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  const isEditMode = !!engagementData;

  useEffect(() => {
    if (engagementData) {
      setFormData({
        pageTitle: engagementData.pageTitle || "",
        pageDesc: engagementData.pageDesc || "",
        subtitle: engagementData.subtitle || "",
        para: engagementData.para || "",
        order: engagementData.order || 1,
        isActive: engagementData.isActive,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [engagementData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "isActive") newValue = value === "true";
    if (name === "order") newValue = Number(value);
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isEditMode
      ? updateEngagementModel({ id: engagementData.id, data: formData })
      : createEngagementModel(formData);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(fetchAllEngagementModels());
        onClose();
        setAlert({
          type: "success",
          message: `Engagement Model successfully ${
            isEditMode ? "updated" : "created"
          }!`,
        });
      })
      .catch((error) => {
        setAlert({ type: "error", message: error || "Something went wrong" });
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
          {isEditMode ? "Edit Engagement Model" : "Create Engagement Model"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Page Main Title
              </label>
              <input
                type="text"
                name="pageTitle"
                value={formData.pageTitle}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Page Description
            </label>
            <textarea
              name="pageDesc"
              value={formData.pageDesc}
              onChange={handleChange}
              rows="2"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Paragraph (Para)
            </label>
            <textarea
              name="para"
              value={formData.para}
              onChange={handleChange}
              rows="3"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
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
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
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

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaCloudUploadAlt className="mr-2" />
              )}
              {isEditMode ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EngagementForm;
