import Carousel from "react-bootstrap/Carousel";
import "./DetailProduct.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";

function DetailProduct() {
  return (
    <>
      <div className="detail-content">
        <div className="container py-5 detail-container">
          <div className="row">
            <div className="col-9">
              <Carousel slide={false} interval={null}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
              <div className="pt-4 fs-4 detail-title">
                Nhà bán khu vực Đức Hòa, Long An
              </div>
              <div className="py-3 fs-7 detail-address">
                Đường 824, Xã Đức Hòa Hạ, Đức Hòa, Long An
              </div>
              <div className="py-3 d-flex detail-info">
                <div className="d-flex flex-column">
                  <div className="detail-info-title">Mức giá</div>
                  <div className="detail-info-value">2.1 Tỷ</div>
                </div>
                <div className="ps-5 d-flex flex-column">
                  <div className="detail-info-title">Diện tích</div>
                  <div className="detail-info-value">
                    102 m<sup>2</sup>
                  </div>
                </div>
                <div className="ps-5 d-flex flex-column">
                  <div className="detail-info-title">Phòng ngủ</div>
                  <div className="detail-info-value">4</div>
                </div>
              </div>
              <div className="py-3 detail-descriptions">
                <div className="py-3 detail-descriptions-title">
                  Thông tin mô tả
                </div>
                <div className="detail-descriptions-value">
                  Giảm giá 300 triệu. Cần bán. Nhà 1 lầu đúc. I. Ngân hàng hỗ
                  trợ vay 25 năm. 2 mặt tiền trước sau. Đường 5m bê tông. Diện
                  tích 4.5x24m. Nội thất đẹp cao cấp, cửa + bếp gổ tự nhiên. 4
                  phòng ngủ + 2 toilet + bếp + phòng khách + phòng thờ. 01 phòng
                  trọ. Vào ở thu nhập ngay 2tr/ tháng. Nhà khu trung tâm Tt Đức
                  hòa. Nhựa TL 824 rẻ vào đường nhựa óc eo + nhà nghỉ Duyên quê.
                  Khu trung tâm thành phố Đức hòa trong tương lại 2025. Giá
                  chính chủ: 2 tỉ 1.
                </div>
              </div>
              <div className="py-3 detail-characterize">
                <div className="py-3 detail-characterize-title">
                  Đặc điểm bất động sản
                </div>
                <div className="row py-3 detail-characterize-value">
                  <ListGroup
                    className="col-6 detail-characterize-list"
                    variant="flush"
                  >
                    <ListGroup.Item className="border-top detail-characterize-item ">
                      <div className="row">
                        <div className="col-6 detail-characterize-item-title">
                          Diện tích
                        </div>
                        <div className="col-6 detail-characterize-item-value">
                          108 m<sup>2</sup>
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className=" detail-characterize-item ">
                      <div className="row">
                        <div className="col-6 detail-characterize-item-title">
                          Mặt tiền
                        </div>
                        <div className="col-6 detail-characterize-item-value">
                          10 m<sup>2</sup>
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className=" detail-characterize-item ">
                      <div className="row">
                        <div className="col-6 detail-characterize-item-title">
                          Hướng nhà
                        </div>
                        <div className="col-6 detail-characterize-item-value">
                          Bắc
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className=" detail-characterize-item ">
                      <div className="row">
                        <div className="col-6 detail-characterize-item-title">
                          Số tầng
                        </div>
                        <div className="col-6 detail-characterize-item-value">
                          1 tầng
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-bottom detail-characterize-item ">
                      <div className="row">
                        <div className="col-6 detail-characterize-item-title">
                          Số toilet
                        </div>
                        <div className="col-6 detail-characterize-item-value">
                          2 phòng
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup
                    className="col-6 detail-characterize-list"
                    variant="flush"
                  >
                    <ListGroup.Item className="border-top detail-characterize-item ">
                      <div className="row">
                        <div className="col-6 detail-characterize-item-title">
                          Mức giá
                        </div>
                        <div className="col-6 detail-characterize-item-value">
                          2.1 tỷ
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className=" detail-characterize-item ">
                      <div className="row">
                        <div className="col-6 detail-characterize-item-title">
                          Đường vào
                        </div>
                        <div className="col-6 detail-characterize-item-value">
                          5 m
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className=" detail-characterize-item ">
                      <div className="row">
                        <div className="col-6 detail-characterize-item-title">
                          Hướng ban công
                        </div>
                        <div className="col-6 detail-characterize-item-value">
                          Bắc
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className=" detail-characterize-item ">
                      <div className="row">
                        <div className="col-6 detail-characterize-item-title">
                          Số phòng ngủ
                        </div>
                        <div className="col-6 detail-characterize-item-value">
                          4 phòng
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-bottom detail-characterize-item ">
                      <div className="row">
                        <div className="col-6 detail-characterize-item-title">
                          Pháp lý
                        </div>
                        <div className="col-6 detail-characterize-item-value">
                          Sổ đỏ/ Sổ hồng
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
              <div className="py-3 d-flex detail-info">
                <div className="d-flex flex-column">
                  <div className="detail-info-title">Ngày đăng</div>
                  <div className="detail-info-value">16/05/2023</div>
                </div>
                <div className="ps-5 d-flex flex-column">
                  <div className="detail-info-title">Ngày hết hạn</div>
                  <div className="detail-info-value">26/05/2023</div>
                </div>
                <div className="ps-5 d-flex flex-column">
                  <div className="detail-info-title">Loại tin</div>
                  <div className="detail-info-value">Tin thường</div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="border rounded ">
                <div className="pt-4 pb-3 px-4 w-100 d-flex flex-column justify-content-center align-items-center personal-info">
                  <Image
                    roundedCircle={true}
                    width={64}
                    height={64}
                    src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                  ></Image>
                  <div className="py-1 personal-info-title">Được đăng bởi</div>
                  <div className="py-1 personal-info-name">Nguyễn Văn A</div>
                  <Button
                    className="border w-100 mt-2"
                    variant="light"
                    size="lg"
                  >
                    Gửi email
                  </Button>
                </div>

                {/* <Figure>
                  <Figure.Image
                    className="rounded-circle"
                    width={75}
                    height={75}
                    alt="171x180"
                    src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                  />
                </Figure> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
