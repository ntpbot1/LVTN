import { Table, Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import categoryApi from "../../../api/categoryApi";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import newsApi from "../../../api/newsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddNew() {
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

  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      author: "",
      description: "",
      thumbnail: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Chưa nhập tiêu đề"),
      content: Yup.string().required("Chưa nhập nội dung"),
      author: Yup.string().required("Chưa nhập tác giả"),
      description: Yup.string().required("Chưa nhập mô tả"),
      thumbnail: Yup.mixed().required("Chưa chọn ảnh"),
    }),
    onSubmit: async (values) => {
      setMessage("");
      try {
        const formDaTa = new FormData();
        formDaTa.append("thumbnail", values.thumbnail);
        formDaTa.append("content", values.content);
        formDaTa.append("title", values.title);
        formDaTa.append("description", values.description);
        formDaTa.append("author", values.author);
        const res = await newsApi.add(formDaTa);
        notify();
        values.thumbnail = "";
        values.content = "";
        values.title = "";
        values.description = "";
        values.author = "";
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className="category-content w-75">
        <div className=" ps-3 py-3 bg-primary text-light category-title">
          Thêm tin tức
        </div>
        <div className="py-2 px-2">
          <div className="form-content">
            <Form
              onSubmit={formik.handleSubmit}
              className="mx-auto py-5 px-5 bg-white form rounded shadow-sm "
            >
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  className="py-2"
                  as="textarea"
                  style={{ height: "80px" }}
                  placeholder="Tiêu đề"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.title}
                />
                {formik.errors.title && formik.touched.title && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.title}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Nội dung</Form.Label>

                <Form.Control
                  className="py-2"
                  as="textarea"
                  style={{ height: "200px" }}
                  placeholder="Nội dung"
                  name="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.content}
                />
                {formik.errors.content && formik.touched.content && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.content}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Tác giả</Form.Label>
                <Form.Control
                  className="py-2"
                  type="input"
                  placeholder="Tác giả"
                  name="author"
                  value={formik.values.author}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.author}
                />
                {formik.errors.author && formik.touched.author && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.author}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  className="py-2"
                  as="textarea"
                  style={{ height: "80px" }}
                  placeholder="Mô tả"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.description}
                />
                {formik.errors.description && formik.touched.description && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  placeholder="Chọn ảnh"
                  onChange={(e) =>
                    formik.setFieldValue("thumbnail", e.target.files[0])
                  }
                />
                {formik.values.thumbnail && (
                  <>
                    <Row>
                      {
                        <Col lg={3} md={3} sm={3}>
                          <Image
                            // roundedCircle={true}
                            height={120}
                            src={URL.createObjectURL(formik.values.thumbnail)}
                            className="pt-3  w-100"
                          ></Image>
                        </Col>
                      }
                    </Row>
                  </>
                )}
                {formik.errors.thumbnail && formik.touched.thumbnail && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.thumbnail}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <div className="text-danger mb-4">{message}</div>
              <Button variant="primary" type="submit">
                Thêm
              </Button>
            </Form>
          </div>
        </div>
      </div>
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

export default AddNew;
