import { useState } from "react";
import "./SignUp.scss";
import Button from "react-bootstrap/Button";
import SignUpApi from "../../api/SignUpApi";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignUp() {
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Không được bỏ trống"),
      email: Yup.string().email("Khôn đúng").required("Chưa nhập email"),
      password: Yup.string()
        .required("Chưa nhập mật khẩu")
        .min(6, "Tối thiểu 6 ký tự"),
    }),
    onSubmit: async (values) => {
      setMessage("");
      try {
        let res = await SignUpApi.signUp(
          values.fullName,
          values.email,
          values.password
        );
        if (res.data.message) {
          setMessage(res.data.message);
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
          <div className="fs-3 pt-5">Xin chào bạn</div>
          <div className="fs-2 pb-5">Đăng ký tài khoản mới</div>
          <Form.Group className="mb-4">
            <Form.Control
              name="fullName"
              className="py-2"
              type="text"
              placeholder="Họ tên"
              isInvalid={!!formik.errors.fullName}
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
            {formik.errors.fullName && formik.touched.fullName && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.fullName}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              className="py-2"
              name="email"
              type="email"
              placeholder="Email"
              isInvalid={!!formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              className="py-2"
              name="password"
              type="password"
              placeholder="Mật khẩu"
              isInvalid={!!formik.errors.password}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="text-danger mb-4">{message}</div>
          <Button
            className="w-100 py-3 form-submit"
            variant="danger"
            type="submit"
          >
            Đăng Ký
          </Button>
        </Form>
      </div>
    </>
  );
}

export default SignUp;
