import React, { useEffect, useState } from "react";
import Historic from "./Historic";
import RoomBanner from "./RoomBanner";
import axios from "axios";
import Loading from "../common/Loading";
import ImageSlider from "../common/ImageSlider";
import Welcome from "./Welcome";

function Overview() {
  const [roomsBanner, setRoomsBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const imagesSlider = [
    "https://cache.marriott.com/content/dam/marriott-renditions/NYCNU/nycnu-exterior-8548-hor-pano.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1600px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/NYCNU/nycnu-exterior-8939-hor-pano.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1600px:*",
    "https://cache.marriott.com/is/image/marriotts7prod/wh-nycnu-king-studio-suite-80999:Pano-Hor?wid=1600&fit=constrain"
  ];

  useEffect(() => {
    getRoomsBanner();
  }, []);

  const getRoomsBanner = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api-room/v2/rooms"
      );
      setRoomsBanner(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{marginTop: 120}}>

      <ImageSlider slideImages = {imagesSlider} />

      <Welcome/>

      {isLoading ? <Loading /> : <RoomBanner rooms={roomsBanner} />}

      <Historic />
    </div>
  );
}

export default Overview;
