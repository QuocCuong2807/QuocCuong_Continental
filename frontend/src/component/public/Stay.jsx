import React, { useEffect, useState } from "react";
import ImageSlider from "../common/ImageSlider";
import axios from "axios";
import { Link } from "react-router-dom";

function Stay() {
  const imagesSlider = [
    "https://cache.marriott.com/content/dam/marriott-renditions/NYCNU/nycnu-exterior-8548-hor-pano.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1600px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/NYCNU/nycnu-exterior-8939-hor-pano.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1600px:*",
    "https://cache.marriott.com/is/image/marriotts7prod/wh-nycnu-king-studio-suite-80999:Pano-Hor?wid=1600&fit=constrain",
  ];
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllRooms();
  }, []);


  const getAllRooms = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api-room/v2/rooms"
      );
      setRooms(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: 120 }}>
      <ImageSlider slideImages={imagesSlider} />
      <div className="container my-5">
        <div className="stay-title my-5 text-center">
          <h1>ACCOMMODATIONS</h1>
          <p className="mx-5 my-5">
            Lấy cảm hứng từ thành phố và được thiết kế lại theo phong cách táo
            bạo, các phòng và suite của QUỐC CƯỜNG CONTINENTAL đều đạt đẳng cấp
            riêng. Mỗi phòng có màu sắc và các điểm nhấn chu đáo (ví dụ: các
            điểm nhấn sọc đen và trắng gợi nhớ đến lối băng qua đường của thành
            phố NewYork), trong khi bố cục tối ưu hóa sự cân bằng giữa công việc
            và vui chơi. Chào mừng đến với ngôi nhà mới của bạn!.
          </p>
        </div>
        <div className="row">
          {rooms.map((item, index) => (
            <div className="col-md-6 my-3">
              <div
                key={index}
                class="card position-relative"
                style={{
                  background: `url(${item.mainImage})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: 320,
                }}
              >
                <div
                  class="card-body position-absolute w-100"
                  style={{
                    bottom: 0,
                    left: 0,
                    paddingTop: 100,
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .54) 55.04%, rgba(0, 0, 0, .62))",
                  }}
                >
                  <h5 class="card-title text-light">
                    <b>{item.name}</b>
                  </h5>

                  <Link
                    to={`/roomDetail/${item.id}`}
                    class="btn btn-light text-dark"
                  >
                    View more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stay;
