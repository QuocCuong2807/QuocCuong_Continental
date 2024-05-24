import React from "react";

function Footer() {
  return (
    <div className="bg-dark">
      <footer className="text-center text-lg-start text-white p-4">
        <div className="container p-4 pb-0">
          <section className="">
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <h5 className="text-uppercase">SEE YOU SOON...</h5>

                <p>
                  Cảm ơn đã ghé thăm cũng như đã chọn nơi đây làm điểm dừng chân,
                  Mọi thắc mắc vui lòng liên hệ các với các thông tin được nêu sau đây
                </p>
              </div>

              <div className="col-md-4 mb-4 mb-md-0">
                <h5 className="text-uppercase">Thông tin liên hệ</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    
                    <a href="#!" className="text-white text-decoration-none">
                    Số điện thoại:  0931873975
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white text-decoration-none">
                      Gmail: cuonnguyen61@gmail.com
                    </a>
                  </li>
                  <li>
                    
                    <a href="#!" className="text-white text-decoration-none">
                    Địa chỉ:  16 TL03 Quận 12 tp. Hồ Chí Minh
                    </a>
                  </li>
                 
                 
                </ul>
              </div>

              <div className="col-md-4 mb-4 mb-md-0">
                <h5 className="text-uppercase">MẠNG XÃ HỘI</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white text-decoration-none">
                      Facebook: https://www.facebook.com/profile.php?id=100032581879215
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white text-decoration-none">
                      Github: https://github.com/QuocCuong2807
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white text-decoration-none">
                      Linkedin: https://www.linkedin.com/in/cuonnguyen
                    </a>
                  </li>
                  
                </ul>
              </div>


            </div>
          </section>

          <hr className="mb-4" />

          <section className="p-4 text-center">
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="https://www.linkedin.com/in/cuonnguyen/"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href=""
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
