import { Table, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faInfoCircle,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import newsApi from "../../api/newsApi";
function News() {
  const [show, setShow] = useState(false);
  let stt = 1;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [img, setImg] = useState("");
  const [date, setDate] = useState("");

  const [listNews, setListNews] = useState([]);
  const handleClose = () => setShow(false);
  //   const handleShow = async (newInfo) => {
  //     setShow(true);
  //     setId(propertyInfo.id);
  //     try {
  //       const res = await newsApi.getDetailNew(propertyInfo.slug);
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const handleUpdate = () => {
    console.log("acb");
  };
  //   const handleDelete = async (post) => {
  //     try {
  //       const res = await approvePost.delete(post.id);
  //       getAllProperty();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

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
          Danh sách tin BĐS
        </div>
        <div className="py-2 px-2">
          <Table className="shadow-sm" bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày đăng</th>
                <th>Tác giả</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {listNews &&
                listNews.map((n, index) => (
                  <tr key={index}>
                    <td>{stt++}</td>
                    <td>{n.created_date.slice(0, 10)}</td>
                    <td>{n.author}</td>
                    <td>{n.viewer}</td>

                    {/* <td>
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
                            // onClick={() => handleDelete(n.id)}
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                    </td> */}
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

export default News;
