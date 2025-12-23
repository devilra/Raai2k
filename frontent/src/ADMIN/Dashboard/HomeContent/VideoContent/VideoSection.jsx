import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import {
  deleteVideoContent,
  fetchVideoContent,
  resetVideoContentState,
} from "../../../../redux/AdminHomeSlices/videoContentSlice";
import VideoContentForm from "./VideoContentForm";
import { FaEdit } from "react-icons/fa";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VideoSection = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("info");

  const { videoContents, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.videoContent
  );

  useEffect(() => {
    dispatch(fetchVideoContent());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      setAlert({ type: "error", message });
    }
    if (isSuccess && message) {
      setAlert({ type: "success", message });
    }
    if (isSuccess || isError) {
      dispatch(resetVideoContentState());
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleSnackClose = () => setSnackOpen(false);

  const setAlert = ({ type, message }) => {
    setSnackType(type);
    setSnackMsg(message);
    setSnackOpen(true);
  };

  const handleAddVideo = () => {
    setCurrentVideo(null);
    setIsModalOpen(true);
  };

  const handleEditVideo = (video) => {
    setCurrentVideo(video);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this video content?")) {
      dispatch(deleteVideoContent(id));
    }
  };

  if (isLoading && videoContents.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl" />
        <p className="ml-2">Loading Videos...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Video Section Management
        </h2>
        <Button variant="contained" onClick={handleAddVideo} color="primary">
          <FaPlus className="mr-2" /> New Video Content
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
                Heading / SubText
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
            {videoContents.length > 0 ? (
              videoContents.map((video) => (
                <tr key={video.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {video.order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {video.mainHeading}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">
                      {video.subText}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        video.sectionActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {video.sectionActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <Button
                      onClick={() => handleEditVideo(video)}
                      className="text-indigo-600 mr-2"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      onClick={() => handleDelete(video.id)}
                      color="error"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No content found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <VideoContentForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoData={currentVideo}
        setAlert={setAlert}
      />

      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleSnackClose}
      >
        <Alert severity={snackType}>{snackMsg}</Alert>
      </Snackbar>
    </div>
  );
};

export default VideoSection;
