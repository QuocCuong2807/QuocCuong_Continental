import React from "react";

function BookingForm({
  booking,
  OnChangeCustomerName,
  OnChangeCustomerEmail,
  OnChangeTotalCustomer,
}) {
  return (
    <div>
      <div className="mb-3 row">
        <label className="col-sm-3 col-form-label">Họ tên:</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            name="customerFullName"
            value={booking.customerFullName}
            onChange={(e) => OnChangeCustomerName(e)}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-3 col-form-label">Email:</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            name="customerEmail"
            value={booking.customerEmail}
            onChange={(e) => OnChangeCustomerEmail(e)}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-3 col-form-label">Số người ở:</label>
        <div className="col-sm-9">
          <input
            type="number"
            className="form-control"
            name="totalCustomer"
            value={booking.totalCustomer}
            onChange={(e) => OnChangeTotalCustomer(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
