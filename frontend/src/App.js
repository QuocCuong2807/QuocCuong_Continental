import Admin from "./page/admin/Admin";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Public from "./page/public/Public";
import Room from "./component/admin/Room";
import Furniture from "./component/admin/Furniture";
import Overview from "./component/public/Overview";
import RoomDetail from "./component/public/RoomDetail";
import Booking from "./component/public/Booking";
import Stay from "./component/public/Stay";
import ManageBooking from "./component/admin/ManageBooking";
import TokenProvider from "./store/TokenProvider";
import Forbidden from "./component/common/Forbidden";
function App() {
  return (
    <div>
      <TokenProvider>
        <Routes>
          <Route path="/" element={<Public />}>
            <Route exact path="/" element={<Overview />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/roomDetail/:id" element={<RoomDetail />} />
            <Route path="/booking" element={<Booking />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route exact path="/admin/booking" element={<ManageBooking />} />
            <Route path="/admin/room" element={<Room />} />
            <Route path="/admin/furniture" element={<Furniture />} />
          </Route>
          <Route path="/unAuthor" element={<Forbidden/>}/>
        </Routes>
      </TokenProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
