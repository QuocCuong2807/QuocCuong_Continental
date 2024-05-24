import React from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

function AvailableRooms({ availableRooms, onPageClick, pagination, OnShowModal }) {
  return (
    <div className="container" style={{ marginTop: 60, marginBottom: 100 }}>
      {availableRooms.map((item, index) => (
        
        <div className="row mb-3" key={index}>
          <div className="col-md-6 ">
            <img
              src={item.mainImage}
              className="w-100 h-100"
            />
          </div>
          <div className="col-md-6" style={{ marginTop: 80 }}>
            <div className="room-heading my-3">
              <h5>{item.name}</h5>
            </div>
            <div className="row align-item-center">
              <div className="col-md-5">
                <p>
                  <b>Thanh toán sau khi trả phòng</b>
                </p>
              </div>
              <div className="col-md-5 d-flex">
                <h5 className="room-price ">{item.price}</h5>
                <p className="mx-2">USD / Night</p>
              </div>
              <div className="col-md-2">
                <button className="btn btn-dark text-light rounded-pill px-3" onClick={() => OnShowModal(item.id)}>
                  Select
                </button>
              </div>
            </div>
            <div className="room-info">
              <p style={{ color: "#707070" }}>{item.description}</p>
              <Link to={`/roomDetail/${item.id}`} style={{ color: "#707070", textDecoration: "underline" }}>
                View Detail
              </Link>
            </div>
          </div>
        </div>
      ))}
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

export default AvailableRooms;
