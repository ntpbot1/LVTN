import Sidebar from "../Sidebar/Sidebar";
import { Table, Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
import approvePost from "../../api/approvePostApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import commentApi from "../../api/commentApi";
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
  const notify2 = () =>
    toast.error("Ẩn thất bại", {
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
  const [listComment, setListComment] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setShow(true);
    // setType(property.type);
    // setProperty(property);
    // setInfo(propertyInfo);
    // setId(property.id);
    // try {
    //   const res = commentApi.getListComment();
    //   console.log(res.data);
    // } catch (error) {
    //   console.log(error);
    // }
    setContent(item.Comment.content);
    setId(item.Comment.id);
  };
  const handleUpdate = () => {
    console.log("acb");
  };
  const handleHidden = async (id) => {
    try {
      const res = await commentApi.hidden(id);
      notify();
      handleClose();
      getAllProperty();
    } catch (error) {
      console.log(error);
      notify2();
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
      const res = await commentApi.getAll();
      setListComment(res.data);
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
          Danh sách bình luận
        </div>
        <div className="py-2 px-2">
          <Table className="shadow-sm" bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày đăng</th>
                <th>Người đăng</th>
                <th>Lượt thích</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {listComment &&
                listComment.map((item, index) => (
                  <tr key={index}>
                    <td>{stt++}</td>
                    {/* <td>
                      {item.real_easte_id.type == 1
                        ? "Loại 1"
                        : item.real_easte_id.type == 2
                        ? "Loại 2"
                        : item.real_easte_id.type == 3
                        ? "Loại 3"
                        : "Loại 4"}
                    </td> */}
                    <td>
                      {`${item.Comment.created_date.slice(
                        8,
                        10
                      )}-${item.Comment.created_date.slice(
                        5,
                        7
                      )}-${item.Comment.created_date.slice(0, 4)}`}
                    </td>
                    <td>{item.User.fullname}</td>
                    <td>{item.Comment.like}</td>
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
                            onClick={() => handleDelete(item.real_easte_id)}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                disabled
                style={{ height: "80px" }}
                value={content && content}
              />
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
