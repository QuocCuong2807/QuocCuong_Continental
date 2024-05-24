import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function FurnitureList({ onEditModalChange, furnitureList, onPageClick, pagination }) {
 

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Stt</th>
            <th scope="col">Nội thất</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {furnitureList.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index}</th>
              <td>{item.furnitureName}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => onEditModalChange(item)}
                >
                  edit
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

export default FurnitureList;
