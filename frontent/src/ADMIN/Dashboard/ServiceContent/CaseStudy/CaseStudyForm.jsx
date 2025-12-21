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
  createCaseStudy,
  fetchAllCaseStudies,
  updateCaseStudy,
} from "../../../../redux/AdminServiceSlice/CaseStudySlice";

const initialFormData = {
  pageTitle: "Case Studies",
  heading: "",
  points: [""],
  order: 1,
  isActive: true,
};

const CaseStudyForm = ({ isOpen, onClose, editData }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.caseStudy);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (editData) {
      // டேட்டா String ஆக இருந்தால் அதை Array ஆக மாற்ற முயற்சிக்கும்,
      // இல்லை என்றால் நேரடியாக எடுக்கும்
      let updatedPoints = editData.points;

      if (typeof editData.points === "string") {
        try {
          updatedPoints = JSON.parse(editData.points);
        } catch (e) {
          updatedPoints = [editData.points]; // Parse செய்ய முடியாவிட்டால் ஒரு Array-க்குள் போடும்
        }
      }

      // ஒருவேளை points null அல்லது undefined ஆக வந்தால் காலியான Array-ஐ கொடுக்கும்
      setFormData({
        ...editData,
        points: Array.isArray(updatedPoints) ? updatedPoints : [],
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

  // --- Points Management ---
  const addPoint = () => {
    setFormData({ ...formData, points: [...formData.points, ""] });
  };

  const handlePointChange = (index, value) => {
    const updatedPoints = [...formData.points];
    updatedPoints[index] = value;
    setFormData({ ...formData, points: updatedPoints });
  };

  const removePoint = (index) => {
    const updatedPoints = formData.points.filter((_, i) => i !== index);
    setFormData({ ...formData, points: updatedPoints });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editData
      ? updateCaseStudy({ id: editData.id, data: formData })
      : createCaseStudy(formData);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(fetchAllCaseStudies());
        onClose();
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-xl font-bold mb-6 border-b pb-2">
          {editData ? "Edit Case Study" : "Create Case Study"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Page Title
              </label>
              <input
                type="text"
                name="pageTitle"
                value={formData.pageTitle}
                onChange={handleChange}
                className="mt-1 block w-full border rounded p-2"
                placeholder="e.g. Digital Wallet for Neobank"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Heading
              </label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                className="mt-1 block w-full border rounded p-2"
                placeholder="e.g. Digital Wallet for Neobank"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Display Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="mt-1 block w-full border rounded p-2"
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

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-700">List Points</label>
              <button
                type="button"
                onClick={addPoint}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm flex items-center"
              >
                <FaPlus className="mr-1" size={10} /> Add Point
              </button>
            </div>
            {formData.points.map((point, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handlePointChange(index, e.target.value)}
                  className="flex-1 border rounded p-2 text-sm"
                  placeholder="Enter achievement or feature..."
                  required
                />
                <button
                  type="button"
                  onClick={() => removePoint(index)}
                  className="text-red-500"
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

export default CaseStudyForm;
