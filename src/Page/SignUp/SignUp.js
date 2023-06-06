import { useState } from "react";
import "./SignUp.scss";
import Button from "react-bootstrap/Button";
import SignUpApi from "../../api/SignUpApi";
import Form from "react-bootstrap/Form";

function SignUp() {
  const [validated, setValidated] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    message: "",
  });
  const handleSignUp = async (e) => {
    setData({ ...data, message: "" });
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      e.preventDefault();

      let res = await SignUpApi.signUp(data);
      if (res.message) {
        setData({ ...data, message: res.message });
      }
      console.log(res);
    }
    // console.log(data);

    setValidated(true);
  };

  return (
    <>
      <div className="content-signup py-5">
        <Form
          onClick={handleSignUp}
          noValidate
          validated={validated}
          className="mx-auto py-5 px-5 bg-white form rounded shadow-sm "
        >
          <div className="fs-3 pt-5">Xin chào bạn</div>
          <div className="fs-2 pb-5">Đăng ký tài khoản mới</div>
          <Form.Group className="mb-4">
            <Form.Control
              className="py-2"
              type="text"
              placeholder="Họ tên"
              required={true}
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              className="py-2"
              type="email"
              required={true}
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              className="py-2"
              type="password"
              placeholder="Mật khẩu"
              required={true}
              minLength={6}
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          </Form.Group>
          <div className="text-danger mb-4">{data.message}</div>
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
