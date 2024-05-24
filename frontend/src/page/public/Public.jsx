import React, { useContext, useState } from "react";
import axios from "axios";
import PublicHeader from "../../component/common/PublicHeader";
import { Outlet } from "react-router-dom";
import Footer from "../../component/common/Footer";
import BookingProvider from "../../store/BookingProvider";
import { Modal } from "react-bootstrap";
import TokenContext from "../../store/TokenContext";
import { jwtDecode } from "jwt-decode";
import LoginForm from "../../component/common/LoginForm";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";


function Public() {
  /**states contains token values */
  const { token, setToken } = useContext(TokenContext);
  const { aud } = token ? jwtDecode(token) : "";
  const roles = aud ? [aud.slice(1,-1)] : [];

  /**states contains authentication values */
  const initAuthentication = { userName: "", password: "" };
  const [authentication, setAuthentication] = useState(initAuthentication);

  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate()
  /**handle with state function*/
  const handleShowLoginForm = () => {
    setShowLoginForm(true);
  };
  const handleHideLoginForm = () => {
    setAuthentication(initAuthentication);
    setShowLoginForm(false);
  };

  const handleSetUsername = (e) => {
    setAuthentication((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSetPassword = (e) => {
    setAuthentication((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleReceiveToken = (token) => {
    localStorage.setItem("accessToken", token);
    setToken(token);
  };

  console.log(authentication)

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        authentication
      );
      const { accessToken } = response.data;
      handleReceiveToken(accessToken);
    } catch (error) {
      console.log(error);
      toast.error("Bad Credentials", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    handleHideLoginForm();
  };

  const Logout = () => {
    localStorage.removeItem("accessToken")
    setToken("")
    
  }

  return (
    <div>
      <BookingProvider>
        <PublicHeader
          accessToken={token}
          authorities={roles}
          OnShowLoginModal={handleShowLoginForm}
          OnLogout = {Logout}
        />
        <Outlet />
        <Footer />

        <Modal show={showLoginForm} backdrop="static" keyboard={false}>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm
              Auth={authentication}
              OnUsernameChange={handleSetUsername}
              OnPasswordChange={handleSetPassword}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleHideLoginForm}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={login}
            >
              Login
            </button>
          </Modal.Footer>
        </Modal>
      </BookingProvider>
    </div>
  );
}

export default Public;
