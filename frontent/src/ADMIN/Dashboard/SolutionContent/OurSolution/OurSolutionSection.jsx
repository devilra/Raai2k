import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { FaEdit } from "react-icons/fa";
import {
  deleteOurSolution,
  fetchOurSolution,
  resetOurSolutionState,
} from "../../../../redux/AdminSolutionSlices/OurSolutionSlice";
import OurSolutionContactForm from "./OurSolutionContactForm";

// MUI Alert Component-ஐ எளிதாகப் பயன்படுத்த ஒரு Helper Component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OurSolutionSection = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWelcome, setCurrentWelcome] = useState(null); // Edit செய்யும்போது பயன்படுத்த

  //console.log(isModalOpen);

  // ----------------------------------------------------
  // 💡 Snackbar State Management
  // ----------------------------------------------------
  const [snackOpen, setSnackOpen] = useState(false); // snackbar
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("info"); // 'success', 'error', 'warning', 'info'

  const {
    ourSolutions, // அனைத்து contents-களும் (List)
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.ourSolution);

  // ----------------------------------------------------
  // 1. Initial Data Fetch (ஸ்லைடுகளைப் பெறுதல்)
  // ----------------------------------------------------

  useEffect(() => {
    // Fetch Slides API அழைப்பு
    dispatch(fetchOurSolution());
  }, [dispatch]);

  // ----------------------------------------------------
  // 2. Status / Message Handling (Toast Notifications)
  // ----------------------------------------------------
  useEffect(() => {
    if (isError && message) {
      setSnackType("error");
      setSnackMsg(message);
      setSnackOpen(true);
    }

    if (isSuccess && message) {
      // 'Slide Created Successfull', 'Slide Update Successfull', 'Slide Delete Successfull' போன்ற மெசேஜ்களுக்கு மட்டும் காட்டவும்
      if (message !== "") {
        setSnackType("success");
        setSnackMsg(message);
        setSnackOpen(true);
      }
    }

    // CRUD operations முடிந்த பிறகு state-ஐ reset செய்ய
    if (isSuccess || isError) {
      dispatch(resetOurSolutionState());
    }
  }, [isError, isSuccess, message, dispatch]);

  // Snackbar close handler
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  // ----------------------------------------------------
  // 3. Handlers
  // ----------------------------------------------------

  // 💡 setAlert Helper Function
  const setAlert = ({ type, message }) => {
    setSnackType(type);
    setSnackMsg(message);
    setSnackOpen(true);
  };

  const handleAddWelcome = () => {
    setCurrentWelcome(null);
    setIsModalOpen(true);
  };

  const handleEditWelcome = (welcome) => {
    setCurrentWelcome(welcome);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this slide?")) {
      dispatch(deleteOurSolution(id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentWelcome(null);
  };

  if (isLoading && ourSolutions.length === 0) {
    // Initial load-க்கு மட்டும் Loading காட்டு
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl" />{" "}
        <p className="ml-2">Loading Slides...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Snackbar */}

      <div className="p-6">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Our Solution</h2>
          <Button
            variant="contained"
            onClick={handleAddWelcome}
            //className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            <FaPlus className="mr-2" /> New content
          </Button>
        </header>

        {/* Slide List Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* ... (Existing table content) ... */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th> */}

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title / Description
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
              {ourSolutions.length > 0 ? (
                ourSolutions
                  .filter((solution) => solution && solution.order)
                  .map((solution) => (
                    <tr key={solution.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {solution.order}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-20 h-12 object-cover rounded-md"
                        />
                      </td> */}
                      <td className="px-6 py-4 max-w-sm">
                        <div className="text-sm font-semibold text-gray-900 truncate">
                          {solution.mainHeading}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {solution.subText}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {solution.sectionActive ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {/* <FaCheckCircle className="mr-1 mt-0.5" /> */}
                            Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {/* <FaTimesCircle className="mr-1 mt-0.5" /> */}
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          onClick={() => handleEditWelcome(solution)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4  rounded hover:bg-gray-100"
                          title="Edit Slide"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleDelete(solution.id)}
                          className="text-red-600 hover:text-red-900  rounded hover:bg-gray-100"
                          title="Delete Slide"
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No slides found. Click 'New Slide' to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <OurSolutionContactForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        solutionData={currentWelcome}
        setAlert={setAlert}
      />

      {/* 💡 MUI Snackbar Component */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000} // 4 seconds
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackType} // 'success', 'error'
          elevation={6}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OurSolutionSection;
