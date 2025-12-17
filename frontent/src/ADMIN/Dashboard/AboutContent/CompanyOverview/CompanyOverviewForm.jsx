import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTimes,
  FaCloudUploadAlt,
  FaSpinner,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import {
  createCompanyOverview,
  fetchCompanyOverviews,
  updateCompanyOverview,
} from "../../../../redux/AdminAboutSlices/companyOverviewSlice";

const initialFormData = {
  pageTitle: "Company Overview",
  cardSubtitle: "",
  mainDescription: "",
  highlightQuote: "",
  gridContent: [""], // ஆரம்பத்தில் ஒரு காலி பத்தி
  isActive: true,
};

const CompanyOverviewForm = ({ isOpen, onClose, editData }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.companyOverview);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (editData) {
      // 1. டேட்டாபேஸில் இருந்து வரும் gridContent-ஐச் சரிபார்த்தல்
      let parsedGrid = [""]; // Default value

      if (Array.isArray(editData.gridContent)) {
        parsedGrid = editData.gridContent;
      } else if (typeof editData.gridContent === "string") {
        try {
          // ஒருவேளை String ஆக இருந்தால் அதை Array ஆக மாற்ற முயற்சிக்கும்
          parsedGrid = JSON.parse(editData.gridContent);
        } catch (e) {
          parsedGrid = [""];
        }
      }

      setFormData({
        ...editData,
        gridContent: parsedGrid,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  // Grid Content கையாளும் முறைகள்
  const handleGridChange = (index, value) => {
    const updatedGrid = [...formData.gridContent];
    updatedGrid[index] = value;
    setFormData({ ...formData, gridContent: updatedGrid });
  };

  const addGridItem = () => {
    setFormData({ ...formData, gridContent: [...formData.gridContent, ""] });
  };

  const removeGridItem = (index) => {
    const updatedGrid = formData.gridContent.filter((_, i) => i !== index);
    setFormData({ ...formData, gridContent: updatedGrid });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editData
      ? updateCompanyOverview({ id: editData.id, data: formData })
      : createCompanyOverview(formData);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(fetchCompanyOverviews());
        onClose();
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-xl font-bold mb-6 border-b pb-2">
          {editData ? "Edit Overview" : "Create Overview"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Page Title
              </label>
              <input
                type="text"
                name="pageTitle"
                value={formData.pageTitle}
                onChange={handleChange}
                className="mt-1 block w-full border rounded p-2"
                required
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
                className="mt-1 block w-full border rounded p-2"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Subtitle
            </label>
            <input
              type="text"
              name="cardSubtitle"
              value={formData.cardSubtitle}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Description
            </label>
            <textarea
              name="mainDescription"
              value={formData.mainDescription}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Highlight Quote
            </label>
            <textarea
              name="highlightQuote"
              value={formData.highlightQuote}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              rows="2"
              required
            />
          </div>

          {/* Dynamic Grid Content Section */}
          <div className="border p-4 rounded bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700">
                Grid Paragraphs
              </label>
              <button
                type="button"
                onClick={addGridItem}
                className="text-sm bg-indigo-600 text-white px-2 py-1 rounded flex items-center"
              >
                <FaPlus className="mr-1" /> Add Paragraph
              </button>
            </div>
            {formData.gridContent.map((text, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  value={text}
                  onChange={(e) => handleGridChange(index, e.target.value)}
                  className="flex-1 border rounded p-2 text-sm"
                  rows="2"
                  placeholder={`Paragraph ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeGridItem(index)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 text-white rounded flex items-center disabled:bg-indigo-300"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaCloudUploadAlt className="mr-2" />
              )}
              {editData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyOverviewForm;
