import React from "react";
import { Carousel } from "antd";
const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  objectFit: "cover",
  maxWidth: "100%",
  display: "inline-block",
  width: "100%",
};

export default function Banner() {
  return (
    <Carousel autoplay>
      <div>
        <img
          style={contentStyle}
          src="https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
          alt="#"
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://cdn.galaxycine.vn/media/2023/1/14/chi-chi-em-em-2-3_1673710348053.jpg"
          alt="#"
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://cdn.galaxycine.vn/media/2023/1/14/chi-chi-em-em-2-3_1673710348053.jpg"
          alt="#"
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://cdn.galaxycine.vn/media/2023/1/14/chi-chi-em-em-2-3_1673710348053.jpg"
          alt="#"
        />
      </div>
    </Carousel>
  );
}
