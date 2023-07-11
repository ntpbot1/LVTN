import { Container, Row, Col, Image } from "react-bootstrap";

import "./Product.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
function Product() {
  const navigate = useNavigate();
  const [listProperty, setListProperty] = useState([]);
  useEffect(() => {
    getAllProperty();
  }, []);
  const getAllProperty = async () => {
    if (sessionStorage.getItem("searchCategory")) {
      try {
        let res = await propertyApi.searhCategory(
          sessionStorage.getItem("searchCategory")
        );
        setListProperty(res.data);
      } catch (err) {
        console.log("err", err);
      }
    }
    if (sessionStorage.getItem("searchContent")) {
      try {
        let res = await propertyApi.searh(
          sessionStorage.getItem("searchContent")
        );
        console.log(res);
        setListProperty(res.data);
      } catch (err) {
        console.log("err", err);
      }
    }
  };
  const handleGetDetail = (slug) => {
    sessionStorage.setItem("slug-real-easte", slug);
    navigate("/chi-tiet");
  };
  return (
    <>
      <div className="py-5 product-container">
        {listProperty ? (
          <Container>
            <Row>
              <Col xs={9}>
                <div className="product-list">
                  {listProperty.map((pro, index) =>
                    pro.acreage > 100 ? (
                      <Row
                        className="bg-white rounded product-item product-row"
                        onClick={() => handleGetDetail(pro.slug)}
                        key={index}
                      >
                        <Row
                          // onClick={() => handleGetDetail(pro.slug)}
                          // key={index}
                          // className="my-4  rounded product-item product-row"
                          style={{ height: "300px" }}
                        >
                          <Col
                            xs={8}
                            className="h-100 position-relative product-col"
                          >
                            <Image
                              className="w-100 h-100 product-img-4"
                              src={pro.thumbnail}
                            ></Image>
                            <div className=" text-light rounded d-flex justify-content-center align-items-center card-label">
                              <div className="card-title">TIN VIP 4</div>
                            </div>
                          </Col>
                          <Col xs={4} className="product-content"></Col>
                        </Row>
                        <Row className=" h-75 py-3 d-flex flex-column justify-content-between ">
                          <div className="fs-6 home-product-title">
                            {`${pro.title}`}
                          </div>
                          <div className="py-2 d-flex home-product-price">
                            <div className="text-danger ">
                              {pro.price && pro.price.length >= 10
                                ? `${pro.price[0]},${pro.price.slice(1, 2)} Tỷ`
                                : ""}
                            </div>
                            <div className="text-danger  ps-3">
                              {`${pro.acreage} `} m<sup>2</sup>
                            </div>
                          </div>
                          <div className="py-2 d-flex home-product-address">
                            <div className="">
                              <FontAwesomeIcon
                                icon={faLocationDot}
                                style={{ color: "#ccc" }}
                              />
                            </div>
                            <div className="ps-2">{`${pro.district}, ${pro.city}`}</div>
                          </div>
                          <div className=" home-product-content-4">
                            {`${pro.content}`}
                          </div>
                        </Row>
                      </Row>
                    ) : pro.acreage >= 80 ? (
                      <Row
                        onClick={() => handleGetDetail(pro.slug)}
                        key={index}
                        className="my-4 bg-white rounded product-item product-row"
                        style={{ height: "260px" }}
                      >
                        <Col
                          xs={5}
                          className="h-100 position-relative product-col"
                        >
                          <Image
                            className="w-100 h-100 product-img"
                            src={pro.thumbnail}
                          ></Image>
                          <div className=" text-light rounded d-flex justify-content-center align-items-center card-label">
                            <div className="card-title">TIN VIP 3</div>
                          </div>
                        </Col>
                        <Col xs={7} className="product-content">
                          <div className=" h-100 py-3 d-flex flex-column  ">
                            <div className="fs-6 home-product-title">
                              {`${pro.title}`}
                            </div>
                            <div className="py-2 d-flex home-product-price">
                              <div className="text-danger ">
                                {pro.price && pro.price.length >= 10
                                  ? `${pro.price[0]},${pro.price.slice(
                                      1,
                                      2
                                    )} Tỷ`
                                  : ""}
                              </div>
                              <div className="text-danger  ps-3">
                                {`${pro.acreage} `} m<sup>2</sup>
                              </div>
                            </div>
                            <div className="py-2 d-flex home-product-address">
                              <div className="">
                                <FontAwesomeIcon
                                  icon={faLocationDot}
                                  style={{ color: "#ccc" }}
                                />
                              </div>
                              <div className="ps-3">{`${pro.district}, ${pro.city}`}</div>
                            </div>
                            <div className=" home-product-content-4">
                              {`${pro.content}`}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    ) : pro.acreage >= 70 ? (
                      <Row
                        onClick={() => handleGetDetail(pro.slug)}
                        key={index}
                        className="my-4 bg-white rounded product-item product-row"
                        style={{ height: "230px" }}
                      >
                        <Col
                          xs={4}
                          className="h-100 position-relative product-col"
                        >
                          <Image
                            className="w-100 h-100 product-img"
                            src={pro.thumbnail}
                          ></Image>
                          <div className=" text-light rounded d-flex justify-content-center align-items-center card-label">
                            <div className="card-title">TIN VIP 2</div>
                          </div>
                        </Col>
                        <Col xs={8} className="product-content">
                          <div className=" h-100 py-3 d-flex flex-column justify-content-between ">
                            <div className="fs-6 home-product-title">
                              {`${pro.title}`}
                            </div>
                            <div className="py-1 d-flex home-product-price">
                              <div className="text-danger ">
                                {pro.price && pro.price.length >= 10
                                  ? `${pro.price[0]},${pro.price.slice(
                                      1,
                                      2
                                    )} Tỷ`
                                  : ""}
                              </div>
                              <div className="text-danger  ps-3">
                                {`${pro.acreage} `} m<sup>2</sup>
                              </div>
                            </div>
                            <div className="py-1 d-flex home-product-address">
                              <div className="">
                                <FontAwesomeIcon
                                  icon={faLocationDot}
                                  style={{ color: "#ccc" }}
                                />
                              </div>
                              <div className="ps-3">{`${pro.district}, ${pro.city}`}</div>
                            </div>
                            <div className=" home-product-content-4">
                              {`${pro.content}`}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      <Row
                        onClick={() => handleGetDetail(pro.slug)}
                        key={index}
                        className="my-4 bg-white rounded product-item product-row"
                        style={{ height: "200px" }}
                      >
                        <Col
                          xs={3}
                          className="h-100 position-relative product-col"
                        >
                          <Image
                            className="w-100 h-100 product-img"
                            src={pro.thumbnail}
                          ></Image>
                          <div className=" text-light rounded d-flex justify-content-center align-items-center card-label">
                            <div className="card-title">TIN THƯỜNG</div>
                          </div>
                        </Col>
                        <Col xs={9} className="product-content">
                          <div className=" h-75 py-3 d-flex flex-column justify-content-between ">
                            <div className="fs-6 home-product-title">
                              {`${pro.title}`}
                            </div>
                            <div className="py-1 d-flex home-product-price">
                              <div className="text-danger ">
                                {pro.price && pro.price.length >= 10
                                  ? `${pro.price[0]},${pro.price.slice(
                                      1,
                                      2
                                    )} Tỷ`
                                  : ""}
                              </div>
                              <div className="text-danger  ps-3">
                                {`${pro.acreage} `} m<sup>2</sup>
                              </div>
                            </div>
                            <div className="py-1 d-flex home-product-address">
                              <div className="">
                                <FontAwesomeIcon
                                  icon={faLocationDot}
                                  style={{ color: "#ccc" }}
                                />
                              </div>
                              <div className="ps-3">{`${pro.district}, ${pro.city}`}</div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    )
                  )}
                </div>
              </Col>
              <Col sm={3}></Col>
            </Row>
          </Container>
        ) : (
          <div className="py-3">Không có tin BDS</div>
        )}
      </div>
    </>
  );
}

export default Product;
