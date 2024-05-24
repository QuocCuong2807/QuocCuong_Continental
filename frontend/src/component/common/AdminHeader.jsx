import React from "react";
import {Link} from 'react-router-dom'

function AdminHeader() {
  return (
    <nav className="navbar navbar-expand-lg " style={{backgroundColor: "#e3f2fd"}}>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/admin/booking" className="nav-link" >
                Quản lý Booking
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/room">
                Quản lý phòng
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/furniture">
                Quản lý tiện ích
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default AdminHeader;
