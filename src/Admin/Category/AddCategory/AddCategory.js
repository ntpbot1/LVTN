import "./AddCategory.scss";
import {
  Table,
  Modal,
  Button,
  Form,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useState } from "react";
import categoryApi from "../../../api/categoryApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddCategory() {
  const notify = () =>
    toast.success("Thêm thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const navigate = useNavigate();
  const [type, setType] = useState(true);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReset = () => {
    setName("");
    setType(true);
  };
  const handleUpdate = () => {
    console.log("acb");
  };
  const handleDelete = () => {
    console.log("xyz");
  };
  const handleType = (value) => {
    if (value === 1) {
      setType(true);
    } else if (value === 2) {
      setType(false);
    }
  };
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await categoryApi.add(name, type);
      notify();
      handleReset();
    } catch (error) {
      console.log(error);
    }
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
                <ToggleButtonGroup
                  className="w-100"
                  type="radio"
                  name="sdasd"
                  defaultValue={1}
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
              <Button
                variant="primary"
                type="submit"
                onClick={handleAddCategory}
              >
                Thêm
              </Button>
            </Form>
          </div>
        </div>
      </div>
      {/* </div> */}
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

export default AddCategory;
