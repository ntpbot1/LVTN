import Sidebar from "../../Sidebar/Sidebar";
import { Table, Modal, Button, Form, Col, Row, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function CensorProperty() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdate = () => {
    console.log("acb");
  };
  const handleDelete = () => {
    console.log("xyz");
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
                <th>Mã tin</th>
                <th>Người đăng</th>
                <th>Ngày thuê</th>
                <th>Loại tin</th>
                <th>Giá thuê</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>abc</td>
                <td>Nguyễn Văn A</td>
                <td>7 ngày</td>
                <td>Loại 1</td>
                <td>70.000 đ</td>

                <td>
                  <div className="d-flex">
                    <div className="category-icon">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        style={{ color: "#0d6efd" }}
                        onClick={handleShow}
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
              <tr>
                <td>xyz</td>
                <td>Nguyễn Văn B</td>
                <td>7 ngày</td>
                <td>Loại 2</td>
                <td>70.000 đ</td>
                <td>
                  <div className="d-flex">
                    <div className="category-icon">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        style={{ color: "#0d6efd" }}
                        onClick={handleShow}
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
            </tbody>
          </Table>
        </div>
      </div>
      {/* </div> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Duyệt tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Người đăng</Form.Label>
              <Form.Control type="text" disabled value={"Nguyễn văn A"} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                disabled
                type="text"
                value={"Nhà bán khu vực Đức Hòa, Long An"}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                disabled
                as="textarea"
                style={{ height: "200px" }}
                value={
                  "Giảm giá 300 triệu. Cần bán. Nhà 1 lầu đúc. I. Ngân hàng hỗ trợ vay 25 năm. 2 mặt tiền trước sau. Đường 5m bê tông. Diện tích 4.5x24m. Nội thất đẹp cao cấp, cửa + bếp gổ tự nhiên. 4 phòng ngủ + 2 toilet + bếp + phòng khách + phòng thờ. 01 phòng trọ. Vào ở thu nhập ngay 2tr/ tháng. Nhà khu trung tâm Tt Đức hòa. Nhựa TL 824 rẻ vào đường nhựa óc eo + nhà nghỉ Duyên quê. Khu trung tâm thành phố Đức hòa trong tương lại 2025. Giá chính chủ: 2 tỉ 1."
                }
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Loại tin</Form.Label>
                  <Form.Control disabled type="text" value={"Loại 1"} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ngày thuê</Form.Label>
                  <Form.Control disabled type="text" value={"7 ngày"} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Diện tích m<sup>2</sup>
                  </Form.Label>
                  <Form.Control disabled type="text" value={"102"} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Mức giá</Form.Label>
                  <Form.Control disabled type="text" value={"2.1 Tỷ"} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Tình trạng pháp lý</Form.Label>
                  <Form.Control disabled type="text" value={"Sổ hồng"} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Số phòng ngủ</Form.Label>
                  <Form.Control disabled type="text" value={"4"} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Số phòng tắm</Form.Label>
                  <Form.Control disabled type="text" value={"2"} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Số tầng</Form.Label>
                  <Form.Control disabled type="text" value={"2"} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Chiều dài m<sup>2</sup>
                  </Form.Label>
                  <Form.Control disabled type="text" value={"10.8"} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Chiều rộng m<sup>2</sup>
                  </Form.Label>
                  <Form.Control disabled type="text" value={"10"} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Tổng diện tích m<sup>2</sup>
                  </Form.Label>
                  <Form.Control disabled type="text" value={"108"} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Tỉnh/Thành phố</Form.Label>
                  <Form.Control disabled type="text" value={"Long An"} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Quận/Huyện</Form.Label>
                  <Form.Control disabled type="text" value={"Đức Hòa"} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phường/Xã</Form.Label>
                  <Form.Control disabled type="text" value={"Xã Đức Hòa Hạ"} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Hình ảnh</Form.Label>
              </Form.Group>
              <Col>
                <Image
                  roundedCircle={false}
                  width={120}
                  height={120}
                  src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                ></Image>
              </Col>
              <Col>
                <Image
                  roundedCircle={false}
                  width={120}
                  height={120}
                  src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                ></Image>
              </Col>
              <Col>
                <Image
                  roundedCircle={false}
                  width={120}
                  height={120}
                  src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                ></Image>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Duyệt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CensorProperty;
