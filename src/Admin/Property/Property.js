import Sidebar from "../Sidebar/Sidebar";
import { Table, Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
import approvePost from "../../api/approvePostApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Property() {
  const notify = () =>
    toast.success("Ẩn thành công", {
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
    toast.success("Xóa thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const [show, setShow] = useState(false);
  let stt = 1;
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [img, setImg] = useState("");
  const [date, setDate] = useState("");
  const [property, setProperty] = useState();
  const [info, setInfo] = useState("");
  const [listProperty, setListProperty] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (property, propertyInfo) => {
    setShow(true);
    setType(property.type);
    setProperty(property);
    setInfo(propertyInfo);
    setId(property.id);
  };
  const handleUpdate = () => {
    console.log("acb");
  };
  const handleHidden = async (id) => {
    try {
      const res = await propertyApi.hidden(id);
      notify();
      handleClose();
      getAllProperty();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (post) => {
    try {
      const res = await approvePost.delete(post.id);
      notify1();
      getAllProperty();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);
  const getAllProperty = async () => {
    try {
      const res = await propertyApi.getAll();
      setListProperty(res.data);
      // console.log(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      {/* <div className="d-flex">
        <Sidebar /> */}
      <div className="category-content w-75">
        <div className=" ps-3 py-3 bg-primary text-light category-title">
          Danh sách tin BĐS
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
                      {item.real_easte_id.type == 1
                        ? "Loại 1"
                        : item.real_easte_id.type == 2
                        ? "Loại 2"
                        : item.real_easte_id.type == 3
                        ? "Loại 3"
                        : "Loại 4"}
                    </td>
                    <td>{item.real_easte_id.approval_date.slice(0, 10)}</td>
                    <td>{item.real_easte_id.status}</td>

                    <td>
                      <div className="d-flex">
                        <div className="category-icon">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            style={{ color: "#0d6efd" }}
                            onClick={() =>
                              handleShow(
                                item.real_easte_id,
                                item.info_real_easte
                              )
                            }
                          ></FontAwesomeIcon>
                        </div>
                        <div className="ps-3 category-icon">
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            style={{ color: "#dc3545" }}
                            onClick={() => handleDelete(item.real_easte_id)}
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        {/* </div> */}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Người đăng</Form.Label>
              <Form.Control type="text" disabled value={"Nguyễn văn A"} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Người duyệt</Form.Label>
              <Form.Control type="text" disabled value={"Nguyễn văn B"} />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "80px" }}
                value={property && property.title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "200px" }}
                value={property && property.content}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ngày đăng</Form.Label>
              <Form.Control
                type="date"
                disabled
                value={property && property.approval_date.slice(0, 10)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ngày hết hạn</Form.Label>
              <Form.Control type="date" value={"2023-05-30"} />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Loại tin</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={
                  type == 1
                    ? "Loại 1"
                    : type == 2
                    ? "Loại 2"
                    : type == 3
                    ? "Loại 3"
                    : "Loại 4"
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
                    value={VND.format(info.price)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Tình trạng pháp lý</Form.Label>
                  <Form.Control disabled type="text" value={info.status} />
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
                    value={info.number_bedrooms}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Số phòng tắm</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    value={info.number_bathrooms}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Số tầng</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    value={info.number_floors}
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
                  <Form.Control disabled type="text" value={info.length} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Chiều rộng m<sup>2</sup>
                  </Form.Label>
                  <Form.Control disabled type="text" value={info.width} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Tổng diện tích m<sup>2</sup>
                  </Form.Label>
                  <Form.Control disabled type="text" value={info.acreage} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Tỉnh/Thành phố</Form.Label>
                  <Form.Control disabled type="text" value={info.city} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Quận/Huyện</Form.Label>
                  <Form.Control disabled type="text" value={info.district} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phường/Xã</Form.Label>
                  <Form.Control disabled type="text" value={info.ward} />
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
                      // width={200}
                      height={200}
                      src={property && property.thumbnail}
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
          <Button variant="danger" onClick={() => handleHidden(id)}>
            Ẩn
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Sửa
          </Button>
        </Modal.Footer>
      </Modal>
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

export default Property;
