import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Content.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import SearchProduct from "../SearchProduct/SearchProduct";
import News from "../News/News";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
import { isLogin } from "../SignIn/SignInSlice";

import { useDispatch } from "react-redux";
function Content() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, name, img, token1, token2 } = useParams();
  // const { img } = useParams();

  const [listProperty, setListProperty] = useState([]);

  if (id && name && img && token1 && token2) {
    const img1 = img.replaceAll("!", "/");
    const img2 = img1.replaceAll("|", "?");
    dispatch(
      isLogin({
        id: id,
        name: name,
        img: img2,
      })
    );
    console.log(img.replaceAll("!", "/"));

    sessionStorage.setItem("token", token2);
  }
  // if (img) {

  //   console.log(img2);
  //   dispatch(
  //     isLogin({
  //       img: img2,
  //     })
  //   );
  // }
  useEffect(() => {
    getAllProperty();
  }, []);
  const getAllProperty = async () => {
    try {
      const res = await propertyApi.getAll();
      setListProperty(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  // const handleOnMouseOver = (title) => {
  //   console.log(title);
  // };
  // const handleOnMouseOut = (title) => {
  //   console.log("out");
  // };
  const handleClick = (slug) => {
    navigate(`/chi-tiet/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SearchProduct />
      <News />
      <div className="home-content">
        <div className="py-5 px-5 home-container ">
          <div className="fs-3 home-container-title">
            Bất động sản dành cho bạn
          </div>
          <div className="home-product">
            <Row className="pt-5 row">
              {listProperty.map((post, index) => (
                <Col
                  key={index}
                  md={4}
                  sm={6}
                  xs={12}
                  lg={3}
                  className="pt-4 col-3 bg-transparent px-2"
                >
                  {/* <Link
                    className="text-decoration-none text-dark bg-transparent"
                    to={chi-tiet}
                  > */}
                  <Card
                    onClick={() => handleClick(post.real_easte_id.slug)}
                    className=" home-product-card"
                    style={{ minHeight: "400px" }}
                  >
                    <Card.Img
                      variant="top"
                      height={200}
                      src={post.real_easte_id.thumbnail}
                    />
                    <Card.Body>
                      <Card.Title
                        className="fs-6 home-product-title"
                        style={{ height: "40px" }}
                      >
                        {post.real_easte_id.title}
                      </Card.Title>
                      <Card.Text className="d-flex home-product-price">
                        <>
                          <div className="text-danger ">
                            {post.info_real_easte.price.length > 10
                              ? `${post.info_real_easte.price.slice(
                                  0,
                                  2
                                )},${post.info_real_easte.price.slice(2, 3)} tỷ`
                              : post.info_real_easte.price.length == 10
                              ? `${
                                  post.info_real_easte.price[0]
                                },${post.info_real_easte.price.slice(1, 2)} tỷ`
                              : post.info_real_easte.price.length == 8
                              ? `${post.info_real_easte.price.slice(
                                  0,
                                  2
                                )},${post.info_real_easte.price.slice(
                                  2,
                                  3
                                )} triệu/tháng`
                              : post.info_real_easte.price.length == 7
                              ? `${
                                  post.info_real_easte.price[0]
                                },${post.info_real_easte.price.slice(
                                  1,
                                  2
                                )} triệu/tháng`
                              : post.info_real_easte.price}
                          </div>
                          <div className="text-danger  ps-3">
                            {`${post.info_real_easte.acreage} `}m<sup>2</sup>
                          </div>
                        </>
                        <>
                          {/* <div className="text-primary">
                            {post.info_real_easte.price.length > 10
                              ? `${post.info_real_easte.price.slice(
                                  0,
                                  2
                                )},${post.info_real_easte.price.slice(2, 3)} Tỷ`
                              : post.info_real_easte.price.length == 10
                              ? `${
                                  post.info_real_easte.price[0]
                                },${post.info_real_easte.price.slice(1, 2)} Tỷ`
                              : ""}
                          </div> */}
                          {/* <div className="text-primary ps-3">
                            {`${post.info_real_easte.acreage} `}m<sup>2</sup>
                          </div> */}
                        </>
                      </Card.Text>
                      <Card.Text className="d-flex home-product-address">
                        <div className="">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            style={{ color: "#ccc" }}
                          />
                        </div>
                        <div className="ps-3">
                          {`${post.info_real_easte.district}, ${post.info_real_easte.city}`}
                        </div>
                      </Card.Text>
                      <Card.Text className="home-product-date">
                        {post.real_easte_id.date}
                      </Card.Text>
                      {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                  </Card>
                  {/* </Link> */}
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
