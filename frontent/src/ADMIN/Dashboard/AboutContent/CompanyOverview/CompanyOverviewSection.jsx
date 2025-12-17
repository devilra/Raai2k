import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import { Snackbar, Alert, Button } from "@mui/material";

import CompanyOverviewForm from "./CompanyOverviewForm";
import {
  deleteCompanyOverview,
  fetchCompanyOverviews,
  resetOverviewState,
} from "../../../../redux/AdminAboutSlices/companyOverviewSlice";
import { FaEdit } from "react-icons/fa";

const CompanyOverviewSection = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const [snack, setSnack] = useState({ open: false, msg: "", type: "info" });

  const { overviews, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.companyOverview
  );

  useEffect(() => {
    dispatch(fetchCompanyOverviews());
  }, [dispatch]);

  useEffect(() => {
    if ((isError || isSuccess) && message) {
      setSnack({
        open: true,
        msg: message,
        type: isError ? "error" : "success",
      });
      dispatch(resetOverviewState());
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleEdit = (item) => {
    setCurrentData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      dispatch(deleteCompanyOverview(id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentData(null);
  };

  if (isLoading && overviews.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl" />
        <p className="ml-2">Loading Overviews...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Company Overview</h2>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          <FaPlus className="mr-2" /> New Overview
        </Button>
      </header>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtitle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {overviews.length > 0 ? (
              overviews.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {item.pageTitle}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                    {item.cardSubtitle}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CompanyOverviewForm
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

export default CompanyOverviewSection;
