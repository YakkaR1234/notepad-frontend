import { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from '../../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate()


  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }
    

    setError("");

    // Your signup logic here
    try {
      
      const response = await axiosInstance.post('/create-account', {
        fullName: username,
        email: email,
        password: password,
      });
       // <--- Added closing parenthesis
  
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
  
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again");
      }
    }
    
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7">Signup</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
                  
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>} 
            
            <button type="submit" className="btn-primary">Signup</button>

            
            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
