import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import RoomList from "../../component/admin/RoomList";
import RoomForm from "../../component/admin/RoomForm";
import axios from "axios";
import Loading from "../common/Loading";
import {
  showErrorToast,
  showSuccessToast,
  logout,
} from "../../resusable/reusablefunction";
import { useNavigate } from "react-router-dom";
import TokenContext from "../../store/TokenContext";

function Room() {
  const [isShowAddRoomModal, setIsShowAddRoomModal] = useState(false);
  const [isShowEditRoomModal, setIsShowEditRoomModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [multipleImg, setMultipleImg] = useState();
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const handleChooseMultipleFile = (e) => {
    setMultipleImg(e.target.files);
  };


  //init room state
  const initRoomState = {
    id: "",
    name: "",
    main_image: undefined,
    image_description: [],
    furnitureSet: [],
    price: 0,
    description: "",
  };

  //state contain new room for add
  const [room, setRoom] = useState(initRoomState);

  //state contain list room and room's pagination
  const [rooms, setRooms] = useState([]);
  const [pagination, setPagination] = useState({});
  const initPage = 0;
  const [targetPage, setTargetPage] = useState(initPage);

  //state contain furniture list
  const [furnitureList, setFurnitureList] = useState([]);

  //get furniture for add room form
  useEffect(() => {
    setIsLoading(true);
    getAllFurniture();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getAllRooms(targetPage);
  }, [targetPage]);

  const getAllRooms = async (targetPage) => {
    try {
      const requestUrl = `http://localhost:8080/api-room/rooms?p=${targetPage}`;
      const response = await fetch(requestUrl);
      const responseJson = await response.json();
      const { data } = responseJson;

      setRooms(data);
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

  const getAllFurniture = async () => {
    const response = await axios.get(
      "http://localhost:8080/api-furniture/v2/furnitures"
    );
    try {
      setFurnitureList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomById = async (id) => {
    const response = await axios.get(
      `http://localhost:8080/api-room/room/${id}`
    );
    try {
      setRoom(response.data);
      console.log(room);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewRoom = async () => {
    setIsLoading(true);
    const form = new FormData();

    //validate room state - early return
    if (room.name === "" || room.name.trim() === "") {
      showErrorToast("Tên phòng bị trống");
      setRoom(initRoomState);
      setIsLoading(false);
      return;
    }
    if (room.price === "" || room.price <= 0) {
      showErrorToast("Giá tiền không chính xác");
      setRoom(initRoomState);
      setIsLoading(false);
      return;
    }
    if (room.main_image == undefined || multipleImg == undefined) {
      showErrorToast("Vui lòng chọn đầy đủ ảnh");
      setRoom(initRoomState);
      setIsLoading(false);
      return;
    }

    //append room state to form data
    form.append("name", room.name);
    form.append("price", room.price);
    form.append("description", room.description);
    form.append("main_image", room.main_image);

    const furnitureSet = room.furnitureSet.map((item) => item.id);
    form.append("furnitureSet", furnitureSet);

    for (let i = 0; i < multipleImg.length; i++) {
      form.append(`image_description`, multipleImg[i]);
    }

    //post form data to server
    try {
      form.forEach((item) => console.log(item));
      const response = await axios.post(
        "http://localhost:8080/api-room/rooms",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //handle back-end response
      if (response.status == 400) {
        showErrorToast("Thông tin phòng không hợp lệ");
        return;
      } else {
        showSuccessToast(response.data);
        setIsLoading(false);
        handleHideAddRoomModal();
      }
    } catch (error) {
      handleErrorResponse(error);
    }
    setTargetPage(0);
    getAllRooms(targetPage);
  };

  const handleUpdateRoom = async () => {
    setIsLoading(true);
    const form = new FormData();

    //validate state value before append to form data

    if (room.name === "" || room.name.trim() === "") {
      showErrorToast("Tên phòng bị trống");
      handleHideEditModal();
      setIsLoading(false);
      return;
    }
    if (room.price === "" || room.price <= 0) {
      showErrorToast("Tên phòng bị trống");
      handleHideEditModal();
      setIsLoading(false);
      return;
    }

    //append form data value
    form.append("id", room.id);
    form.append("name", room.name);
    form.append("price", room.price);
    form.append("description", room.description);
    form.append("main_image", room.main_image);

    const furnitureSet = room.furnitureSet.map((item) => item.id);
    form.append("furnitureSet", furnitureSet);

    if (multipleImg) {
      for (let i = 0; i < multipleImg.length; i++) {
        form.append(`image_description`, multipleImg[i]);
      }
    } else {
      form.append(`image_description`, undefined);
    }

    //request to server
    try {
      const response = await axios.put(
        "http://localhost:8080/api-room/room",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      showSuccessToast(response.data);
      setIsLoading(false);
      setIsShowEditRoomModal(false);
      setTargetPage(0);
      getAllRooms(targetPage);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleDeleteRoom = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8080/api-room/room/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showSuccessToast(response.data);
      setIsLoading(false);
    } catch (error) {
      handleErrorResponse(error);
    }
    setTargetPage(0);
    getAllRooms(targetPage);
  };

  const handleErrorResponse = (error) => {
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

  //********************************************* HANDLE ROOM FORM **********************************************************//

  const handleChangeRoomName = (e) => {
    setRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeRoomPrice = (e) => {
    setRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeRoomDescription = (e) => {
    setRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //handle check, uncheck checkbox input
  const handleCheckFurniture = (item) => {
    const furnitureIds = room.furnitureSet.map((element) => element.id);

    setRoom((prev) => {
      const isChecked = furnitureIds.includes(item.id);
      console.log(isChecked);
      if (isChecked) {
        return {
          ...prev,
          furnitureSet: prev.furnitureSet.filter(
            (element) => element.id != item.id
          ),
        };
      } else {
        return {
          ...prev,
          furnitureSet: [...prev.furnitureSet, item],
        };
      }
    });
  };

  //handle choose room's main Image, description image
  const handleChooseMainImage = (e) => {
    setRoom((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  //********************************************* END HANDLE ROOM FORM **********************************************************//

  //handle show/hide modal (clear state when close modal)
  const handleShowAddRoomModal = () => {
    setIsShowAddRoomModal(true);
  };

  const handleShowEditModal = (id) => {
    //call api (get room & room's furniture by id )
    getRoomById(id);
    setIsShowEditRoomModal(true);
  };

  const handleHideEditModal = () => {
    setRoom(initRoomState);
    setIsShowEditRoomModal(false);
  };

  const handleHideAddRoomModal = () => {
    setRoom(initRoomState);
    setIsShowAddRoomModal(false);
  };

  const handlePageClick = (e) => {
    setTargetPage(e.selected);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ marginTop: 16 }} className="container">
          <div className="d-flex justify-content-between">
            <h5 className="text-center">Phòng:</h5>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleShowAddRoomModal()}
            >
              Add +
            </button>
          </div>
          <RoomList
            OnShowEditRoomModal={handleShowEditModal}
            rooms={rooms}
            onPageClick={handlePageClick}
            pagination={pagination}
            OnDeleteRoom={handleDeleteRoom}
          />

          <Modal show={isShowAddRoomModal} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title>Thêm phòng mới:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RoomForm
                furnitureList={furnitureList}
                room={room}
                OnRoomNameChange={handleChangeRoomName}
                OnRoomPriceChange={handleChangeRoomPrice}
                OnRoomDescriptionChange={handleChangeRoomDescription}
                OnCheckFurniture={handleCheckFurniture}
                OnChangeMainImage={handleChooseMainImage}
                OnChangeImageDescription={handleChooseMultipleFile}
              />
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={() => handleHideAddRoomModal()}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleAddNewRoom()}
              >
                Save
              </button>
            </Modal.Footer>
          </Modal>

          <Modal show={isShowEditRoomModal} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RoomForm
                furnitureList={furnitureList}
                room={room}
                OnRoomNameChange={handleChangeRoomName}
                OnRoomPriceChange={handleChangeRoomPrice}
                OnRoomDescriptionChange={handleChangeRoomDescription}
                OnCheckFurniture={handleCheckFurniture}
                OnChangeMainImage={handleChooseMainImage}
                OnChangeImageDescription={handleChooseMultipleFile}
              />
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={() => handleHideEditModal()}
              >
                Close
              </button>
              <button
                className="btn btn-warning"
                onClick={() => handleUpdateRoom()}
              >
                Save
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Room;
