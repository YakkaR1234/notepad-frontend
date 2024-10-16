import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Intro from './Pages/Intro/Intro';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Default route redirects to /intro */}
          <Route path="/" element={<Navigate to="/intro" />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
