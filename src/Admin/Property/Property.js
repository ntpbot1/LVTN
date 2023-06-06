import Sidebar from "../Sidebar/Sidebar";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";

function Property() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdate = () => {
    console.log("acb");
  };
  const handleDelete = () => {
    console.log("xyz");
  };
  // useEffect(() => {
  //   getAllProperty();
  // }, []);
  // const getAllProperty = async () => {
  //   try {
  //     let res = await propertyApi.getAll();
  //     console.log(res);
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };
  useEffect(() => {
    const getAllProperty = async () => {
      try {
        const res = await propertyApi.getAll();
        console.log(res);
      } catch (err) {
        console.log("err", err);
      }
    };
    getAllProperty();
  }, []);

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
                <th>Mã tin</th>
                <th>Loại tin</th>
                <th>Ngày đăng</th>
                <th>Ngày hết hạn</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>abc</td>
                <td>Loại 1</td>
                <td>30/4/2023</td>
                <td>30/5/2023</td>

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
                <td>Loại 2</td>
                <td>30/4/2023</td>
                <td>30/5/2023</td>
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
        {/* </div> */}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Người đăng</Form.Label>
              <Form.Control type="text" disabled value={"Nguyễn văn A"} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Người duyệt</Form.Label>
              <Form.Control type="text" disabled value={"Nguyễn văn B"} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                value={"Nhà bán khu vực Đức Hòa, Long An"}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "200px" }}
                value={
                  "Giảm giá 300 triệu. Cần bán. Nhà 1 lầu đúc. I. Ngân hàng hỗ trợ vay 25 năm. 2 mặt tiền trước sau. Đường 5m bê tông. Diện tích 4.5x24m. Nội thất đẹp cao cấp, cửa + bếp gổ tự nhiên. 4 phòng ngủ + 2 toilet + bếp + phòng khách + phòng thờ. 01 phòng trọ. Vào ở thu nhập ngay 2tr/ tháng. Nhà khu trung tâm Tt Đức hòa. Nhựa TL 824 rẻ vào đường nhựa óc eo + nhà nghỉ Duyên quê. Khu trung tâm thành phố Đức hòa trong tương lại 2025. Giá chính chủ: 2 tỉ 1."
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ngày đăng</Form.Label>
              <Form.Control type="date" value={"2023-04-30"} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ngày hết hạn</Form.Label>
              <Form.Control type="date" value={"2023-05-30"} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Loại tin</Form.Label>
              <Form.Control type="text" value={"Loại 1"} />
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
      </Modal>
    </>
  );
}

export default Property;
