import { useState } from "react";
import "./VerifySignUp.scss";
import Button from "react-bootstrap/Button";
// import SignUpApi from "../../api/SignUpApi";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import SignUpApi from "../../../api/SignUpApi";

function VerifySignUp() {
  const navigate = useNavigate;
  const email = sessionStorage.getItem("email-sign-up");
  const [message, setMessage] = useState("");
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
        console.log(res);
        if (res.data.message) {
          setMessage(res.data.message);
          //   if (res.data.message == "Please check mail to verify your account") {
          //     navigate("/dang-nhap");
          //   }
        }
      } catch (error) {
        console.log(error);
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
          <div className="fs-2 pb-5">Xác nhận mã</div>
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
    </>
  );
}

export default VerifySignUp;
