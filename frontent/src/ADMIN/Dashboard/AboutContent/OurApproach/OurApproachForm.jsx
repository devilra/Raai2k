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
  createOurApproach,
  fetchOurApproaches,
  updateOurApproach,
} from "../../../../redux/AdminAboutSlices/ourApproachSlice";

const initialFormData = {
  pageTitle: "Our Approach",
  approachCards: [{ title: "", points: [""] }], // ஒரு கார்டு, ஒரு பாயிண்ட் உடன் ஆரம்பம்
  footerDescription: "",
  isActive: true,
};

const OurApproachForm = ({ isOpen, onClose, editData }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.ourApproach);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (editData) {
      // JSON Parse Check (Data safety)
      let parsedCards = initialFormData.approachCards;
      if (Array.isArray(editData.approachCards)) {
        parsedCards = editData.approachCards;
      } else if (typeof editData.approachCards === "string") {
        try {
          parsedCards = JSON.parse(editData.approachCards);
        } catch (e) {}
      }

      setFormData({ ...editData, approachCards: parsedCards });
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

  // --- Card Management ---
  const addCard = () => {
    setFormData({
      ...formData,
      approachCards: [...formData.approachCards, { title: "", points: [""] }],
    });
  };

  const removeCard = (cardIndex) => {
    const updatedCards = formData.approachCards.filter(
      (_, i) => i !== cardIndex
    );
    setFormData({ ...formData, approachCards: updatedCards });
  };

  const handleCardTitleChange = (index, value) => {
    const updatedCards = [...formData.approachCards];
    updatedCards[index].title = value;
    setFormData({ ...formData, approachCards: updatedCards });
  };

  // --- Points Management ---
  const addPoint = (cardIndex) => {
    const updatedCards = [...formData.approachCards];
    updatedCards[cardIndex].points.push("");
    setFormData({ ...formData, approachCards: updatedCards });
  };

  const handlePointChange = (cardIndex, pointIndex, value) => {
    const updatedCards = [...formData.approachCards];
    updatedCards[cardIndex].points[pointIndex] = value;
    setFormData({ ...formData, approachCards: updatedCards });
  };

  const removePoint = (cardIndex, pointIndex) => {
    const updatedCards = [...formData.approachCards];
    updatedCards[cardIndex].points = updatedCards[cardIndex].points.filter(
      (_, i) => i !== pointIndex
    );
    setFormData({ ...formData, approachCards: updatedCards });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editData
      ? updateOurApproach({ id: editData.id, data: formData })
      : createOurApproach(formData);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(fetchOurApproaches());
        onClose();
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-xl font-bold mb-6 border-b pb-2">
          {editData ? "Edit Approach" : "Create Approach"}
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

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-700">Approach Cards</label>
              <button
                type="button"
                onClick={addCard}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm flex items-center"
              >
                <FaPlus className="mr-1" /> Add Card
              </button>
            </div>

            {formData.approachCards.map((card, cardIndex) => (
              <div
                key={cardIndex}
                className="border p-4 rounded-lg bg-gray-50 relative"
              >
                <button
                  type="button"
                  onClick={() => removeCard(cardIndex)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <FaTrash />
                </button>
                <div className="mb-3">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    Card Title
                  </label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) =>
                      handleCardTitleChange(cardIndex, e.target.value)
                    }
                    className="w-full border rounded p-2 mt-1"
                    placeholder="e.g. How We Work"
                    required
                  />
                </div>

                <div className="pl-4 border-l-2 border-indigo-200">
                  <label className="text-xs font-bold text-gray-500">
                    Points
                  </label>
                  {card.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex gap-2 mt-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) =>
                          handlePointChange(
                            cardIndex,
                            pointIndex,
                            e.target.value
                          )
                        }
                        className="flex-1 border rounded p-1 text-sm"
                        placeholder="Add point..."
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removePoint(cardIndex, pointIndex)}
                        className="text-red-400"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addPoint(cardIndex)}
                    className="text-indigo-600 text-xs mt-2 flex items-center"
                  >
                    <FaPlus size={10} className="mr-1" /> Add Point
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Footer Description
            </label>
            <textarea
              name="footerDescription"
              value={formData.footerDescription}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              rows="3"
              required
            />
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

export default OurApproachForm;
