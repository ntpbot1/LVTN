import { Container, Row, Col, Image } from "react-bootstrap";

import "./Product.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
function Product() {
  const navigate = useNavigate();
  const { content, category, province, district, ward, price, acreage } =
    useParams();
  const [listProperty, setListProperty] = useState([]);
  console.log(category);
  useEffect(() => {
    getAllProperty();
  }, []);
  const getAllProperty = async () => {
    // if (sessionStorage.getItem("searchCategory")) {
    // try {
    //   let res = await propertyApi.searchCategory("Nha-rieng");
    //   setListProperty(res.data);
    // } catch (err) {
    //   console.log("err", err);
    // }
    // }
    // if (sessionStorage.getItem("searchContent")) {
    try {
      let res = await propertyApi.search(
        content !== "undefined" ? content : ""
      );
      setListProperty(res.data);
    } catch (err) {
      console.log("err", err);
    }
    // }
    // try {
    //   const res = await propertyApi.getAll();
    //   setListProperty(res.data);
    // } catch (err) {
    //   console.log("err", err);
    // }
  };
  const handleGetDetail = (slug) => {
    navigate(`/chi-tiet/${slug}`);
  };
  if (
    category !== "undefined"
    // province !== "undefined" &&
    // district !== "undefined" &&
    // ward !== "undefined"
  ) {
    console.log(category);
    let listCat = listProperty.filter((e) => {
      return (
        e.Real_Easte.category == category
        // e.Info.address.indexOf(province) &&
        // e.Info.address.indexOf(district) &&
        // e.Info.address.indexOf(ward)
      );
    });
    console.log(listCat);
    return (
      <>
        <div className="py-5 product-container">
          {listCat ? (
            <Container>
              <Row>
                <Col xs={9}>
                  <div className="product-list">
                    {listCat.map((pro, index) =>
                      pro.Real_Easte.type == 4 && pro.Real_Easte.category ? (
                        <Row
                          className="bg-white rounded product-item product-row"
                          onClick={() => handleGetDetail(pro.Real_Easte.slug)}
                          key={index}
                        >
                          <Row
                            // onClick={() => handleGetDetail(pro.Real_Easte.slug)}
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
                                src={pro.Real_Easte.thumbnail}
                              ></Image>
                              <div className=" text-light rounded d-flex justify-content-center align-items-center card-label-4">
                                <div className="card-title">TIN VIP 4</div>
                              </div>
                            </Col>
                            <Col xs={4} className="product-content">
                              {/* <div className="d-flex h-50">
                              <Image
                                className="w-100 h-100 product-img-4"
                                src={pro.Real_Easte.thumbnail}
                              ></Image>
                              </div>
                              <div></div> */}
                            </Col>
                          </Row>
                          <Row className=" h-75 pt-3 d-flex flex-column justify-content-between ">
                            <div className="fs-6 home-product-title">
                              {`${pro.Real_Easte.title}`}
                            </div>
                            <div className="py-2 d-flex home-product-price">
                              <div className="text-danger ">
                                {pro.Info.price && pro.Info.price.length >= 10
                                  ? `${
                                      pro.Info.price[0]
                                    },${pro.Info.price.slice(1, 2)} Tỷ`
                                  : ""}
                              </div>
                              <div className="text-danger  ps-3">
                                {`${pro.Info.acreage} `} m<sup>2</sup>
                              </div>
                            </div>
                            <div className="py-2 d-flex home-product-address">
                              <div className="">
                                <FontAwesomeIcon
                                  icon={faLocationDot}
                                  style={{ color: "#ccc" }}
                                />
                              </div>
                              <div className="ps-2">{`${pro.Info.district}, ${pro.Info.city}`}</div>
                            </div>
                            <div className=" home-product-content-4">
                              {`${pro.Real_Easte.content}`}
                            </div>
                            <div className="home-product-user">
                              <div className="h-100 d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <div className="pe-2">
                                    <Image
                                      roundedCircle={true}
                                      width={40}
                                      height={40}
                                      src={pro.User.avatar}
                                    ></Image>
                                  </div>
                                  <div className="d-flex flex-column">
                                    <div className="user-name">
                                      {pro.User.fullname}
                                    </div>
                                    <div className="user-date">
                                      {pro &&
                                        pro.Real_Easte.approval_date &&
                                        `${pro.Real_Easte.approval_date.slice(
                                          8,
                                          10
                                        )}/${pro.Real_Easte.approval_date.slice(
                                          5,
                                          7
                                        )}/${pro.Real_Easte.approval_date.slice(
                                          0,
                                          4
                                        )}`}
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center ">
                                  <div className="rounded py-2 px-3 text-light fs-6 d-flex align-items-center user-info">
                                    <FontAwesomeIcon
                                      icon={faPhone}
                                      className="pe-2"
                                    />
                                    <div className="user-phone">
                                      {pro.User.phone}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Row>
                        </Row>
                      ) : pro.Real_Easte.type == 3 ? (
                        <Row
                          onClick={() => handleGetDetail(pro.Real_Easte.slug)}
                          key={index}
                          className="my-4 bg-white rounded product-item product-row"
                          style={{ height: "300px" }}
                        >
                          <Col
                            xs={5}
                            className="h-100 position-relative product-col"
                          >
                            <Image
                              className="w-100 h-100 product-img"
                              src={pro.Real_Easte.thumbnail}
                            ></Image>
                            <div className=" text-light rounded d-flex justify-content-center align-items-center card-label-3">
                              <div className="card-title">TIN VIP 3</div>
                            </div>
                          </Col>
                          <Col xs={7} className="product-content">
                            <div className=" h-100 pt-3 d-flex flex-column justify-content-around">
                              <div className="fs-6 home-product-title">
                                {`${pro.Real_Easte.title}`}
                              </div>
                              <div className="py-2 d-flex home-product-price">
                                <div className="text-danger ">
                                  {pro.Info.price && pro.Info.price.length >= 10
                                    ? `${
                                        pro.Info.price[0]
                                      },${pro.Info.price.slice(1, 2)} Tỷ`
                                    : ""}
                                </div>
                                <div className="text-danger  ps-3">
                                  {`${pro.Info.acreage} `} m<sup>2</sup>
                                </div>
                              </div>
                              <div className="py-2 d-flex home-product-address">
                                <div className="">
                                  <FontAwesomeIcon
                                    icon={faLocationDot}
                                    style={{ color: "#ccc" }}
                                  />
                                </div>
                                <div className="ps-3">{`${pro.Info.district}, ${pro.Info.city}`}</div>
                              </div>
                              <div className=" home-product-content-4">
                                {`${pro.Real_Easte.content}`}
                              </div>
                              <div className="home-product-user">
                                <div className="h-100 d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <div className="pe-2">
                                      <Image
                                        roundedCircle={true}
                                        width={40}
                                        height={40}
                                        src={pro.User.avatar}
                                      ></Image>
                                    </div>
                                    <div className="d-flex flex-column">
                                      <div className="user-name">
                                        {pro.User.fullname}
                                      </div>
                                      <div className="user-date">
                                        {pro &&
                                          pro.Real_Easte.approval_date &&
                                          `${pro.Real_Easte.approval_date.slice(
                                            8,
                                            10
                                          )}/${pro.Real_Easte.approval_date.slice(
                                            5,
                                            7
                                          )}/${pro.Real_Easte.approval_date.slice(
                                            0,
                                            4
                                          )}`}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center ">
                                    <div className="rounded py-2 px-3 text-light fs-6 d-flex align-items-center user-info">
                                      <FontAwesomeIcon
                                        icon={faPhone}
                                        className="pe-2"
                                      />
                                      <div className="user-phone">
                                        {pro.User.phone}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ) : pro.Real_Easte.type == 2 ? (
                        <Row
                          onClick={() => handleGetDetail(pro.Real_Easte.slug)}
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
                              src={pro.Real_Easte.thumbnail}
                            ></Image>
                            <div className=" text-light rounded d-flex justify-content-center align-items-center card-label-2">
                              <div className="card-title">TIN VIP 2</div>
                            </div>
                          </Col>
                          <Col xs={8} className="product-content">
                            <div className=" h-100 py-3 d-flex flex-column justify-content-between ">
                              <div className="fs-6 home-product-title">
                                {`${pro.Real_Easte.title}`}
                              </div>
                              <div className="py-1 d-flex home-product-price">
                                <div className="text-danger ">
                                  {pro.Info.price && pro.Info.price.length >= 10
                                    ? `${
                                        pro.Info.price[0]
                                      },${pro.Info.price.slice(1, 2)} Tỷ`
                                    : ""}
                                </div>
                                <div className="text-danger  ps-3">
                                  {`${pro.Info.acreage} `} m<sup>2</sup>
                                </div>
                              </div>
                              <div className="py-1 d-flex home-product-address">
                                <div className="">
                                  <FontAwesomeIcon
                                    icon={faLocationDot}
                                    style={{ color: "#ccc" }}
                                  />
                                </div>
                                <div className="ps-3">{`${pro.Info.district}, ${pro.Info.city}`}</div>
                              </div>
                              <div className=" home-product-content-4">
                                {`${pro.Real_Easte.content}`}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ) : (
                        <Row
                          onClick={() => handleGetDetail(pro.Real_Easte.slug)}
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
                              src={pro.Real_Easte.thumbnail}
                            ></Image>
                          </Col>
                          <Col xs={9} className="product-content">
                            <div className=" h-75 py-3 d-flex flex-column justify-content-between ">
                              <div className="fs-6 home-product-title">
                                {`${pro.Real_Easte.title}`}
                              </div>
                              <div className="py-1 d-flex home-product-price">
                                <div className="text-danger ">
                                  {pro.Info.price && pro.Info.price.length >= 10
                                    ? `${
                                        pro.Info.price[0]
                                      },${pro.Info.price.slice(1, 2)} Tỷ`
                                    : ""}
                                </div>
                                <div className="text-danger  ps-3">
                                  {`${pro.Info.acreage} `} m<sup>2</sup>
                                </div>
                              </div>
                              <div className="py-1 d-flex home-product-address">
                                <div className="">
                                  <FontAwesomeIcon
                                    icon={faLocationDot}
                                    style={{ color: "#ccc" }}
                                  />
                                </div>
                                <div className="ps-3">{`${pro.Info.district}, ${pro.Info.city}`}</div>
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
  } else {
    return (
      <>
        <div className="py-5 product-container">
          {listProperty ? (
            <Container>
              <Row>
                <Col xs={9}>
                  <div className="product-list">
                    {listProperty.map((pro, index) =>
                      pro.Real_Easte.type == 4 && pro.Real_Easte.category ? (
                        <Row
                          className="bg-white rounded product-item product-row"
                          onClick={() => handleGetDetail(pro.Real_Easte.slug)}
                          key={index}
                        >
                          <Row
                            // onClick={() => handleGetDetail(pro.Real_Easte.slug)}
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
                                src={pro.Real_Easte.thumbnail}
                              ></Image>
                              <div className=" text-light rounded d-flex justify-content-center align-items-center card-label-4">
                                <div className="card-title">TIN VIP 4</div>
                              </div>
                            </Col>
                            <Col xs={4} className="product-content">
                              {/* <div className="d-flex h-50">
                              <Image
                                className="w-100 h-100 product-img-4"
                                src={pro.Real_Easte.thumbnail}
                              ></Image>
                              </div>
                              <div></div> */}
                            </Col>
                          </Row>
                          <Row className=" h-75 pt-3 d-flex flex-column justify-content-between ">
                            <div className="fs-6 home-product-title">
                              {`${pro.Real_Easte.title}`}
                            </div>
                            <div className="py-2 d-flex home-product-price">
                              <div className="text-danger ">
                                {pro.Info.price && pro.Info.price.length >= 10
                                  ? `${
                                      pro.Info.price[0]
                                    },${pro.Info.price.slice(1, 2)} Tỷ`
                                  : ""}
                              </div>
                              <div className="text-danger  ps-3">
                                {`${pro.Info.acreage} `} m<sup>2</sup>
                              </div>
                            </div>
                            <div className="py-2 d-flex home-product-address">
                              <div className="">
                                <FontAwesomeIcon
                                  icon={faLocationDot}
                                  style={{ color: "#ccc" }}
                                />
                              </div>
                              <div className="ps-2">{`${pro.Info.district}, ${pro.Info.city}`}</div>
                            </div>
                            <div className=" home-product-content-4">
                              {`${pro.Real_Easte.content}`}
                            </div>
                            <div className="home-product-user">
                              <div className="h-100 d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <div className="pe-2">
                                    <Image
                                      roundedCircle={true}
                                      width={40}
                                      height={40}
                                      src={pro.User.avatar}
                                    ></Image>
                                  </div>
                                  <div className="d-flex flex-column">
                                    <div className="user-name">
                                      {pro.User.fullname}
                                    </div>
                                    <div className="user-date">
                                      {pro &&
                                        pro.Real_Easte.approval_date &&
                                        `${pro.Real_Easte.approval_date.slice(
                                          8,
                                          10
                                        )}/${pro.Real_Easte.approval_date.slice(
                                          5,
                                          7
                                        )}/${pro.Real_Easte.approval_date.slice(
                                          0,
                                          4
                                        )}`}
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center ">
                                  <div className="rounded py-2 px-3 text-light fs-6 d-flex align-items-center user-info">
                                    <FontAwesomeIcon
                                      icon={faPhone}
                                      className="pe-2"
                                    />
                                    <div className="user-phone">
                                      {pro.User.phone}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Row>
                        </Row>
                      ) : pro.Real_Easte.type == 3 ? (
                        <Row
                          onClick={() => handleGetDetail(pro.Real_Easte.slug)}
                          key={index}
                          className="my-4 bg-white rounded product-item product-row"
                          style={{ height: "300px" }}
                        >
                          <Col
                            xs={5}
                            className="h-100 position-relative product-col"
                          >
                            <Image
                              className="w-100 h-100 product-img"
                              src={pro.Real_Easte.thumbnail}
                            ></Image>
                            <div className=" text-light rounded d-flex justify-content-center align-items-center card-label-3">
                              <div className="card-title">TIN VIP 3</div>
                            </div>
                          </Col>
                          <Col xs={7} className="product-content">
                            <div className=" h-100 pt-3 d-flex flex-column justify-content-around">
                              <div className="fs-6 home-product-title">
                                {`${pro.Real_Easte.title}`}
                              </div>
                              <div className="py-2 d-flex home-product-price">
                                <div className="text-danger ">
                                  {pro.Info.price && pro.Info.price.length >= 10
                                    ? `${
                                        pro.Info.price[0]
                                      },${pro.Info.price.slice(1, 2)} Tỷ`
                                    : ""}
                                </div>
                                <div className="text-danger  ps-3">
                                  {`${pro.Info.acreage} `} m<sup>2</sup>
                                </div>
                              </div>
                              <div className="py-2 d-flex home-product-address">
                                <div className="">
                                  <FontAwesomeIcon
                                    icon={faLocationDot}
                                    style={{ color: "#ccc" }}
                                  />
                                </div>
                                <div className="ps-3">{`${pro.Info.district}, ${pro.Info.city}`}</div>
                              </div>
                              <div className=" home-product-content-4">
                                {`${pro.Real_Easte.content}`}
                              </div>
                              <div className="home-product-user">
                                <div className="h-100 d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <div className="pe-2">
                                      <Image
                                        roundedCircle={true}
                                        width={40}
                                        height={40}
                                        src={pro.User.avatar}
                                      ></Image>
                                    </div>
                                    <div className="d-flex flex-column">
                                      <div className="user-name">
                                        {pro.User.fullname}
                                      </div>
                                      <div className="user-date">
                                        {pro &&
                                          pro.Real_Easte.approval_date &&
                                          `${pro.Real_Easte.approval_date.slice(
                                            8,
                                            10
                                          )}/${pro.Real_Easte.approval_date.slice(
                                            5,
                                            7
                                          )}/${pro.Real_Easte.approval_date.slice(
                                            0,
                                            4
                                          )}`}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center ">
                                    <div className="rounded py-2 px-3 text-light fs-6 d-flex align-items-center user-info">
                                      <FontAwesomeIcon
                                        icon={faPhone}
                                        className="pe-2"
                                      />
                                      <div className="user-phone">
                                        {pro.User.phone}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ) : pro.Real_Easte.type == 2 ? (
                        <Row
                          onClick={() => handleGetDetail(pro.Real_Easte.slug)}
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
                              src={pro.Real_Easte.thumbnail}
                            ></Image>
                            <div className=" text-light rounded d-flex justify-content-center align-items-center card-label-2">
                              <div className="card-title">TIN VIP 2</div>
                            </div>
                          </Col>
                          <Col xs={8} className="product-content">
                            <div className=" h-100 py-3 d-flex flex-column justify-content-between ">
                              <div className="fs-6 home-product-title">
                                {`${pro.Real_Easte.title}`}
                              </div>
                              <div className="py-1 d-flex home-product-price">
                                <div className="text-danger ">
                                  {pro.Info.price && pro.Info.price.length >= 10
                                    ? `${
                                        pro.Info.price[0]
                                      },${pro.Info.price.slice(1, 2)} Tỷ`
                                    : ""}
                                </div>
                                <div className="text-danger  ps-3">
                                  {`${pro.Info.acreage} `} m<sup>2</sup>
                                </div>
                              </div>
                              <div className="py-1 d-flex home-product-address">
                                <div className="">
                                  <FontAwesomeIcon
                                    icon={faLocationDot}
                                    style={{ color: "#ccc" }}
                                  />
                                </div>
                                <div className="ps-3">{`${pro.Info.district}, ${pro.Info.city}`}</div>
                              </div>
                              <div className=" home-product-content-4">
                                {`${pro.Real_Easte.content}`}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ) : (
                        <Row
                          onClick={() => handleGetDetail(pro.Real_Easte.slug)}
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
                              src={pro.Real_Easte.thumbnail}
                            ></Image>
                          </Col>
                          <Col xs={9} className="product-content">
                            <div className=" h-75 py-3 d-flex flex-column justify-content-between ">
                              <div className="fs-6 home-product-title">
                                {`${pro.Real_Easte.title}`}
                              </div>
                              <div className="py-1 d-flex home-product-price">
                                <div className="text-danger ">
                                  {pro.Info.price && pro.Info.price.length >= 10
                                    ? `${
                                        pro.Info.price[0]
                                      },${pro.Info.price.slice(1, 2)} Tỷ`
                                    : ""}
                                </div>
                                <div className="text-danger  ps-3">
                                  {`${pro.Info.acreage} `} m<sup>2</sup>
                                </div>
                              </div>
                              <div className="py-1 d-flex home-product-address">
                                <div className="">
                                  <FontAwesomeIcon
                                    icon={faLocationDot}
                                    style={{ color: "#ccc" }}
                                  />
                                </div>
                                <div className="ps-3">{`${pro.Info.district}, ${pro.Info.city}`}</div>
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
}

export default Product;
