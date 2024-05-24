import React from "react";
import ReactPaginate from "react-paginate";

function RoomList({ OnShowEditRoomModal, rooms, onPageClick, pagination, OnDeleteRoom }) {
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Loại phòng</th>
            <th scope="col">Giá</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index}</th>
              <td style={{ width: 100 }}>
                <img
                  src={item.mainImage}
                  style={{ width: "100%" }}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.price}$</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning "
                  onClick={() => OnShowEditRoomModal(item.id)}
                >
                  edit
                </button>
                <button className="btn btn-danger mx-3" onClick={() => OnDeleteRoom(item.id)}>Delete</button>
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

export default RoomList;
