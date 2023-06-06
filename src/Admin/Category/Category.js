import "./Category.scss";
import Sidebar from "../Sidebar/Sidebar";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import categoryApi from "../../api/categoryApi";
import newsApi from "../../api/newsApi";
import axios from "axios";

function Category() {
  let stt = 1;
  const [listCategory, setListCategory] = useState([]);
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
  //   getAllCategory();
  // }, []);
  // const getAllCategory = async () => {
  //   try {
  //     let res = await categoryApi.getAll();
  //     console.log(res);
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };
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
  // const [data, setData] = useState(null);
  // const url =
  //   "https://8834-2405-4802-9115-60d0-75cb-fe75-52cd-9616.ngrok-free.app/catgory/getall";
  // useEffect(() => {
  //   fetch(url, { mode: "cors" })
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, [url]);
  // console.log(data);
  axios
    .get(
      "https://8834-2405-4802-9115-60d0-75cb-fe75-52cd-9616.ngrok-free.app/catgory/getall",
      { crossdomain: true }
    )
    .then((result) => {
      console.log("result", result);
    })
    .catch((error) => {
      console.log("Error", error);
    });
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
                <th>Tên danh mục</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stt++}</td>
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
