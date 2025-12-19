import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import Button from "@mui/material/Button";
import {
  deleteTestimonial,
  fetchAllTestimonials,
  resetTestimonialState,
} from "../../../../redux/AdminHomeSlices/testimonialSlice";
import ClientTestimonialForm from "./ClientTestimonialForm";
import { FaEdit } from "react-icons/fa";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ClientTestimonialSection = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("info");

  const { testimonials, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.testimonials
  );

  useEffect(() => {
    dispatch(fetchAllTestimonials());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) setAlert({ type: "error", message: message });
    if (isSuccess && message) setAlert({ type: "success", message: message });
    if (isSuccess || isError) dispatch(resetTestimonialState());
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

  const handleAddTestimonial = () => {
    setCurrentTestimonial(null);
    setIsModalOpen(true);
  };

  const handleEditTestimonial = (item) => {
    setCurrentTestimonial(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      dispatch(deleteTestimonial(id));
    }
  };

  if (isLoading && testimonials.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl" />
        <p className="ml-2">Loading Testimonials...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Testimonials Management
        </h2>
        <Button
          variant="contained"
          onClick={handleAddTestimonial}
          className="bg-indigo-600"
        >
          <FaPlus className="mr-2" /> New Testimonial
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
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Quote
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
            {testimonials.length > 0 ? (
              testimonials.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm text-center">
                    {item.slideOrder}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-full border shadow-sm"
                      />
                      <div>
                        <div className="text-sm font-semibold w-[100px] truncate text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-xs text-indigo-600">
                          {item.position}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 w-[250px] truncate italic">
                      "{item.quote}"
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
                      onClick={() => handleEditTestimonial(item)}
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
                  No testimonials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ClientTestimonialForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        testimonialData={currentTestimonial}
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

export default ClientTestimonialSection;
