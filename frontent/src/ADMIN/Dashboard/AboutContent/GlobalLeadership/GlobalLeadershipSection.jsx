import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import Button from "@mui/material/Button";
import {
  deleteLeader,
  fetchAllLeaders,
  resetLeadershipState,
} from "../../../../redux/AdminAboutSlices/globalLeadershipSlice";
import GlobalLeadershipForm from "./GlobalLeadershipForm";
import { FaEdit } from "react-icons/fa";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GlobalLeadershipSection = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeader, setCurrentLeader] = useState(null);

  // Snackbar State
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("info");

  const { leaders, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.globalLeadership
  );

  useEffect(() => {
    dispatch(fetchAllLeaders());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      setAlert({ type: "error", message: message });
    }
    if (isSuccess && message) {
      setAlert({ type: "success", message: message });
    }
    if (isSuccess || isError) {
      dispatch(resetLeadershipState());
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

  const handleAddLeader = () => {
    setCurrentLeader(null);
    setIsModalOpen(true);
  };

  const handleEditLeader = (leader) => {
    setCurrentLeader(leader);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this leader?")) {
      dispatch(deleteLeader(id));
    }
  };

  if (isLoading && leaders.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl" />
        <p className="ml-2">Loading Leaders...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Global Leadership Management
        </h2>
        <Button variant="contained" onClick={handleAddLeader}>
          <FaPlus className="mr-2" /> New Leader
        </Button>
      </header>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role & SubTitle
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
            {leaders.length > 0 ? (
              leaders.map((leader) => (
                <tr key={leader.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {leader.slideOrder}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={leader.image}
                      alt={leader.mainTitle}
                      className="w-12 h-12 object-cover rounded-full border"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {leader.mainTitle}
                    </div>
                    <div className="text-xs text-gray-500">{leader.role}</div>
                    <div className="text-xs text-gray-500">
                      {leader.subTitle}
                    </div>
                    <div className="text-xs text-gray-500 w-[300px] truncate">
                      {leader.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        leader.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {leader.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      onClick={() => handleEditLeader(leader)}
                      className="text-indigo-600"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      color="error"
                      onClick={() => handleDelete(leader.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No leaders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <GlobalLeadershipForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leaderData={currentLeader}
        setAlert={setAlert}
      />

      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleSnackClose} severity={snackType}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GlobalLeadershipSection;
