import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import {
  deleteThingsYouGet,
  fetchAllThings,
  resetThingsState,
} from "../../../../redux/AdminHomeSlices/ThingsYouGetSlice";
import ThingsYouGetForm from "./ThingsYouGetForm";
import { FaEdit } from "react-icons/fa";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ThingsYouGetSection = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentThing, setCurrentThing] = useState(null);

  // Snackbar State
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("info");

  const { things, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.thingsYouGet
  );

  useEffect(() => {
    dispatch(fetchAllThings());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      setAlert({ type: "error", message });
    }
    if (isSuccess && message) {
      setAlert({ type: "success", message });
    }
    if (isSuccess || isError) {
      dispatch(resetThingsState());
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
    setCurrentThing(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentThing(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteThingsYouGet(id));
    }
  };

  if (isLoading && things.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl" />
        <p className="ml-2">Loading Things You Get...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Things You Get</h2>
        <Button variant="contained" onClick={handleAdd}>
          <FaPlus className="mr-2" /> New Entry
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
                SubHeading / description
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
            {things.length > 0 ? (
              things.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.slideOrder}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs w-[200px] truncate text-indigo-600">
                      {item.subHeading}
                    </div>
                    <div className="text-sm font-semibold w-[250px] truncate text-gray-500">
                      {item.description}
                    </div>
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
                  No entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ThingsYouGetForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        thingData={currentThing}
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

export default ThingsYouGetSection;
