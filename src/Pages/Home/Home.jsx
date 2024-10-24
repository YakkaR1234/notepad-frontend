import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/navbar";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import noteImg from "../../assets/add-note-svgrepo-com.svg";
import "./Home.css"; // Make sure to import your CSS file

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const userId = useParams().id;

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes/" + userId);
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      } else {
        setAllNotes([]);
      }
    } catch (error) {
      console.log("An unexpected error.");
    }
  };

  // Delete a note
  const deleteNode = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error.");
      }
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get(`/search-notes/${userId}`, {
        params: { query }, // Pass the query parameter here
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = async () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    const isPinned = !noteData.isPinned; // Toggle the current isPinned value

    try {
      const response = await axiosInstance.put(
        `/update-note-pinned/${noteId}`,
        { isPinned }
      );

      if (response.data && response.data.note) {
        showToastMessage("Note pinned successfully");
      }
      getAllNotes(); // Refresh the notes to show the updated state
    } catch (error) {
      console.log(error);
      showToastMessage("Error updating note", "error"); // Show error message
    }
  };

  useEffect(() => {
    getAllNotes();

    return () => {};
  }, []);

  const handleOpenModal = () => {
    setOpenAddEditModal({ isShown: true, type: "add", data: null });
  };

  const handleCloseModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <button
        onClick={() => {
          console.log("Print button clicked");
          window.print(); // Trigger print
        }}
        className="absolute right-10 top-20 px-4  py-2 bg-blue-500 text-white rounded z-[1000] note-cards"
      >
        Print Report
      </button>

      <div className="container mx-auto note-cards mt-[5%]">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => {
                  deleteNode(item);
                }}
                onPinNote={() => {
                  updateIsPinned(item); // Call the toggle function here
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard imgSrc={noteImg} message="Add your notes here" />
        )}
      </div>

      <div>
        {/* Table to display notes */}
        <table className="w-full border-collapse border border-gray-400 printable-table">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Content</th>
              <th className="border border-gray-300 px-4 py-2">Tags</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through allNotes and render each note */}
            {allNotes.length > 0 ? (
              allNotes.map((note) => (
                <tr key={note._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {note.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {note.content}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {note.tags.join(", ")} {/* Join tags array into a string */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No notes available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={handleOpenModal}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
        contentLabel="Add or Edit Note"
        onBlur={handleCloseModal}
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          userId={userId}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
