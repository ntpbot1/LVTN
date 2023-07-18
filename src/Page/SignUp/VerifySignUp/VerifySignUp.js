import { useState } from "react";
import "./VerifySignUp.scss";
import Button from "react-bootstrap/Button";
// import SignUpApi from "../../api/SignUpApi";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import SignUpApi from "../../../api/SignUpApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VerifySignUp() {
  const notify = () =>
    toast.success("Xác nhận thành công", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notify1 = () =>
    toast.error("Sai mã xác nhận", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const { email } = useParams();
  const navigate = useNavigate;
  const [message, setMessage] = useState(
    "Mã xác nhận đã dược gửi qua email. Vui lòng kiểm tra email"
  );
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Không được bỏ trống"),
    }),
    onSubmit: async (values) => {
      setMessage("");
      try {
        let res = await SignUpApi.verify(email, values.code);
        if (res.data.message) {
          setMessage("Xác nhận thành công");
          notify();
        }
      } catch (error) {
        console.log(error);
        notify1();
      }
    },
  });

  return (
    <>
      <div className="content-signup py-5">
        <Form
          onSubmit={formik.handleSubmit}
          className="mx-auto py-5 px-5 bg-white form rounded shadow-sm "
        >
          <div className="fs-2 pb-4">Xác nhận mã</div>
          <div className="pb-3 text-danger">{message}</div>
          <Form.Group className="mb-4">
            <Form.Control
              name="code"
              className="py-2"
              type="text"
              placeholder="Nhập mã xác nhận"
              isInvalid={!!formik.errors.code}
              value={formik.values.code}
              onChange={formik.handleChange}
            />
            {formik.errors.code && formik.touched.code && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.code}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {/* <div className="text-danger mb-4">{message}</div> */}
          <Button
            className="w-100 py-3 form-submit"
            variant="danger"
            type="submit"
          >
            Xác nhận
          </Button>
        </Form>
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

export default VerifySignUp;
