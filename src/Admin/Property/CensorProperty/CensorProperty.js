import Sidebar from "../../Sidebar/Sidebar";
import { Table, Modal, Button, Form, Col, Row, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../../api/propertyApi";
import "./CensorProperty.scss";
import approvePost from "../../../api/approvePostApi";

function CensorProperty() {
  const [show, setShow] = useState(false);
  let stt = 1;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [expiration, setExpiration] = useState();
  const [acreage, setAcreage] = useState();
  const [price, setPrice] = useState();

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [status, setStatus] = useState("");
  const [bedroom, setBedroom] = useState();
  const [bathroom, setBathroom] = useState();
  const [floor, setFloor] = useState();
  const [length, setLength] = useState();
  const [width, setWidth] = useState();
  const [listImg, setListImg] = useState();

  const [listPropertyNew, setListPropertyNew] = useState([]);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async (propertyInfo) => {
    setShow(true);
    setType(propertyInfo.type);
    setContent(propertyInfo.content);
    setTitle(propertyInfo.title);
    setExpiration(propertyInfo.expiration);
    setId(propertyInfo.id);
    try {
      const res = await propertyApi.getDetailNew(propertyInfo.slug);
      setName(res.data.user.fullname);
      setAcreage(res.data.info.acreage);
      setPrice(res.data.info.price);
      setCity(res.data.info.city);
      setDistrict(res.data.info.district);
      setWard(res.data.info.ward);
      setStatus(res.data.info.status);
      setBedroom(res.data.info.number_bedrooms);
      setBathroom(res.data.info.number_bathrooms);
      setFloor(res.data.info.number_floors);
      setLength(res.data.info.length);
      setWidth(res.data.info.width);
      if (res.data.imgarr) {
        setListImg(res.data.imgarr);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = () => {
    console.log("acb");
  };
  const handleDelete = () => {
    console.log("xyz");
  };
  useEffect(() => {
    getAllProperty();
  }, []);
  const getAllProperty = async () => {
    try {
      let res = await propertyApi.getAllNew();
      setListPropertyNew(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleApprove = async () => {
    setShow(false);
    try {
      const res = await approvePost.approve(id);
      getAllProperty();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDisApprove = async () => {
    setShow(false);
    try {
      const res = await approvePost.disApprove(id);
      getAllProperty();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <div className="d-flex">
        <Sidebar /> */}
      <div className="category-content w-75">
        <div className=" ps-3 py-3 bg-primary text-light category-title">
          Danh sách tin BĐS chờ duyệt
        </div>
        <div className="py-2 px-2">
          <Table className="shadow-sm" bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Người đăng</th>
                <th>Ngày thuê</th>
                <th>Loại tin</th>

                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {listPropertyNew &&
                listPropertyNew.map((propertyNew) => (
                  <tr>
                    <td>{stt++}</td>
                    <td>Nguyễn Văn A</td>
                    <td>{propertyNew.expiration}</td>
                    <td>{propertyNew.type}</td>

                    <td>
                      <div className="d-flex">
                        <div className="category-icon">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            style={{ color: "#0d6efd" }}
                            onClick={() => handleShow(propertyNew)}
                          ></FontAwesomeIcon>
                        </div>
                        <div className="ps-3 category-icon">
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            style={{ color: "#dc3545" }}
                            onClick={handleDelete}
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
      {/* </div> */}
      <Modal show={show} onHide={handleClose} className="modal-infoPost">
        <Modal.Header closeButton>
          <Modal.Title>Duyệt tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Người đăng</Form.Label>
              <Form.Control type="text" disabled value={name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control disabled type="text" value={title} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                disabled
                as="textarea"
                style={{ height: "200px" }}
                value={content}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Loại tin</Form.Label>
                  <Form.Control disabled type="text" value={type} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ngày thuê</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    value={`${expiration} ngày`}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Diện tích m<sup>2</sup>
                  </Form.Label>
                  <Form.Control disabled type="text" value={acreage} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Mức giá</Form.Label>
                  <Form.Control disabled type="text" value={price} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Tình trạng pháp lý</Form.Label>
                  <Form.Control disabled type="text" value={status} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Số phòng ngủ</Form.Label>
                  <Form.Control disabled type="text" value={bedroom} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Số phòng tắm</Form.Label>
                  <Form.Control disabled type="text" value={bathroom} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Số tầng</Form.Label>
                  <Form.Control disabled type="text" value={floor} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Chiều dài m<sup>2</sup>
                  </Form.Label>
                  <Form.Control disabled type="text" value={length} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Chiều rộng m<sup>2</sup>
                  </Form.Label>
                  <Form.Control disabled type="text" value={width} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Tổng diện tích m<sup>2</sup>
                  </Form.Label>
                  <Form.Control disabled type="text" value={acreage} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Tỉnh/Thành phố</Form.Label>
                  <Form.Control disabled type="text" value={city} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Quận/Huyện</Form.Label>
                  <Form.Control disabled type="text" value={district} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phường/Xã</Form.Label>
                  <Form.Control disabled type="text" value={ward} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Hình ảnh</Form.Label>
              </Form.Group>
              {listImg &&
                listImg.map((img, index) => (
                  <Col lg={4} sm={4} key={index}>
                    <Image
                      className="w-100"
                      roundedCircle={false}
                      height={120}
                      src={img.images}
                    ></Image>
                  </Col>
                ))}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button variant="danger" onClick={handleDisApprove}>
            Không duyệt
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Duyệt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CensorProperty;
