import { toast } from "react-toastify";

export const logout = (setToken, navigate) => {
  localStorage.removeItem("accessToken");
  setToken("");
  navigate("/");
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const validateEmptyFurniture = (furnitureName, message) => {
  if (furnitureName === "" || furnitureName.trim() === "") {
    showErrorToast(message);
    return true;
  } else return false;
};
