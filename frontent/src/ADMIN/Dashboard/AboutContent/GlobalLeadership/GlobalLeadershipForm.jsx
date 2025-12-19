import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCloudUploadAlt, FaTimes, FaSpinner } from "react-icons/fa";
import {
  createLeader,
  fetchAllLeaders,
  updateLeader,
} from "../../../../redux/AdminAboutSlices/globalLeadershipSlice";

const initialFormData = {
  mainTitle: "",
  role: "",
  subTitle: "",
  description: "",
  slideOrder: 1,
  isActive: true,
  image: null,
};

const GlobalLeadershipForm = ({ isOpen, onClose, leaderData, setAlert }) => {
  const { isLoading } = useSelector((state) => state.globalLeadership);
  const [formData, setFormData] = useState(initialFormData);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();

  const isEditMode = !!leaderData;

  useEffect(() => {
    if (leaderData && isOpen) {
      setFormData({
        mainTitle: leaderData.mainTitle,
        role: leaderData.role,
        subTitle: leaderData.subTitle || "",
        description: leaderData.description || "",
        slideOrder: leaderData.slideOrder,
        isActive: leaderData.isActive,
        image: null,
      });
      setPreviewImage(leaderData.image);
    } else {
      setFormData(initialFormData);
      setPreviewImage(null);
    }
  }, [leaderData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
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
    Object.keys(formData).forEach((key) => {
      if (key === "image") {
        if (formData.image) apiFormData.append("image", formData.image);
      } else {
        apiFormData.append(key, formData[key]);
      }
    });

    if (!isEditMode && !formData.image) {
      alert("Image is required!");
      return;
    }

    const action = isEditMode
      ? updateLeader({ id: leaderData.id, formData: apiFormData })
      : createLeader(apiFormData);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(fetchAllLeaders());
        onClose();
        setAlert({
          type: "success",
          message: `Leader ${isEditMode ? "updated" : "created"} successfully!`,
        });
      })
      .catch((err) =>
        setAlert({ type: "error", message: err || "Operation failed" })
      );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
        <h3 className="text-xl font-bold mb-4 border-b pb-2">
          {isEditMode ? "Edit Leader" : "Add New Leader"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Name (Main Title)
              </label>
              <input
                type="text"
                name="mainTitle"
                value={formData.mainTitle}
                onChange={handleChange}
                required
                className="w-full border rounded p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Role / Designation
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border rounded p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">subTitle</label>
              <input
                type="text"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
                required
                className="w-full border rounded p-2 mt-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded p-2 mt-1"
            />
          </div>

          <div className="border p-4 rounded bg-gray-50">
            <label className="block text-sm font-medium mb-2">
              Leader Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="text-sm"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 h-32 w-32 object-cover rounded border"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Order</label>
              <input
                type="number"
                name="slideOrder"
                value={formData.slideOrder}
                onChange={handleChange}
                min="1"
                className="w-full border rounded p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                name="isActive"
                value={formData.isActive.toString()}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-1 bg-white"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaCloudUploadAlt className="mr-2" />
              )}
              {isEditMode ? "Update Leader" : "Create Leader"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GlobalLeadershipForm;
