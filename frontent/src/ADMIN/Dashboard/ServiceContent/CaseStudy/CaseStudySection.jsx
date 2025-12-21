import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { Snackbar, Alert, Button } from "@mui/material";
import {
  deleteCaseStudy,
  fetchAllCaseStudies,
  resetCaseStudyState,
} from "../../../../redux/AdminServiceSlice/CaseStudySlice";
import CaseStudyForm from "./CaseStudyForm";

const CaseStudySection = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: "", type: "info" });

  const { caseStudies, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.caseStudy
  );

  useEffect(() => {
    dispatch(fetchAllCaseStudies());
  }, [dispatch]);

  useEffect(() => {
    if ((isError || isSuccess) && message) {
      setSnack({
        open: true,
        msg: message,
        type: isError ? "error" : "success",
      });
      dispatch(resetCaseStudyState());
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleEdit = (item) => {
    setCurrentData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Case Study?")) {
      dispatch(deleteCaseStudy(id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentData(null);
  };

  if (isLoading && caseStudies.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl" />
        <p className="ml-2">Loading Case Studies...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Case Studies</h2>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          <FaPlus className="mr-2" /> New Case Study
        </Button>
      </header>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Heading
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {caseStudies.length > 0 ? (
              caseStudies.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.order}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {item.heading}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 mr-2"
                    >
                      <FaEdit />
                    </Button>
                    <Button onClick={() => handleDelete(item.id)} color="error">
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No Case Studies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CaseStudyForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editData={currentData}
      />

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.type} variant="filled">
          {snack.msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CaseStudySection;
