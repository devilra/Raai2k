import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes, FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import {
  createVideoContent,
  fetchVideoContent,
  updateVideoContent,
} from "../../../../redux/AdminHomeSlices/videoContentSlice";

const initialFormData = {
  mainHeading: "",
  subText: "",
  order: 1,
  sectionActive: true,
};

const VideoContentForm = ({ isOpen, onClose, videoData, setAlert }) => {
  const { isLoading } = useSelector((state) => state.videoContent);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  const isEditMode = !!videoData;

  useEffect(() => {
    if (videoData) {
      setFormData({
        mainHeading: videoData.mainHeading || "",
        subText: videoData.subText || "",
        order: videoData.order || 1,
        sectionActive: videoData.sectionActive,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [videoData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "sectionActive") newValue = value === "true";
    if (name === "order") newValue = Number(value);
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isEditMode
      ? updateVideoContent({ id: videoData.id, data: formData })
      : createVideoContent(formData);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(fetchVideoContent());
        onClose();
        setAlert({
          type: "success",
          message: `Video Content ${
            isEditMode ? "updated" : "created"
          } successfully!`,
        });
      })
      .catch((err) => {
        setAlert({ type: "error", message: err || "Something went wrong" });
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          {isEditMode ? "Edit Video Content" : "Create Video Content"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Heading
            </label>
            <input
              type="text"
              name="mainHeading"
              value={formData.mainHeading}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sub Text / Description
            </label>
            <textarea
              name="subText"
              value={formData.subText}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            ></textarea>
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
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="sectionActive"
                value={formData.sectionActive.toString()}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 disabled:bg-indigo-400"
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

export default VideoContentForm;
