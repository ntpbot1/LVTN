import { useState } from "react";
import "./ChangePass.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import changePassword from "../../api/changePasswordApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePass() {
  const notify = () =>
    toast.success("Đổi mật khẩu thành công", {
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
      oldPass: "",
      newPass: "",
    },
    validationSchema: Yup.object({
      oldPass: Yup.string()
        .required("Chưa nhập mật khẩu")
        .min(6, "Tối thiểu 6 ký tự"),
      newPass: Yup.string()
        .required("Chưa nhập mật khẩu mới")
        .min(6, "Tối thiểu 6 ký tự"),
    }),
    onSubmit: async (values) => {
      setMessage("");
      try {
        handleShow();
        let res = await changePassword.change(values.oldPass, values.newPass);
        if (res.message) {
          notify();
          handleClose();
          values.oldPass = "";
          values.newPass = "";
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
          <div className="fs-2 pb-5">Thay đổi mật khẩu</div>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              className="py-2"
              type="password"
              name="oldPass"
              placeholder="Mật khẩu cũ"
              value={formik.values.oldPass}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.oldPass}
            />
            {formik.errors.oldPass && formik.touched.oldPass && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.oldPass}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              className="py-2"
              type="password"
              name="newPass"
              placeholder="Mật khẩu mới"
              value={formik.values.newPass}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.newPass}
            />
            {formik.errors.newPass && formik.touched.newPass && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.newPass}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="text-danger mb-4">{message}</div>
          <Button
            className="w-100 py-3 form-submit"
            variant="danger"
            type="submit"
          >
            Đổi mật khẩu
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

export default ChangePass;
