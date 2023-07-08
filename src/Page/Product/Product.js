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
    } else if (sessionStorage.getItem("searchContent")) {
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
              <Col md={9} sm={12}>
                <div className="product-list">
                  {listProperty.map((pro, index) => (
                    <Row
                      onClick={() => handleGetDetail(pro.slug)}
                      key={index}
                      className="my-4 product-item bg-white rounded "
                    >
                      <Col sm={12} md={4}>
                        <Image
                          className="w-100 h-100 product-img"
                          src={pro.thumbnail}
                        ></Image>
                      </Col>
                      <Col sm={12} md={8} className="product-content">
                        <div className=" h-75 py-3">
                          <div className="fs-6 home-product-title">
                            {pro.content}
                          </div>
                          <div className="py-1 d-flex home-product-price">
                            <div className="text-danger ">
                              {pro.price && pro.price.length >= 10
                                ? `${pro.price[0]},${pro.price.slice(1, 2)} Tỷ`
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
                        {/* <div className="py-auto h-25">
                          <div className="home-product-date">
                            Đăng 3 ngày trước
                          </div>
                        </div> */}
                      </Col>
                    </Row>
                  ))}
                </div>
              </Col>
              <Col md={3} sm={12}></Col>
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
