import { Table, Modal, Button, Form, Col, Row, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import "./Manage.scss";
import { useNavigate } from "react-router-dom";
function Manage() {
  const notify = () =>
    toast.success("Gia hạn thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notify1 = () =>
    toast.error("Gia hạn thất bại", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const navigate = useNavigate();
  const [listProperty, setListProperty] = useState();
  let stt = 1;
  const [show, setShow] = useState(false);
  const [property, setProperty] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [img, setImg] = useState();
  const handleShow = (property) => {
    setShow(true);
    setProperty(property);
    setTitle(property.real_easte_news.title);
    setContent(property.real_easte_news.content);
    console.log(property.info_real_easte.id);
  };
  const handleClose = () => {
    setShow(false);
    setProperty("");
  };
  const handleRePost = (id, slug) => {
    navigate(`/gia-han/${id}/${slug}`);
  };
  const handlePayment = (id, expiration, type) => {
    navigate(`/thanh-toan/${id}/${expiration}/${type}`);
  };
  const handleChange = (property) => {
    navigate(
      `/sua-tin-dang/${property.info_real_easte.id}/${property.info_real_easte.city}/${property.info_real_easte.ward}/${property.info_real_easte.district}/${property.info_real_easte.address}/${property.info_real_easte.acreage}/${property.info_real_easte.price}/${property.info_real_easte.status}/${property.info_real_easte.interior}/${property.info_real_easte.direction}/${property.info_real_easte.balcony_direction}/${property.info_real_easte.number_bedrooms}/${property.info_real_easte.number_bathrooms}/${property.info_real_easte.number_floors}/${property.info_real_easte.facade}/${property.info_real_easte.road_width}/${property.info_real_easte.length}/${property.info_real_easte.width}/${property.info_real_easte.total_usable_area}`
    );
    // const formDaTa = new FormData();
    // formDaTa.append("content", content);
    // formDaTa.append("title", title);
    // try {
    //   const res = propertyApi.editNew(id, formDaTa);
    //   getAllProperty();
    // } catch (error) {
    //   console.log(error);
    // }
  };
  useEffect(() => {
    getAllProperty();
  }, []);
  const getAllProperty = async () => {
    try {
      let res = await propertyApi.getByUser();
      setListProperty(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  // const formik = useFormik({
  //   initialValues: {
  //     title: property && property.real_easte_news.title,
  //     content: property && property.real_easte_news.content,
  //   },
  //   validationSchema: Yup.object({
  //     title: Yup.string().required("Chưa nhập tiêu đề"),
  //     content: Yup.string().required("Chưa nhập nội dung"),
  //   }),
  //   onSubmit: async (values) => {},
  // });
  return (
    <>
      <Row className="detail-content">
        <Col lg={1}></Col>
        <Col lg={10} className="py-3">
          <div className="category-user-content">
            <div className=" ps-3 py-3  text-light fs-4 text-dark category-title">
              Danh sách tin
            </div>
            <div className="py-2 px-2">
              <Table className="shadow-sm" bordered hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Loại tin</th>
                    <th>Ngày đăng</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {listProperty &&
                    listProperty.map((item, index) => (
                      <tr key={index}>
                        <td>{stt++}</td>
                        <td>
                          {item.real_easte_news.type == 1
                            ? "Loại 1"
                            : item.real_easte_news.type == 2
                            ? "Loại 2"
                            : item.real_easte_news.type == 3
                            ? "Loại 3"
                            : "Loại 4"}
                        </td>
                        <td>
                          {item.real_easte_news.created_date &&
                            `${item.real_easte_news.created_date.slice(
                              8,
                              10
                            )}/${item.real_easte_news.created_date.slice(
                              6,
                              7
                            )}/${item.real_easte_news.created_date.slice(
                              0,
                              4
                            )}`}
                        </td>
                        <td>
                          {item.real_easte_news.status
                            ? item.real_easte_news.status
                            : "Pending"}
                        </td>

                        <td>
                          <div className="d-flex">
                            <div className="category-icon">
                              <FontAwesomeIcon
                                icon={faInfoCircle}
                                style={{ color: "#0d6efd" }}
                                onClick={() => handleShow(item)}
                              ></FontAwesomeIcon>
                            </div>
                            {/* <div className="ps-3 category-icon">
                              <FontAwesomeIcon
                                icon={faCircleXmark}
                                style={{ color: "#dc3545" }}
                                // onClick={() =>
                                //   handleDelete(item.real_easte_news)
                                // }
                              ></FontAwesomeIcon>
                            </div> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            {/* </div> */}
          </div>
        </Col>
        <Col lg={1}></Col>
      </Row>
      {property && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông Tin Cơ Bản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  disabled
                  as="textarea"
                  style={{ height: "80px" }}
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isInvalid={title == "" ? true : false}
                />

                <Form.Control.Feedback type="invalid">
                  Chưa nhập tiêu đề
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nội dung</Form.Label>
                <Form.Control
                  as="textarea"
                  name="content"
                  disabled
                  style={{ height: "200px" }}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  isInvalid={content == "" ? true : false}
                />

                <Form.Control.Feedback type="invalid">
                  Chưa nhập tiêu đề
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ngày đăng</Form.Label>
                <Form.Control
                  disabled
                  type="date"
                  value={
                    property.real_easte_news.created_date &&
                    property.real_easte_news.created_date.slice(0, 10)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Loại tin</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  value={
                    property.real_easte_news.type == 1
                      ? "Tin thường"
                      : property.real_easte_news.type == 2
                      ? "Tin VIP 2"
                      : property.real_easte_news.type == 3
                      ? "Tin VIP 3"
                      : "Tin VIP 4"
                  }
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mức giá</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={VND.format(property.info_real_easte.price)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tình trạng pháp lý</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.status}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tỉnh/Thành phố</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.city}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quận/Huyện</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.district}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phường/Xã</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.ward}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nội thất</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.interior}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Hướng nhà</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.direction}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Hướng ban công</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.balcony_direction}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Số phòng ngủ</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.number_bedrooms}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Số phòng tắm</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.number_bathrooms}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Số tầng</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.number_floors}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Chiều dài m<sup>2</sup>
                    </Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.length}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Chiều rộng m<sup>2</sup>
                    </Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.width}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Tổng diện tích m<sup>2</sup>
                    </Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={property.info_real_easte.acreage}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Hình ảnh</Form.Label>
                <div>
                  <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                      <Image
                        className="w-100"
                        roundedCircle={false}
                        height={200}
                        src={property.real_easte_news.thumbnail}
                      ></Image>
                    </Col>
                    <Col md={2}></Col>
                  </Row>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Thoát
            </Button>
            {property.real_easte_news.status === "" && (
              <>
                <Button
                  variant="primary"
                  onClick={() => handleChange(property)}
                >
                  Sửa
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    handlePayment(
                      property.real_easte_news.id,
                      property.real_easte_news.expiration,
                      property.real_easte_news.type
                    )
                  }
                >
                  Thanh Toán
                </Button>
              </>
            )}
            {property.real_easte_news.status === "Expiration" && (
              <Button
                variant="primary"
                onClick={() =>
                  handleRePost(
                    property.real_easte_news.id,
                    property.real_easte_news.slug
                  )
                }
              >
                Gia hạn
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                value={property.real_easte_news.title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "200px" }}
                value={property.real_easte_news.content}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ngày đăng</Form.Label>
              <Form.Control
                type="date"
                value={property.real_easte_news.approval_date.slice(0, 10)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Loại tin</Form.Label>
              <Form.Control
                type="text"
                value={
                  property.real_easte_news.approval_date.type == 1
                    ? "Loại 1"
                    : property.real_easte_news.approval_date.type == 2
                    ? "Loại 2"
                    : property.real_easte_news.approval_date.type == 3
                    ? "Loại 3"
                    : "Loại 4"
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Sửa
          </Button>
        </Modal.Footer>
      </Modal> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default Manage;
