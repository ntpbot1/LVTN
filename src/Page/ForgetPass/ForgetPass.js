import { useState } from "react";
import "./ForgetPass.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userApi from "../../api/userApi";

function ForgetPass() {
  const notify = () =>
    toast.success("Khôi phục mật khẩu thành công, Kiểm tra email của bạn", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Không đúng định dạng")
        .required("Chưa nhập email"),
    }),
    onSubmit: async (values) => {
      setMessage("");
      try {
        handleShow();
        let res = await userApi.forgetPass(values.email);
        if (res.data) {
          notify();
          handleClose();
          values.email = "";
        }
        if (res.error) {
          setMessage(res.error.message);
        }
      } catch (error) {
        console.log(error);
        handleClose();
        setMessage("Thông tin không chính xác");
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
          <div className="fs-2 pb-5">Khôi phục mật khẩu</div>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              className="py-2"
              type="email"
              name="email"
              placeholder="Nhập email"
              value={formik.values.email}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.email}
            />
            {formik.errors.email && formik.touched.email && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="text-danger mb-4">{message}</div>
          <Button
            className="w-100 py-3 form-submit"
            variant="danger"
            type="submit"
          >
            Gửi
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

export default ForgetPass;
