import React from "react";

function FurnitureForm({ onFurnitureNameChange, props }) {
  console.log(props)
  return (
    <div>
      <div className="mb-3 row">
        <label for="inputFurniture" className="col-sm-2 col-form-label">
          Tiện ích
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputFurniture"
            value={props.furnitureName}
            onChange={(e) => onFurnitureNameChange(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default FurnitureForm;
