import "./Category.scss";

import { Table, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import categoryApi from "../../api/categoryApi";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Category() {
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
  let stt = 1;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState(true);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (catId, catName, catType) => {
    setId(catId);
    setName(catName);
    setType(catType);
    setShow(true);
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  const getAllCategory = async () => {
    try {
      let res = await categoryApi.getAll();
      setListCategory(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleType = (value) => {
    if (value === 1) {
      setType(true);
    } else if (value === 2) {
      setType(false);
    }
  };
  //

  const handleUpdateCategory = async () => {
    try {
      await categoryApi.update(name, type, id);
      await getAllCategory();
      notify1();
      setName("");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  //

  const handleDeleteCategory = async (catId) => {
    try {
      await categoryApi.delete(catId);
      notify();
      await getAllCategory();
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   getAllNews();
  // }, []);
  // const getAllNews = async () => {
  //   try {
  //     let res = await newsApi.getAll();
  //     console.log(res);
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };

  return (
    <>
      <div className="category-content w-75">
        <div className=" ps-3 py-3 bg-primary text-light category-title">
          Danh sách danh mục
        </div>
        <div className="py-2 px-2">
          <Table className="shadow-sm" bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên danh mục</th>
                <th>Hình thức</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {listCategory.map((cat, index) => (
                <tr key={index}>
                  <td>{stt++}</td>
                  <td>{cat.name}</td>
                  <td>{cat.type ? "Bán" : "Cho thuê"}</td>
                  <td>
                    <div className="d-flex">
                      <div className="category-icon">
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          style={{ color: "#0d6efd" }}
                          onClick={() => handleShow(cat.id, cat.name, cat.type)}
                        ></FontAwesomeIcon>
                      </div>
                      <div className="ps-3 category-icon">
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          style={{ color: "#dc3545" }}
                          onClick={() => handleDeleteCategory(cat.id)}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <ToggleButtonGroup
                className="w-100"
                type="radio"
                name="sdasd"
                defaultValue={type ? 1 : 2}
                onChange={handleType}
              >
                <ToggleButton
                  id="11"
                  value={1}
                  variant="light"
                  className="w-50"
                >
                  Nhà đất bán
                </ToggleButton>

                <ToggleButton
                  id="12"
                  value={2}
                  variant="light"
                  className="w-50"
                >
                  Nhà đất cho thuê
                </ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button variant="primary" onClick={handleUpdateCategory}>
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

export default Category;
