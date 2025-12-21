import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes, FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import {
  createIndustryServe,
  fetchAllIndustries,
  updateIndustryServe,
} from "../../../../redux/AdminServiceSlice/industryServeSlice";

const initialFormData = {
  mainTitle: "Industries We Serve",
  industryName: "",
  description: "",
  //   industryNumber: 1,
  //   iconName: "",
  order: 1,
  isActive: true,
};

const IndustriesWeServeForm = ({ isOpen, onClose, industryData, setAlert }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.industryServe);
  const [formData, setFormData] = useState(initialFormData);

  const isEditMode = !!industryData;

  useEffect(() => {
    if (industryData) {
      setFormData({
        mainTitle: industryData.mainTitle || "Industries We Serve",
        industryName: industryData.industryName || "",
        description: industryData.description || "",
        industryNumber: industryData.industryNumber || 1,
        iconName: industryData.iconName || "",
        order: industryData.order || 1,
        isActive: industryData.isActive,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [industryData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "isActive") newValue = value === "true";
    if (name === "order" || name === "industryNumber") newValue = Number(value);
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isEditMode
      ? updateIndustryServe({ id: industryData.id, data: formData })
      : createIndustryServe(formData);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(fetchAllIndustries());
        onClose();
      })
      .catch((err) => {
        if (setAlert) setAlert({ type: "error", message: err });
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pt-12 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-2xl font-bold mb-6 border-b pb-2">
          {isEditMode ? "Edit Industry" : "Add New Industry"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Main Title
              </label>
              <input
                type="text"
                name="mainTitle"
                value={formData.mainTitle}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Main title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Industry Title
              </label>
              <input
                type="text"
                name="industryName"
                value={formData.industryName}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="e.g. Insurtech"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Describe the service..."
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Icon Name / Class
              </label>
              <input
                type="text"
                name="iconName"
                value={formData.iconName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="e.g. FaBank"
              />
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Display Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
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
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center disabled:bg-indigo-400"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaCloudUploadAlt className="mr-2" />
              )}
              {isEditMode ? "Update Industry" : "Create Industry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndustriesWeServeForm;
