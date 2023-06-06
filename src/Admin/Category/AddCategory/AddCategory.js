import "./AddCategory.scss";
import Sidebar from "../../Sidebar/Sidebar";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function AddCategory() {
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
          Thêm danh mục
        </div>
        <div className="py-2 px-2">
          <div className="form-content">
            <Form className="py-2 px-2">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tên danh mục</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Thêm
              </Button>
            </Form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default AddCategory;
