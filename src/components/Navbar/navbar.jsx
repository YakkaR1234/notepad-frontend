import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import axios from "axios";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogOut = () => {
    try {
      localStorage.clear();
      navigate("/login"); // Navigate to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery(" ");
    handleClearSearch();
    // Add additional logic to clear search results or reset UI
  };

  const handleLogout = () => {
    try {
      axios
        .post(`https://admin-pp.onrender.com/resetFingerprintData`)
        .then((response) => {
          console.log(response.data);
          window.location.href = "https://admin-pp-front.vercel.app/patients"; // Corrected this line
        })
        .catch((error) => {
          console.error("Error resetting fingerprint data:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow note-cards">
      <h1 className="text-xl font-medium text-black py-2">Notes</h1>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      {/* Wrap Print and Logout buttons together */}


        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:from-blue-600 hover:to-blue-800"
          onClick={handleLogout}
        >
          Logout
        </button>
     

      {userInfo && <ProfileInfo userInfo={userInfo} onLogOut={onLogOut} />}
    </div>
  );
};

export default Navbar;
