import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BookingList from "./BookingList";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import {useNavigate} from "react-router-dom"
import {
  logout,
  showErrorToast,
  showSuccessToast,
} from "../../resusable/reusablefunction";
import TokenContext from "../../store/TokenContext";

function ManageBooking() {
  const [bookings, setBooking] = useState([]);
  const [pagination, setPagination] = useState({});
  const [targetPage, setTargetPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const {token, setToken} = useContext(TokenContext)
  const navigate = useNavigate()
  useEffect(() => {
    getAllBookings(targetPage);
  }, [targetPage]);

  const getAllBookings = async (targetPage) => {
    try {


      const requestUrl = `http://localhost:8080/api-booking/booking?p=${targetPage}`;
      const response = await fetch(requestUrl);
      const responseJson = await response.json();
      const { data } = responseJson;
      setBooking(data);
      setPagination({
        isFirstPage: responseJson.firstPage,
        isLastPage: responseJson.lastPage,
        pageNo: responseJson.pageNumber,
        pageSize: responseJson.pageSize,
        totalPage: responseJson.totalPage,
      });
    } catch (error) {
      console.log(error)

    }
  };

  const getBookingByConfirmationCode = async (confirmationCode) => {
    try {
      const requestUrl = `http://localhost:8080/api-booking/booking/confirm-code?confirmationCode=${confirmationCode}`;
      const response = await fetch(requestUrl);
      const responseJson = await response.json();
      const { data } = responseJson;
      setBooking(data);
      setPagination({
        isFirstPage: responseJson.firstPage,
        isLastPage: responseJson.lastPage,
        pageNo: responseJson.pageNumber,
        pageSize: responseJson.pageSize,
        totalPage: responseJson.totalPage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckoutBooking = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8080/api-booking/booking/${id}`,
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      getAllBookings(0);
      showSuccessToast(response.data)
    } catch (error) {
      handleErrorResponse(error)
    }
    setIsLoading(false);
  };

  const handlePageClick = (e) => {
    setTargetPage(e.selected);
  };

  const handleChangeConfirmationCode = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleErrorResponse = (error) => {
    console.log(error)
    switch (error.response.status) {
      case 401:
        showErrorToast("phiên đăng nhập đã hết hạn!");
        logout(setToken, navigate);
        break;
      case 403:
        navigate("/unAuthor");
      default:
        showErrorToast(error.response.data.message);
        break;
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div class="mb-3 row">
                <label for="inputSearchBooking" class="col-md-3 col-form-label">
                  <b>Search booking:</b>
                </label>
                <div class="col-md-5">
                  <input
                    type="text"
                    class="form-control"
                    id="inputSearchBooking"
                    placeholder="Enter booking confirm code"
                    onChange={(e) => handleChangeConfirmationCode(e)}
                  />
                </div>
                <div class="col-md-4">
                  <button type="submit" class="btn btn-primary mb-3" onClick={() => getBookingByConfirmationCode(confirmationCode)}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          <BookingList
            bookings={bookings}
            onPageClick={handlePageClick}
            pagination={pagination}
            onCheckOutBooking={handleCheckoutBooking}
          />
        </div>
      )}
    </>
  );
}

export default ManageBooking;
