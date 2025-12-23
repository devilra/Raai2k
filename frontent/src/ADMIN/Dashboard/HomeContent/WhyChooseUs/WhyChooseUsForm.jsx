import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCloudUploadAlt, FaTimes, FaSpinner } from "react-icons/fa";
import {
  createWhyChooseItem,
  fetchAllWhyChoose,
  updateWhyChooseItem,
} from "../../../../redux/AdminHomeSlices/WhyChooseUsSlice";

const initialFormData = {
  pageTitle: "Why Choose raai2k",
  title: "",
  description: "",
  order: 1,
  isActive: true,
  image: null,
};

const WhyChooseUsForm = ({ isOpen, onClose, editData, setAlert }) => {
  const { isLoading } = useSelector((state) => state.whyChooseUs);
  const [formData, setFormData] = useState(initialFormData);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();

  const isEditMode = !!editData;

  useEffect(() => {
    if (editData && isOpen) {
      setFormData({
        pageTitle: editData.pageTitle,
        title: editData.title,
        description: editData.description,
        order: editData.order,
        isActive: editData.isActive,
        image: null,
      });
      setPreviewImage(editData.image);
    } else {
      setFormData(initialFormData);
      setPreviewImage(null);
    }
  }, [editData, isOpen]);

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

    // if (!isEditMode && !formData.image) {
    //   alert("Feature image is required!");
    //   return;
    // }

    const action = isEditMode
      ? updateWhyChooseItem({ id: editData.id, formData: apiFormData })
      : createWhyChooseItem(apiFormData);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(fetchAllWhyChoose());
        onClose();
        setAlert({
          type: "success",
          message: `Successfully ${isEditMode ? "updated" : "created"}!`,
        });
      })
      .catch((err) =>
        setAlert({ type: "error", message: err || "Operation failed" })
      );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
        <h3 className="text-xl font-bold mb-4 border-b pb-2">
          {isEditMode ? "Edit Why Choose Feature" : "Add New Feature"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Page/Section Title
            </label>
            <input
              type="text"
              name="pageTitle"
              value={formData.pageTitle}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 mt-1 focus:ring-indigo-500"
              placeholder="Why Choose raai2k"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Feature Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 mt-1 focus:ring-indigo-500"
              placeholder="Deep Domain Knowledge"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description (Paragraph)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border rounded p-2 mt-1 focus:ring-indigo-500"
              placeholder="Explain why this feature is important..."
            />
          </div>

          <div className="border-2 border-dashed p-4 rounded bg-gray-50 text-center">
            <label className="block text-sm font-medium mb-2">
              Feature Image (Icon/Photo)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="mb-2 text-sm"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mx-auto h-24 w-24 object-contain border bg-white p-2 rounded shadow-md"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Display Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="1"
                className="w-full border rounded p-2 mt-1"
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
                className="w-full border rounded p-2 mt-1 bg-white"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
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
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center transition-all"
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

export default WhyChooseUsForm;
