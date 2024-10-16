import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

const Navbar = ({ userInfo, onSearchNote,handleClearSearch }) => {
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
    handleClearSearch()
    // Add additional logic to clear search results or reset UI
  };



  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h1 className="text-xl font-medium text-black py-2">Notes</h1>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      {userInfo && <ProfileInfo userInfo={userInfo} onLogOut={onLogOut} />}
    </div>
  );
};

export default Navbar;