import { Table, Modal, Button, Form, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faInfoCircle,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import newsApi from "../../api/newsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useFormik } from "formik";
function News() {
  //notidy
  const notify = () =>
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
  const notify1 = () =>
    toast.success("Sửa thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const [show, setShow] = useState(false);
  let stt = 1;
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [img, setImg] = useState("");
  const [date, setDate] = useState("");
  const [detailNew, setDetailNew] = useState();
  const [listNews, setListNews] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = async (id) => {
    setShow(true);
    try {
      const res = await newsApi.getDetailNew(id);
      setDetailNew(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    // notify1();
    console.log(
      detailNew.title,
      detailNew.content,
      detailNew.description,
      detailNew.author,
      detailNew.thumbnail
    );
    try {
      const formDaTa = new FormData();
      formDaTa.append("thumbnail", detailNew.thumbnail);
      formDaTa.append("content", detailNew.content);
      formDaTa.append("title", detailNew.title);
      formDaTa.append("description", detailNew.description);
      formDaTa.append("author", detailNew.author);

      const res = await newsApi.update(detailNew.id, formDaTa);
      notify1();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await newsApi.delete(id);
      notify();
      getAllNews();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);
  const getAllNews = async () => {
    try {
      const res = await newsApi.getAll();
      setListNews(res.data);
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
          Danh sách tin tức
        </div>
        <div className="py-2 px-2">
          <Table className="shadow-sm" bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày đăng</th>
                <th>Tác giả</th>
                <th>View</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {listNews &&
                listNews.map((n, index) => (
                  <tr key={index}>
                    <td>{stt++}</td>
                    <td>{`${n.created_date.slice(8, 10)}/${n.created_date.slice(
                      6,
                      7
                    )}/${n.created_date.slice(0, 4)}`}</td>
                    <td>{n.author}</td>
                    <td>{n.viewer}</td>

                    <td>
                      <div className="d-flex">
                        <div className="category-icon">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            style={{ color: "#0d6efd" }}
                            onClick={() => handleShow(n.id)}
                          ></FontAwesomeIcon>
                        </div>
                        <div className="ps-3 category-icon">
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            style={{ color: "#dc3545" }}
                            onClick={() => handleDelete(n.id)}
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
                name="title"
                style={{ height: "80px" }}
                value={detailNew && detailNew.title}
                onChange={(e) =>
                  setDetailNew({ ...detailNew, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                style={{ height: "200px" }}
                value={detailNew && detailNew.content}
                onChange={(e) =>
                  setDetailNew({ ...detailNew, content: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                style={{ height: "200px" }}
                value={detailNew && detailNew.description}
                onChange={(e) =>
                  setDetailNew({ ...detailNew, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tác giả</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={detailNew && detailNew.author}
                onChange={(e) =>
                  setDetailNew({ ...detailNew, author: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                name="thumbnail"
                accept="image/*"
                placeholder="Chọn ảnh"
                onChange={(e) =>
                  setDetailNew({ ...detailNew, thumbnail: e.target.files })
                }
              />
            </Form.Group>

            <Image
              roundedCircle={false}
              height={120}
              src={detailNew && detailNew.thumbnail}
            ></Image>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
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

export default News;
