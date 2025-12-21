import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import {
  deleteIndustryServe,
  fetchAllIndustries,
  resetIndustryState,
} from "../../../../redux/AdminServiceSlice/industryServeSlice";
import IndustriesWeServeForm from "./IndustriesWeServeForm";
import { FaEdit } from "react-icons/fa";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const IndustriesWeServeSection = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState(null);

  // Snackbar State
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("info");

  const { industries, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.industryServe
  );

  useEffect(() => {
    dispatch(fetchAllIndustries());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      setAlert({ type: "error", message });
    }
    if (isSuccess && message) {
      setAlert({ type: "success", message });
    }
    if (isSuccess || isError) {
      dispatch(resetIndustryState());
    }
  }, [isError, isSuccess, message, dispatch]);

  const setAlert = ({ type, message }) => {
    setSnackType(type);
    setSnackMsg(message);
    setSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };

  const handleAdd = () => {
    setCurrentIndustry(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentIndustry(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this industry?")) {
      dispatch(deleteIndustryServe(id));
    }
  };

  if (isLoading && industries.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl" />
        <p className="ml-2">Loading Industries...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Industries We Serve
        </h2>
        <Button
          variant="contained"
          onClick={handleAdd}
          className="bg-indigo-600"
        >
          <FaPlus className="mr-2" /> New Industry
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
                Industry Detail
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Icon
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {industries.length > 0 ? (
              industries.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {item.order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900 ">
                      {item.industryName}
                    </div>
                    <div className="text-xs text-gray-500 w-[300px] truncate">
                      {item.description}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 text-sm text-gray-600">
                    {item.iconName || "N/A"}
                  </td> */}
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
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No industries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <IndustriesWeServeForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        industryData={currentIndustry}
        setAlert={setAlert}
      />

      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity={snackType}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default IndustriesWeServeSection;
