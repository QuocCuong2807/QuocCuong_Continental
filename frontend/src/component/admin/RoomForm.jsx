import React from "react";

function RoomForm({
  furnitureList,
  room,
  OnCheckFurniture,
  OnChangeMainImage,
  OnChangeImageDescription,
  OnRoomNameChange,
  OnRoomPriceChange,
  OnRoomDescriptionChange,
}) {


  const furnitureIds = room.furnitureSet.map((element) => element.id);

  return (
    <div>
      <div className="mb-3 row">
        <label for="inputRoom" className="col-sm-3 col-form-label">
          Loại phòng:
        </label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            id="inputRoom"
            name="name"
            onChange={(e) => OnRoomNameChange(e)}
            value={room.name}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label for="mainImage" className="col-sm-3 col-form-label">
          Ảnh chính:
        </label>
        <div className="col-sm-9">
          <input
            type="file"
            className="form-control"
            id="mainImage"
            name="main_image"
            onChange={(e) => OnChangeMainImage(e)}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label for="imgDescription" className="col-sm-3 col-form-label">
          Ảnh bổ sung:
        </label>
        <div className="col-sm-9">
          <input
            type="file"
            className="form-control"
            id="imgDescription"
            name="image_description"
            multiple
            onChange={(e) => OnChangeImageDescription(e)}
          />
        </div>
      </div>

      <div className="mb-3 row">
        {furnitureList.map((item, index) => (
          <div className="col-md-3" key={index}>
            <label>{item.furnitureName}</label>{" "}
            <input
              type="checkbox"
              className="form-check-input"
              checked={furnitureIds.includes(item.id)}
              onChange={() => OnCheckFurniture(item)}
            />
          </div>
        ))}
      </div>

      <div className="mb-3 row">
        <label for="roomPrice" className="col-sm-3 col-form-label">
          Giá phòng:
        </label>
        <div className="col-sm-9">
          <input
            type="number"
            className="form-control"
            id="roomPrice"
            multiple
            name="price"
            onChange={(e) => OnRoomPriceChange(e)}
            value={room.price}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label for="roomDescription" className="col-sm-3 col-form-label">
          Mô tả:
        </label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            id="roomDescription"
            name="description"
            onChange={(e) => OnRoomDescriptionChange(e)}
            value={room.description}
          />
        </div>
      </div>
    </div>
  );
}

export default RoomForm;
