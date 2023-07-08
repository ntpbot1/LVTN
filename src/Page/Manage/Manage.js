import { Table, Modal, Button, Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
import approvePost from "../../api/approvePostApi";
import "./Manage.scss";
function Manage() {
  const [listProperty, setListProperty] = useState();
  let stt = 1;
  const [show, setShow] = useState(false);
  const [property, setProperty] = useState();
  const handleShow = (property) => {
    setShow(true);
    setProperty(property);
  };
  const handleClose = () => {
    setShow(false);
    setProperty("");
  };
  const handleRePost = async (slug) => {
    try {
      const res = propertyApi.rePost(slug);
      handleClose();
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
      let res = await propertyApi.getByUser();
      setListProperty(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };
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
                          {`${item.real_easte_news.approval_date.slice(
                            8,
                            10
                          )}/${item.real_easte_news.approval_date.slice(
                            6,
                            7
                          )}/${item.real_easte_news.approval_date.slice(0, 4)}`}
                        </td>
                        <td>{item.real_easte_news.status}</td>

                        <td>
                          <div className="d-flex">
                            <div className="category-icon">
                              <FontAwesomeIcon
                                icon={faInfoCircle}
                                style={{ color: "#0d6efd" }}
                                onClick={() => handleShow(item)}
                              ></FontAwesomeIcon>
                            </div>
                            <div className="ps-3 category-icon">
                              <FontAwesomeIcon
                                icon={faCircleXmark}
                                style={{ color: "#dc3545" }}
                                // onClick={() =>
                                //   handleDelete(item.real_easte_news)
                                // }
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
        </Col>
        <Col lg={1}></Col>
      </Row>
      {property && (
        <Modal show={show} onHide={handleClose}>
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
            <Button
              variant="primary"
              onClick={() => handleRePost(property.real_easte_news.slug)}
            >
              Gia hạn
            </Button>
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
    </>
  );
}

export default Manage;
