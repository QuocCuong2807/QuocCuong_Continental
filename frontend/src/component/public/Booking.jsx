import { Modal } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Context from "../../store/Context";
import AvailableRooms from "./AvailableRooms";
import BookingForm from "./BookingForm";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import { showErrorToast, showSuccessToast } from "../../resusable/reusablefunction";
import TokenContext from "../../store/TokenContext";

function Booking() {
  //booking date
  const { state } = useContext(Context);
  const { checkInDate, checkOutDate } = state;

  const initTargetPage = 0;
  const [targetPage, setTargetPage] = useState(initTargetPage);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [sorting, setSorting] = useState("");
  const [isShowBookingModal, setIsShowBookingModal] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

  const {token, setToken} = useContext(TokenContext)

  const initBookingRequest = {
    customerFullName: "",
    customerEmail: "",
    checkInDate: checkInDate.toISOString().slice(0, 10),
    checkOutDate: checkOutDate.toISOString().slice(0, 10),
    totalCustomer: 1,
    roomId: 0,
  };
  const [bookingRequest, setBookingRequest] = useState(initBookingRequest);

  useEffect(() => {
    getAvailableRooms(checkInDate, checkOutDate);
  }, [targetPage, sorting, state]);

  const getAvailableRooms = async (checkInDate, checkOutDate) => {
    const formattedCheckInDate = checkInDate.toISOString().slice(0, 10);
    const formattedCheckOutDate = checkOutDate.toISOString().slice(0, 10);
    try {
      const requestUrl = `http://localhost:8080/api-booking/availableRooms?checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}&p=${targetPage}&sortParam=${sorting}`;
      const response = await fetch(requestUrl);
      const responseJson = await response.json();
      console.log(responseJson)
      if(responseJson.status === 400){
        showErrorToast(responseJson.message)
        return
      }
      const { data } = responseJson;
      setAvailableRooms(data);
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

  //submit booking
  const handleSubmitBooking = async () => {
    if (bookingRequest.totalCustomer <= 0) {
      showErrorToast("Số người ở tối thiểu là 1")
      setIsShowConfirmModal(false);
      setIsShowBookingModal(false);
      return;
    }
    if (!validateEmail(bookingRequest.customerEmail)) {
      showErrorToast("Email không hợp lệ")
      setIsShowConfirmModal(false);
      setIsShowBookingModal(false);
      return;
    }
    if (bookingRequest.customerFullName.trim() === "") {
      showErrorToast("Họ tên không được để trống")
      setIsShowConfirmModal(false);
      setIsShowBookingModal(false);
      return;
    }
    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api-booking/booking",
        bookingRequest,
        {
          headers: {Authorization: `Bearer ${token ? token : ""}`}
        }
      );

      if (response.status == 400) {
        toast.error("Thông tin booking không hợp lệ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        showSuccessToast("Booking success!")
        setIsLoading(false);
      }
    } catch (error) {
      handleUnAuthorizeBooking(error)
      setIsLoading(false);
    }
    handleHideConfirmModal()
    handleHideBookingModal()
    getAvailableRooms(checkInDate, checkOutDate)
  };

  const handleChangeCustomerFullName = (e) => {
    setBookingRequest((prev) => ({
      ...prev,
      customerFullName: e.target.value,
    }));
  };
  const handleChangeCustomerEmail = (e) => {
    setBookingRequest((prev) => ({ ...prev, customerEmail: e.target.value }));
  };
  const handleChangeTotalCustomer = (e) => {
    setBookingRequest((prev) => ({
      ...prev,
      totalCustomer: e.target.value,
    }));
  };

  const handleShowBookingModal = (roomId) => {
    setBookingRequest((prev) => ({ ...prev, roomId: roomId }));
    setIsShowBookingModal(true);
  };

  const handleHideBookingModal = () => {
    setBookingRequest(initBookingRequest);
    setIsShowBookingModal(false);
  };

  const handleShowConfirmModal = () => {
    setIsShowConfirmModal(true);
  };

  const handleHideConfirmModal = () => {
    setIsShowConfirmModal(false);
  };

  const handleSetSorting = (e) => {
    setSorting(e.target.value);
  };

  const handlePageClick = (e) => {
    setTargetPage(e.selected);
  };

  //function for validate email
  const validateEmail = (email) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
  };

  const handleUnAuthorizeBooking = (error) => {
    switch (error.response.status) {
      case 403:
        showErrorToast("Vui lòng đăng nhập trước khi đặt phòng")
        break;
    
      default:
        break;
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ marginTop: 120 }}>
          <div className="container">
            <div class="mb-3 row" style={{ marginTop: 160 }}>
              <div className="col-md-8"></div>
              <div class="col-md-4 d-flex">
                <label for="priceSorting" class="col-sm-2 col-form-label">
                  Sắp xếp:
                </label>
                <select
                  id="priceSorting"
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => handleSetSorting(e)}
                >
                  <option value="asc">Giá thấp đến cao</option>
                  <option value="desc">Giá cao đến thấp</option>
                </select>
              </div>
            </div>
          </div>
          <AvailableRooms
            availableRooms={availableRooms}
            onPageClick={handlePageClick}
            pagination={pagination}
            OnShowModal={handleShowBookingModal}
          />

          <Modal show={isShowBookingModal} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title>Thông tin đặt phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BookingForm
                booking={bookingRequest}
                OnChangeCustomerName={handleChangeCustomerFullName}
                OnChangeCustomerEmail={handleChangeCustomerEmail}
                OnChangeTotalCustomer={handleChangeTotalCustomer}
              />
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={handleHideBookingModal}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={handleShowConfirmModal}
              >
                Next
              </button>
            </Modal.Footer>
          </Modal>

          <Modal show={isShowConfirmModal} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title>Confirmation:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <p>
                  Hãy đảm bảo rằng thông tin Booking là chính xác, mã xác nhận
                  sẽ được gửi thông qua email
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={handleHideConfirmModal}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleSubmitBooking()}
              >
                Book now
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Booking;
