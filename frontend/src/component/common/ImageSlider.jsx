import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function ImageSlider({ slideImages }) {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
  };

  return (
    <div>
      <Slide>
        {slideImages.map((item, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${item})`, backgroundPosition:'center' }}
            >
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default ImageSlider;
