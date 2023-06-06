import { useState } from "react";
import "./SignUp.scss";
import Button from "react-bootstrap/Button";
import SignUpApi from "../../api/SignUpApi";
import Form from "react-bootstrap/Form";

function SignUp() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    message: "",
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    let res = await SignUpApi.signUp(data);
    console.log(res);
  };
  return (
    <>
      <div className="content-signup py-5">
        <Form className="mx-auto py-5 px-5 bg-white form rounded shadow-sm ">
          <div className="fs-3 pt-5">Xin chào bạn</div>
          <div className="fs-2 pb-5">Đăng ký tài khoản mới</div>
          <Form.Group className="mb-4">
            <Form.Control
              className="py-2"
              type="text"
              placeholder="Họ tên"
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              className="py-2"
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              className="py-2"
              type="password"
              placeholder="Mật khẩu"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </Form.Group>
          <Button
            className="w-100 py-3 form-submit"
            variant="danger"
            type="submit"
            onClick={handleSignUp}
          >
            Đăng Ký
          </Button>
        </Form>
      </div>
    </>
  );
}

export default SignUp;
