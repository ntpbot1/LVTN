import { useState } from "react";
import "./ChangeInfo.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Modal, Col, Row, Image } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import userApi from "../../api/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function ChangeInfo() {
  const notify = () =>
    toast.success("Đổi thông tin thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const infoUser = useSelector((state) => state.login);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      name: infoUser.userName,
      birth: infoUser.birth ? infoUser.birth.slice(0, 10) : "",
      address: infoUser.address ? infoUser.address : "",
      phone: infoUser.phone ? infoUser.phone : "",
      img: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Chưa nhập họ tên"),
      birth: Yup.date().required("Chưa chọn ngày sinh"),
      address: Yup.string().required("Chưa nhập địa chỉ"),
      phone: Yup.number().required("Chưa nhập số điện thoại"),
      img: Yup.mixed().required("Chưa nhập họ tên"),
    }),
    onSubmit: async (values) => {
      setMessage("");
      try {
        handleShow();
        const formDaTa = new FormData();
        formDaTa.append("fullName", values.name);
        formDaTa.append("dateOfBirth", values.birth);
        formDaTa.append("address", values.address);
        formDaTa.append("phone", values.phone);
        formDaTa.append("avatar", values.img);
        formDaTa.append("email", infoUser.email);
        let res = await userApi.changeInfo(formDaTa);
        if (res.data) {
          notify();
          handleClose();
          values.name = "";
          values.birth = "";
          values.address = "";
          values.phone = "";
          values.img = "";
        }
        if (res.error) {
          setMessage(res.error.message);
        }
      } catch (error) {
        console.log(error);
        handleClose();
      }
    },
  });

  return (
    <>
      <div className="content-signin py-5">
        <Form
          onSubmit={formik.handleSubmit}
          className="mx-auto py-5 px-5 bg-white form rounded shadow-sm "
        >
          {/* <div className="fs-3 pt-5">Xin chào bạn</div> */}
          <div className="fs-2 pb-5">Thay đổi thông tin</div>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              className="py-2"
              type="text"
              name="name"
              placeholder="Họ tên"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.name}
            />
            {formik.errors.name && formik.touched.name && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Ngày sinh</Form.Label>

            <Form.Control
              className="py-2"
              type="date"
              name="birth"
              placeholder="Ngày sinh"
              value={formik.values.birth}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.birth}
            />
            {formik.errors.birth && formik.touched.birth && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.birth}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Địa chỉ</Form.Label>

            <Form.Control
              className="py-2"
              type="text"
              name="address"
              placeholder="Địa chỉ"
              value={formik.values.address}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.address}
            />
            {formik.errors.address && formik.touched.address && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Số điện thoại</Form.Label>

            <Form.Control
              className="py-2"
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formik.values.phone}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.phone}
            />
            {formik.errors.phone && formik.touched.phone && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.phone}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Ảnh đại diện</Form.Label>

            <Form.Control
              className="py-2"
              type="file"
              name="img"
              accept="image/*"
              placeholder="Chọn ảnh"
              onChange={(e) => formik.setFieldValue("img", e.target.files[0])}
            />
            {formik.values.img && (
              <>
                <Row>
                  {
                    <Col lg={3} md={3} sm={3}>
                      <Image
                        // roundedCircle={true}
                        height={120}
                        src={URL.createObjectURL(formik.values.img)}
                        className="pt-3  w-100"
                      ></Image>
                    </Col>
                  }
                </Row>
              </>
            )}
            {formik.errors.img && formik.touched.img && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.img}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="text-danger mb-4">{message}</div>
          <Button
            className="w-100 py-3 form-submit"
            variant="danger"
            type="submit"
          >
            Xác nhận
          </Button>
        </Form>
      </div>
      <Modal className="loading" show={show} onHide={handleClose}>
        <Spinner
          className="bg-transparent mx-auto my-auto"
          animation="border"
        />
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

export default ChangeInfo;
