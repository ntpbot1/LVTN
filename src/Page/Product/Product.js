import { Container, Row, Col, Image } from "react-bootstrap";

import "./Product.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
function Product() {
  return (
    <>
      <div className="py-5 product-container">
        <Container>
          <Row>
            <Col md={9} sm={12}>
              <div className="product-list">
                <Link
                  to={"/chi-tiet"}
                  className="text-decoration-none text-dark bg-transparent"
                >
                  <Row className="my-4 product-item bg-white rounded ">
                    <Col sm={12} md={4}>
                      <Image
                        className="w-100 product-img"
                        src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                      ></Image>
                    </Col>
                    <Col sm={12} md={8} className="product-content">
                      <div className=" h-75 py-3">
                        <div className="fs-6 home-product-title">
                          Nhà bán khu vực Đức Hòa, Long An
                        </div>
                        <div className="py-1 d-flex home-product-price">
                          <div className="text-danger ">2.1 Tỷ</div>
                          <div className="text-danger  ps-3">
                            108 m<sup>2</sup>
                          </div>
                        </div>
                        <div className="py-1 d-flex home-product-address">
                          <div className="">
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              style={{ color: "#ccc" }}
                            />
                          </div>
                          <div className="ps-3">Đức Hòa, Long An</div>
                        </div>
                      </div>
                      <div className="py-auto h-25">
                        <div className="home-product-date">
                          Đăng 3 ngày trước
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Link>
                <Link
                  to={"/chi-tiet"}
                  className="text-decoration-none text-dark bg-transparent"
                >
                  <Row className="my-3 product-item bg-white rounded ">
                    <Col sm={12} md={4}>
                      <Image
                        className="w-100 product-img"
                        src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                      ></Image>
                    </Col>
                    <Col sm={12} md={8} className="product-content">
                      <div className=" h-75 py-3">
                        <div className="fs-6 home-product-title">
                          Nhà bán khu vực Đức Hòa, Long An
                        </div>
                        <div className="py-1 d-flex home-product-price">
                          <div className="text-danger ">2.1 Tỷ</div>
                          <div className="text-danger  ps-3">
                            108 m<sup>2</sup>
                          </div>
                        </div>
                        <div className="py-1 d-flex home-product-address">
                          <div className="">
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              style={{ color: "#ccc" }}
                            />
                          </div>
                          <div className="ps-3">Đức Hòa, Long An</div>
                        </div>
                      </div>
                      <div className="py-auto h-25">
                        <div className="home-product-date">
                          Đăng 3 ngày trước
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Link>
                <Link
                  to={"/chi-tietchi-tiet"}
                  className="text-decoration-none text-dark bg-transparent"
                >
                  <Row className="my-3 product-item bg-white rounded ">
                    <Col sm={12} md={4}>
                      <Image
                        className="w-100 product-img"
                        src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                      ></Image>
                    </Col>
                    <Col sm={12} md={8} className="product-content">
                      <div className=" h-75 py-3">
                        <div className="fs-6 home-product-title">
                          Nhà bán khu vực Đức Hòa, Long An
                        </div>
                        <div className="py-1 d-flex home-product-price">
                          <div className="text-danger ">2.1 Tỷ</div>
                          <div className="text-danger  ps-3">
                            108 m<sup>2</sup>
                          </div>
                        </div>
                        <div className="py-1 d-flex home-product-address">
                          <div className="">
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              style={{ color: "#ccc" }}
                            />
                          </div>
                          <div className="ps-3">Đức Hòa, Long An</div>
                        </div>
                      </div>
                      <div className="py-auto h-25">
                        <div className="home-product-date">
                          Đăng 3 ngày trước
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Link>
              </div>
            </Col>
            <Col md={3} sm={12}></Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Product;
