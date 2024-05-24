import React, { useState, useContext } from "react";
import Context from "../../store/Context";
import { Link, useNavigate } from "react-router-dom";
import { setBooking } from "../../store/actions";
import { toast } from "react-toastify";
import moment from "moment";

function PublicHeader({ accessToken, authorities, OnShowLoginModal, OnLogout }) {
  const initBooKingDate = {
    checkInDate: new Date(),
    checkOutDate: new Date(),
  };
  const [bookingDate, setBookingDate] = useState(initBooKingDate);
  const [isShowReserve, setIsShowReserve] = useState(false);
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const handleShowReserveBlock = () => {
    setIsShowReserve(!isShowReserve);
  };

  const handleSetCheckInDate = (e) => {
    setBookingDate((prev) => ({
      ...prev,
      checkInDate: new Date(e.target.value),
    }));
  };

  const handleSetCheckOutDate = (e) => {
    setBookingDate((prev) => ({
      ...prev,
      checkOutDate: new Date(e.target.value),
    }));
  };

  const handleBookingDate = (e) => {
    const formattedCheckInDate = bookingDate.checkInDate
      .toISOString()
      .slice(0, 10);
    const formattedCheckOutDate = bookingDate.checkOutDate
      .toISOString()
      .slice(0, 10);
    const checkIn = moment(formattedCheckInDate);
    const checkOut = moment(formattedCheckOutDate);

    //validate check-in check-out date
    if (checkIn.isSameOrAfter(checkOut)) {
      toast.error("Ngày check in phải trước ngày check out", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      dispatch(setBooking(bookingDate));
      navigate("/booking");
    }
  };

  return (
    <div style={{ position: "fixed", zIndex: 1, left: 0, right: 0, top: 0 }}>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-top border-white"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              <b>QUỐC CƯỜNG CONTINENTAL</b>
            </Link>
          </div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-light" aria-current="page" to="/">
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-light"
                aria-current="page"
                to="/stay"
              >
                Stay
              </Link>
            </li>
            {accessToken ? (
              authorities.includes("ADMIN") ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/admin/room">
                      Admin
                    </Link>
                  </li>
                  <li className="nav-item" onClick={() => OnLogout()}>
                    <a className="btn nav-link text-light">Log out</a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link text-light" onClick={() => OnLogout()}>Log out</a>
                </li>
              )
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link text-light btn"
                  onClick={() => OnShowLoginModal()}
                >
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-white"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand">Paradise inside NEW-YORK</a>
          </div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              className="nav-item d-flex align-item-center"
              style={{ marginRight: 30 }}
            >
              <i
                class="fa-solid fa-phone text-light"
                style={{ marginTop: 20 }}
              ></i>
              <a
                className="nav-link text-decoration-underline text-light"
                aria-current="page"
                href="#"
                style={{ marginTop: 8 }}
              >
                +(84) 931873975
              </a>
            </li>
            <li className="nav-item">
              <div class="dropdown">
                <button
                  type="button"
                  class="btn btn-light btn-lg dropdown-toggle rounded-pill"
                  onClick={handleShowReserveBlock}
                >
                  Reserve
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {isShowReserve && (
        <div
          className="bg-light row shadow-sm p-3 bg-body-tertiary rounded position-absolute"
          style={{ zIndex: 1, right: 0, left: 0 }}
        >
          <div className="col-md-5 border-end text-center border-black">
            <h5>Check-in</h5>
            <input
              type="date"
              className="form-control"
              onChange={(e) => handleSetCheckInDate(e)}
              value={bookingDate.checkInDate.toISOString().substring(0, 10)}
            />
          </div>
          <div className="col-md-5 border-end text-center border-black">
            <h5>Check-out</h5>
            <input
              type="date"
              className="form-control"
              onChange={(e) => handleSetCheckOutDate(e)}
              value={bookingDate.checkOutDate.toISOString().substring(0, 10)}
            />
          </div>
          <div className="col-md-2 text-center">
            <a
              type="button"
              class="btn btn-dark rounded-pill px-3 my-4"
              onClick={(e) => handleBookingDate(e)}
            >
              Find room
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicHeader;
