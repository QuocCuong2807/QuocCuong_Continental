import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";
import ImageSlider from "../common/ImageSlider";

function RoomDetail() {
  const { id } = useParams();
  const initRoomState = {
    id: "",
    name: "",
    mainImage: "",
    price: 0,
    imageDescription: [],
    furnitureSet: [],
  };
  const [room, setRoom] = useState(initRoomState);
  const [isLoading, setIsLoading] = useState(false);
  console.log(id);

  useEffect(() => {
    getRoomById(id);
  }, []);

  const getRoomById = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api-room/room/${id}`
      );
      setRoom(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" border-bottom border-light" style={{ backgroundColor: "#000001" , marginTop: 120}}>
          <div className="container bg-white " style={{ padding: 0}}>
            <div className="image-slider">
              <ImageSlider slideImages={room.imageDescription} />
            </div>
            <div className="room-info" style={{ padding: 10 }}>
              <div className="room-name border-bottom border-dark">
                <h3 className="my-5">
                  <b>{room.name}</b>
                </h3>
              </div>
              <div className="room-interior border-bottom border-dark">
                <h4 className="interior-name " style={{marginTop: 50}}>
                  <b>Tiện ích:</b>
                </h4>
                <div className="interior-group d-flex flex-wrap " style={{marginTop: 22, marginBottom: 50}}>
                  {room.furnitureSet.map((item, index) => (
                    <span
                      key={index}
                      className="btn btn-light rounded-pill mx-2 d-inline-block border border-3 border-gray"
                      style={{width: "10%", pointerEvents: 'none'}}
                    >
                      {item.furnitureName}
                    </span>
                  ))}
                </div>
              </div>
              <div className="room-price d-flex " style={{marginTop:50}}>
                <h4 >Giá:</h4>
                <h4 className="mx-3">{room.price}$ / Night</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RoomDetail;
