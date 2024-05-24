import React from "react";
import ReactPaginate from "react-paginate";

function BookingList({ bookings, onPageClick, pagination, onCheckOutBooking }) {
  return (
    <div className="">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Booking Code</th>
            <th scope="col">Họ tên</th>
            <th scope="col">Check-in Date</th>
            <th scope="col">Check-out Date</th>
            <th scope="col">Email</th>
            <th scope="col">Số người ở</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index}</th>
              <td>{item.bookingConfirmCode}</td>
              <td>{item.customerFullName}</td>
              <td>{item.checkInDate}</td>
              <td>{item.checkOutDate}</td>
              <td>{item.customerEmail}</td>
              <td>{item.totalCustomer}</td>
              <td>
                <button type="button" class="btn btn-success" onClick={() => onCheckOutBooking(item.id)}>
                  Trả phòng
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e) => onPageClick(e)}
        pageRangeDisplayed={5}
        pageCount={pagination.totalPage}
        previousLabel="< previous"
        //
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        //
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default BookingList;
