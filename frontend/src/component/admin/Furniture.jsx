import { Modal } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import FurnitureList from "./FurnitureList";
import FurnitureForm from "./FurnitureForm";
import axios from "axios";
import TokenContext from "../../store/TokenContext";
import { jwtDecode } from "jwt-decode";
import {
  logout,
  showErrorToast,
  showSuccessToast,
  validateEmptyFurniture,
} from "../../resusable/reusablefunction";
import { useNavigate } from "react-router-dom";

function Furniture() {
  /**Token value */
  const { token, setToken } = useContext(TokenContext);
  const { sub, exp } = token ? jwtDecode(token) : undefined;

  //modal state
  const [insertModal, setInsertModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initFurnitureState = { furnitureName: "" };
  //state contain new furniture
  const [furniture, setFurniture] = useState(initFurnitureState);

  //state contain updated furniture
  const [updatedFurniture, setUpdatedFurniture] = useState({});

  //List furniture and pagination state
  const [furnitureList, setFurnitureList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [targetPage, setTargetPage] = useState(0);

  const navigate = useNavigate();

  //call api get all furniture when page is changed
  useEffect(() => {
    getAllFurniture(targetPage);
  }, [targetPage]);

  //get all furniture from backend
  const getAllFurniture = async (targetPage) => {
    try {
      const requestUrl = `http://localhost:8080/api-furniture/v1/furnitures?p=${targetPage}`;

      const response = await fetch(requestUrl);
      const responseJson = await response.json();
      const { data } = responseJson;
      console.log(responseJson);
      setFurnitureList(data);
      setPagination({
        isFirstPage: responseJson.firstPage,
        isLastPage: responseJson.lastPage,
        pageNo: responseJson.pageNumber,
        pageSize: responseJson.pageSize,
        totalPage: responseJson.totalPage,
      });
      console.log(pagination);
    } catch (error) {
      console.log();
    }
  };

  const handlePageClick = (e) => {
    setTargetPage(e.selected);
  };

  //handle show/hide modal
  const handleShowHideInsertModal = () => {
    setInsertModal(!insertModal);
  };

  const handleShowInsertModal = () => {
    setInsertModal(true)
  }

  const handleHideInsertModal = () => {
    setFurniture(initFurnitureState)
    setInsertModal(false)
  }

  const handleShowEditModal = (item) => {
    if (!editModal) setUpdatedFurniture(item);
    setEditModal(true);
  };

  const handleHideEditModal = () => {
    setFurniture(initFurnitureState);
    setEditModal(false);
  };

  //handle change furniture's name state
  const handleChangeFurnitureName = (e) => {
    setFurniture({ furnitureName: e.target.value });
  };

  //handle change updated furniture name
  const handleChangeUpdatedFurniture = (e) => {
    setUpdatedFurniture((prev) => {
      const { id } = prev;
      return { id, furnitureName: e.target.value };
    });
  };

  //insert new furniture
  const handleSubmitInsertFurniture = async () => {
    setIsLoading(true);

    if(validateEmptyFurniture(furniture.furnitureName,"Tên không được để trống")){
      handleShowHideInsertModal()
      setIsLoading(false);
      return
    }

    
    try {
      const response = await axios.post(
        "http://localhost:8080/api-furniture/furnitures",
        furniture,
        {headers : {Authorization: `Bearer ${token}`}}
      );
      showSuccessToast(response.data);

      //re-call api to display new furniture
      getAllFurniture(targetPage);
      setIsLoading(false);
    } catch (error) {
      switch (error.response.status) {
        case 401:
          showErrorToast("phiên đăng nhập đã hết hạn!");
          logout(setToken, navigate);
          break;
        case 403:
          navigate("/unAuthor");
        default:
          showErrorToast(error.response.data.message);
      }
    }

    //close insert modal
    handleHideInsertModal()
  };

  //update existing furniture
  const handleUpdateFurniture = async () => {
    setIsLoading(true);


    if(validateEmptyFurniture(updatedFurniture.furnitureName, "Tên không được để trống")){
      handleHideEditModal()
      setIsLoading(false);
      return
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api-furniture/furnitures",
        updatedFurniture,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //show success message
      showSuccessToast(response.data);

      //re-call api to display updated furniture
      getAllFurniture(targetPage);

      //close edit modal
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
    }
    handleHideEditModal();
  };

  return (
    <div style={{ marginTop: 16 }} className="container">
      <div className="d-flex justify-content-between">
        <h5 className="text-center">Tiện ích:</h5>

        <button
          type="button"
          class="btn btn-primary"
          onClick={() => handleShowInsertModal()}
        >
          Add+
        </button>
      </div>

      <FurnitureList
        onEditModalChange={handleShowEditModal}
        furnitureList={furnitureList}
        onPageClick={handlePageClick}
        pagination={pagination}
      />

      <Modal show={insertModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Thêm tiện ích</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FurnitureForm
            onFurnitureNameChange={handleChangeFurnitureName}
            props={furniture}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => handleHideInsertModal()}
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSubmitInsertFurniture()}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={editModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FurnitureForm
            props={updatedFurniture}
            onFurnitureNameChange={handleChangeUpdatedFurniture}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => handleHideEditModal()}
          >
            Close
          </button>
          <button className="btn btn-warning" onClick={handleUpdateFurniture}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Furniture;
