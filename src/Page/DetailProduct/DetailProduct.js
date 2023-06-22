import Carousel from "react-bootstrap/Carousel";
import "./DetailProduct.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Map from "./map";
import { Button, Col, Row, Image } from "react-bootstrap";
import propertyApi from "../../api/propertyApi";
import { useState, useEffect } from "react";
import Comments from "../Comments/Comments";
import commentApi from "../../api/commentApi";
import Toast from "../../components/Toast/Toast";

function DetailProduct() {
  const [property, setProperty] = useState();
  const [listImg, setListImg] = useState();
  const [news, setNews] = useState();
  const [listComment, setListComment] = useState();
  useEffect(() => {
    getDetailProperty();
  }, []);
  const getDetailProperty = async () => {
    try {
      const res = await propertyApi.getDetailNew(
        sessionStorage.getItem("slug-real-easte")
      );

      setProperty(res.data);
      setListImg(res.data.imgarr);
      setNews(res.data.news);
      try {
        const res1 = await commentApi.getListComment(res.data.info.id);
        console.log(res1);
        setListComment(res1.data);
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleComment = async (id, payload) => {
    try {
      const res = await commentApi.create(id, payload);
      if (res.data.message) {
        <Toast message={res.data.message} />;
      }
      const res1 = await commentApi.getListComment(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReply = async (idNew, idComment, payload) => {
    try {
      const res = await commentApi.reply(idNew, idComment, payload);
      const res1 = await commentApi.getListComment(idNew);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="detail-content">
        <div className="container py-5 detail-container">
          <Row className="">
            <Col lg={9} sm={12}>
              <Carousel slide={true} interval={null}>
                {listImg &&
                  listImg.map((img, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        className="w-100 "
                        roundedCircle={false}
                        height={400}
                        src={img.images}
                      ></Image>
                    </Carousel.Item>
                  ))}
              </Carousel>
              <div className="pt-4 fs-4 detail-title">{news && news.title}</div>
              <div className="py-3 fs-7 detail-address">
                {property && property.info.address}
              </div>
              <div className="py-3 d-flex detail-info">
                <div className="d-flex flex-column">
                  <div className="detail-info-title">Mức giá</div>
                  <div className="detail-info-value">
                    {property && property.info.price.length >= 10
                      ? `${property.info.price[0]},${property.info.price.slice(
                          1,
                          2
                        )} Tỷ`
                      : ""}
                  </div>
                </div>
                <div className="ps-5 d-flex flex-column">
                  <div className="detail-info-title">Diện tích</div>
                  <div className="detail-info-value">
                    {property && `${property.info.acreage} `}m<sup>2</sup>
                  </div>
                </div>
                <div className="ps-5 d-flex flex-column">
                  <div className="detail-info-title">Phòng ngủ</div>
                  <div className="detail-info-value">
                    {property && property.info.number_bedrooms}
                  </div>
                </div>
              </div>
              <div className="py-3 detail-descriptions">
                <div className="py-3 detail-descriptions-title">
                  Thông tin mô tả
                </div>
                <div className="detail-descriptions-value">
                  {news && news.content}
                </div>
              </div>
              <div className="py-3 detail-characterize">
                <div className="py-3 detail-characterize-title">
                  Đặc điểm bất động sản
                </div>
                <div className="row py-3 detail-characterize-value">
                  <Row>
                    <Col lg={6} sm={12}>
                      <ListGroup
                        className="col-6 detail-characterize-list w-100"
                        variant="flush"
                      >
                        <ListGroup.Item className="border-top detail-characterize-item ">
                          <div className="row">
                            <div className="col-6 detail-characterize-item-title">
                              Diện tích
                            </div>
                            <div className="col-6 detail-characterize-item-value">
                              {property && `${property.info.acreage} `} m
                              <sup>2</sup>
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className=" detail-characterize-item ">
                          <div className="row">
                            <div className="col-6 detail-characterize-item-title">
                              Mặt tiền
                            </div>
                            <div className="col-6 detail-characterize-item-value">
                              {property && `${property.info.facade} `} m
                              <sup>2</sup>
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className=" detail-characterize-item ">
                          <div className="row">
                            <div className="col-6 detail-characterize-item-title">
                              Hướng nhà
                            </div>
                            <div className="col-6 detail-characterize-item-value">
                              {property && property.info.direction}
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className=" detail-characterize-item ">
                          <div className="row">
                            <div className="col-6 detail-characterize-item-title">
                              Số tầng
                            </div>
                            <div className="col-6 detail-characterize-item-value">
                              {property &&
                                `${property.info.number_floors} tầng`}
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-bottom detail-characterize-item ">
                          <div className="row">
                            <div className="col-6 detail-characterize-item-title">
                              Số toilet
                            </div>
                            <div className="col-6 detail-characterize-item-value">
                              {property &&
                                `${property.info.number_bathrooms} phòng`}
                            </div>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col lg={6} sm={12}>
                      <ListGroup
                        className="col-6 detail-characterize-list w-100"
                        variant="flush"
                      >
                        <ListGroup.Item className="border-top detail-characterize-item ">
                          <div className="row">
                            <div className="col-6 detail-characterize-item-title">
                              Mức giá
                            </div>
                            <div className="col-6 detail-characterize-item-value">
                              {property && property.info.price.length >= 10
                                ? `${
                                    property.info.price[0]
                                  },${property.info.price.slice(1, 2)} Tỷ`
                                : ""}
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className=" detail-characterize-item ">
                          <div className="row">
                            <div className="col-6 detail-characterize-item-title">
                              Đường vào
                            </div>
                            <div className="col-6 detail-characterize-item-value">
                              {property && `${property.info.road_width} m`}
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className=" detail-characterize-item ">
                          <div className="row">
                            <div className="col-6 detail-characterize-item-title">
                              Hướng ban công
                            </div>
                            <div className="col-6 detail-characterize-item-value">
                              {property && property.info.balcony_direction}
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className=" detail-characterize-item ">
                          <div className="row">
                            <div className="col-6 detail-characterize-item-title">
                              Số phòng ngủ
                            </div>
                            <div className="col-6 detail-characterize-item-value">
                              {property &&
                                `${property.info.number_bedrooms} phòng`}
                            </div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-bottom detail-characterize-item ">
                          <div className="row">
                            <div className="col-6 detail-characterize-item-title">
                              Pháp lý
                            </div>
                            <div className="col-6 detail-characterize-item-value">
                              {property && property.info.status}
                            </div>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="py-3 detail-descriptions">
                <div className="py-3 detail-descriptions-title">
                  Xem trên bản đồ
                </div>
                <div className="container detail-container">
                  <div
                    className="map w-100 rounded"
                    style={{
                      height: "400px",
                    }}
                  >
                    {property && (
                      <Map
                        x={property.info.location.x}
                        y={property.info.location.y}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="py-3 d-flex detail-info">
                <Row className="w-50">
                  <Col lg={4} sm={12}>
                    <div className="py-1 d-flex flex-column">
                      <div className="detail-info-title">Ngày đăng</div>
                      <div className="detail-info-value">
                        {news && news.approval_date.slice(0, 10)}
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} sm={12}>
                    <div className="py-1 d-flex flex-column">
                      <div className="detail-info-title">Ngày hết hạn</div>
                      <div className="detail-info-value">26/05/2023</div>
                    </div>
                  </Col>
                  <Col lg={4} sm={12}>
                    <div className="py-1 d-flex flex-column">
                      <div className="detail-info-title">Loại tin</div>
                      <div className="detail-info-value">
                        {news &&
                          (news.type == 1
                            ? "Loại 1"
                            : news.type == 2
                            ? "Loại 2"
                            : news.type == 3
                            ? "Loại 3"
                            : "Loại 4")}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="py-3 detail-descriptions">
                <div className="py-3 detail-descriptions-title">Bình luận</div>
                <div className="container detail-comment">
                  {property && (
                    <Comments
                      listComment={listComment}
                      avatar={property.user.avatar}
                      handleComment={handleComment}
                      handleReply={handleReply}
                    />
                  )}
                </div>
              </div>
            </Col>
            <Col lg={3} sm={12}>
              <div className="border rounded ">
                <div className="pt-4 pb-3 px-4 w-100 d-flex flex-column justify-content-center align-items-center personal-info">
                  <Image
                    roundedCircle={true}
                    width={64}
                    height={64}
                    src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                  ></Image>
                  <div className="py-1 personal-info-title">Được đăng bởi</div>
                  <div className="py-1 personal-info-name">
                    {property && property.user.fullname}
                  </div>
                  <Button
                    className="border w-100 mt-2"
                    variant="light"
                    size="lg"
                  >
                    Gửi email
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
