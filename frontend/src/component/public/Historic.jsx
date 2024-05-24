import React from "react";

function Historic() {
  return (
    <div className="container " style={{ marginTop: 100, marginBottom: 100 }}>
      <h3 className="text-center ">LỊCH SỬ HÌNH THÀNH & PHÁT TRIỂN</h3>
      <div className="row" style={{ marginTop: 100 }}>
        <div className="col-md-6">
          <img
            src="https://cache.marriott.com/content/dam/marriott-renditions/NYCNU/nycnu-exterior-8547-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1300px:*"
            alt=""
            className="d-block rounded-4"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <div className="my-auto">
            <h3 className="my-5">BIỂU TƯỢNG DUY NHẤT</h3>
            <p className="lh-lg">
              Được xây dựng vào năm 2024, khách sạn Quốc Cường Continental lần
              đầu tiên được ủy quyền bởi Germania Life Insurance với chủ đầu tư
              là ông: Nguyễn Quốc Cường, một doanh nhân trẻ đầy tham vọng, chúng
              tôi đã giữ lại một số nét hùng vĩ của trường phái cũ đó và truyền
              vào đó những thiết kế siêu hiện đại, táo bạo và lôi cuốn. Chúng
              tôi tôn vinh hiện tại, sống trong hiện tại và luôn nghĩ về điều gì
              sẽ xảy ra tiếp theo.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="my-auto">
            <h3 className="my-5">NEW YORK - THE BEST CITY</h3>
            <p className="lh-lg">
              Tọa lạc tại một trong những vị trí có vị trí tốt nhất ở Thành phố
              New York, ngay giao lộ giữa Uptown và Downtown. (Chúng tôi cũng
              không xa các quận phía đông.) Ở bất kỳ hướng nào, bạn sẽ tìm thấy
              những điều tuyệt vời nhất về nghệ thuật, âm nhạc, ẩm thực cao cấp,
              mua sắm và nhiều hơn thế nữa.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src="https://cache.marriott.com/content/dam/marriott-renditions/NYCNU/nycnu-exterior-7088-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1300px:*"
            alt=""
            className="d-block rounded-4"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Historic;
