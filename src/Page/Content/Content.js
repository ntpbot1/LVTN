import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Content.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import SearchProduct from "../SearchProduct/SearchProduct";
function Content() {
  const listPosts = [
    {
      id: 1,
      title: "Nhà bán khu vực Đức Hòa, Long An 1",
      price: 2.1,
      acreage: "108",
      address: "Đức Hòa, Long An",
      date: "05/06/2023",
    },
    {
      id: 2,
      title: "Nhà bán khu vực Đức Hòa, Long An 2",
      price: 3.1,
      acreage: "108",
      address: "Đức Hòa, Long An",
      date: "05/06/2023",
    },
    {
      id: 3,
      title: "Nhà bán khu vực Đức Hòa, Long An 3",
      price: 4.1,
      acreage: "108",
      address: "Đức Hòa, Long An",
      date: "05/06/2023",
    },
    {
      id: 4,
      title: "Nhà bán khu vực Đức Hòa, Long An 4",
      price: 5.1,
      acreage: "108",
      address: "Đức Hòa, Long An",
      date: "05/06/2023",
    },
    {
      id: 5,
      title: "Nhà bán khu vực Đức Hòa, Long An 5",
      price: 6.1,
      acreage: "108",
      address: "Đức Hòa, Long An",
      date: "05/06/2023",
    },
  ];
  const postsFilter = listPosts.filter((post) => {
    return post.price == 2.1 || post.price < 3.2;
  });
  return (
    <>
      <SearchProduct />
      <div className="home-content">
        <div className="py-5 px-5 home-container ">
          <div className="fs-3 home-container-title">
            Bất động sản dành cho bạn
          </div>
          <div className="home-product">
            <Row className="pt-5 row">
              {postsFilter.map((post) => (
                <Col
                  md={4}
                  sm={6}
                  xs={12}
                  lg={3}
                  className="pt-4 col-3 bg-transparent px-2"
                >
                  <Link
                    className="text-decoration-none text-dark bg-transparent"
                    to={"/chi-tiet"}
                  >
                    <Card className=" home-product-card">
                      <Card.Img
                        variant="top"
                        src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                      />
                      <Card.Body>
                        <Card.Title className="fs-6 home-product-title">
                          {post.title}
                        </Card.Title>
                        <Card.Text className="d-flex home-product-price">
                          <div className="text-danger ">
                            {post.price}
                            Tỷ
                          </div>
                          <div className="text-danger  ps-3">
                            {post.acreage}m<sup>2</sup>
                          </div>
                        </Card.Text>
                        <Card.Text className="d-flex home-product-address">
                          <div className="">
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              style={{ color: "#ccc" }}
                            />
                          </div>
                          <div className="ps-3">Đức Hòa, Long An</div>
                        </Card.Text>
                        <Card.Text className="home-product-date">
                          {post.date}
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                      </Card.Body>
                    </Card>
                  </Link>
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
