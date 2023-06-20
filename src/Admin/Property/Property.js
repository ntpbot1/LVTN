import Sidebar from "../Sidebar/Sidebar";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
import approvePost from "../../api/approvePostApi";
function Property() {
  const [show, setShow] = useState(false);
  let stt = 1;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [img, setImg] = useState("");
  const [date, setDate] = useState("");

  const [listProperty, setListProperty] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (propertyInfo) => {
    setShow(true);
    setTitle(propertyInfo.title);
    setContent(propertyInfo.content);
    setDate(propertyInfo.approval_date.slice(0, 10));
    setType(propertyInfo.type);
  };
  const handleUpdate = () => {
    console.log("acb");
  };
  const handleDelete = async (post) => {
    try {
      const res = await approvePost.delete(post.id);
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
                            onClick={() => handleShow(item.real_easte_id)}
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
              <Form.Control type="text" value={title} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "200px" }}
                value={content}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ngày đăng</Form.Label>
              <Form.Control type="date" value={date} />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ngày hết hạn</Form.Label>
              <Form.Control type="date" value={"2023-05-30"} />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Loại tin</Form.Label>
              <Form.Control
                type="text"
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
