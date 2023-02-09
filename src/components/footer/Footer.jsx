import React from "react";
import "./footer.scss"

export default function Footer() {
  return (
    <div className="footer__content">
      <div className="footer__top">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <h5>GIỚI THIỆU</h5>
              <ul>
                <li>
                  <i className="fa fa-angle-double-right"></i>VỂ CHÚNG TÔI
                </li>
                <li>
                  <i className="fa fa-angle-double-right"></i>THỎA THUẬN SỬ DỤNG
                </li>
                <li>
                  <i className="fa fa-angle-double-right"></i>QUY CHẾ HOẠT ĐỘNG
                </li>
                <li>
                  <i className="fa fa-angle-double-right"></i>CHÍNH SÁCH BẢO MẬT
                </li>
              </ul>
            </div>
            <div className="col-3">
              <h5>GÓC ĐIỆN ẢNH</h5>
              <ul>
                <li>
                  <i className="fa fa-angle-double-right"></i>THỂ LOẠI PHIM
                </li>
                <li>
                  <i className="fa fa-angle-double-right"></i>BÌNH LUẬN PHIM
                </li>
                <li>
                  <i className="fa fa-angle-double-right"></i>BLOG ĐIỆN ẢNH
                </li>
                <li>
                  <i className="fa fa-angle-double-right"></i>PHIM HAY THÁNG
                </li>
              </ul>
            </div>
            <div className="col-3">
              <h5>HỖ TRỢ</h5>
              <ul>
                <li>
                  <i className="fa fa-angle-double-right"></i>GÓP Ý
                </li>
                <li>
                  <i className="fa fa-angle-double-right"></i>SALE & SERVICE
                </li>
                <li>
                  <i className="fa fa-angle-double-right"></i>RẠP / GIÁ VÉ
                </li>
                <li>
                  <i className="fa fa-angle-double-right"></i>TUYỂN DỤNG
                </li>
              </ul>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <h5>CONNECT</h5>
                <div className="footer__icon">
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-youtube"></i>
                  <i className="fab fa-instagram"></i>
                </div>
              </div>
              <div>
                <h5>DOWNLOAD APP</h5>
                <div className="footer__icon">
                  <i className="fab fa-apple"></i>
                  <i className="fab fa-google-play"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="text-center">
          459 Đ. Sư Vạn Hạnh, Phường 12, Quận 10, Thành phố Hồ Chí Minh 72510
        </p>
      </div>
    </div>
  );
}
