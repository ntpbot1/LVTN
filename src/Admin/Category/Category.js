import "./Category.scss";
import Sidebar from "../Sidebar/Sidebar";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function Category() {
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
          Danh sách danh mục
        </div>
        <div className="py-2 px-2">
          <Table className="shadow-sm" bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã danh mục</th>
                <th>Tên danh mục</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>abc</td>
                <td>Nhà đất bán</td>
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
                <td>2</td>
                <td>xyz</td>
                <td>Nhà đất cho thuê</td>
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
          <Modal.Title>Sửa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control type="text" />
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

export default Category;
