import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import Button from "@mui/material/Button";
import {
  deleteWhyChooseItem,
  fetchAllWhyChoose,
  resetWhyChooseState,
} from "../../../../redux/AdminHomeSlices/WhyChooseUsSlice";
import { FaEdit } from "react-icons/fa";
import WhyChooseUsForm from "./WhyChooseUsForm";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WhyChooseUsSection = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("info");

  const { whyChooseItems, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.whyChooseUs);

  useEffect(() => {
    dispatch(fetchAllWhyChoose());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) setAlert({ type: "error", message: message });
    if (isSuccess && message) setAlert({ type: "success", message: message });
    if (isSuccess || isError) dispatch(resetWhyChooseState());
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

  const handleAddItem = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteWhyChooseItem(id));
    }
  };

  if (isLoading && whyChooseItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl" />
        <p className="ml-2">Loading Why Choose Us content...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Why Choose Us Management
        </h2>
        <Button
          variant="contained"
          onClick={handleAddItem}
          className="bg-indigo-600"
        >
          <FaPlus className="mr-2" /> New Feature
        </Button>
      </header>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Feature
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
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
            {whyChooseItems.length > 0 ? (
              whyChooseItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm text-center font-medium">
                    {item.order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 object-contain p-1 border rounded shadow-sm"
                        />
                      ) : (
                        <h1 className="text-[13px]">No Image</h1>
                      )}
                      <div className="text-sm font-semibold text-gray-900 truncate w-[150px]">
                        {item.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 w-[200px] truncate">
                      {item.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
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
                      onClick={() => handleEditItem(item)}
                      className="text-indigo-600"
                    >
                      <FaEdit />
                    </Button>
                    <Button color="error" onClick={() => handleDelete(item.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <WhyChooseUsForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={currentItem}
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

export default WhyChooseUsSection;
