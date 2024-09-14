import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

function RoomBanner({ rooms }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="container">
      <h2 className="my-5 text-center">Rooms & Suits</h2>
      <Carousel responsive={responsive}>
        {rooms.map((item, index) => (
          <Link to = {`/roomDetail/${item.id}`} style={{ textDecoration: "none" }}>
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={item.mainImage}
                class="card-img-top"
                alt="..."
                style={{ height: 162 }}
              />
              <div class="card-body">
                <p class="card-text d-inline-block text-truncate" style={{width: 265}}>{item.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default RoomBanner;
