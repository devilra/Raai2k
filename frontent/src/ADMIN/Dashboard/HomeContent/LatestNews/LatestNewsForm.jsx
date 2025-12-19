import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCloudUploadAlt, FaTimes, FaSpinner } from "react-icons/fa";
import {
  createNews,
  fetchAllNews,
  updateNews,
} from "../../../../redux/AdminHomeSlices/LatestNewsSlice";

const initialFormData = {
  pageTitle: "Latest News",
  newsTitle: "",
  byName: "",
  description: "",
  link: "",
  slideOrder: 1,
  isActive: true,
  image: null,
};

const LatestNewsForm = ({ isOpen, onClose, newsData, setAlert }) => {
  const { isLoading } = useSelector((state) => state.latestNews);
  const [formData, setFormData] = useState(initialFormData);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();

  const isEditMode = !!newsData;

  useEffect(() => {
    if (newsData && isOpen) {
      setFormData({
        pageTitle: newsData.pageTitle,
        newsTitle: newsData.newsTitle,
        byName: newsData.byName,
        description: newsData.description,
        link: newsData.link || "",
        slideOrder: newsData.slideOrder,
        isActive: newsData.isActive,
        image: null,
      });
      setPreviewImage(newsData.image);
    } else {
      setFormData(initialFormData);
      setPreviewImage(null);
    }
  }, [newsData, isOpen]);

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
      alert("News image is required!");
      return;
    }

    const action = isEditMode
      ? updateNews({ id: newsData.id, formData: apiFormData })
      : createNews(apiFormData);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(fetchAllNews());
        onClose();
        setAlert({
          type: "success",
          message: `News ${isEditMode ? "updated" : "created"} successfully!`,
        });
      })
      .catch((err) =>
        setAlert({ type: "error", message: err || "Operation failed" })
      );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
        <h3 className="text-xl font-bold mb-4 border-b pb-2">
          {isEditMode ? "Edit News Item" : "Add New News Item"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">News Title</label>
              <input
                type="text"
                name="newsTitle"
                value={formData.newsTitle}
                onChange={handleChange}
                required
                className="w-full border rounded p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Page Title</label>
              <input
                type="text"
                name="pageTitle"
                value={formData.pageTitle}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Author (By Name)
              </label>
              <input
                type="text"
                name="byName"
                value={formData.byName}
                onChange={handleChange}
                required
                className="w-full border rounded p-2 mt-1"
                placeholder="e.g. By John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Short Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              className="w-full border rounded p-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">News Link (URL)</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
              placeholder="/news/details-id"
            />
          </div>

          <div className="border-2 border-dashed p-4 rounded bg-gray-50 text-center">
            <label className="block text-sm font-medium mb-2">
              News Thumbnail
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="mb-2"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mx-auto h-32 w-full object-cover rounded border"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Slide Order</label>
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
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaCloudUploadAlt className="mr-2" />
              )}
              {isEditMode ? "Update News" : "Create News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LatestNewsForm;
