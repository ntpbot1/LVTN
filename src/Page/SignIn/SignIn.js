import { useState } from "react";
import "./SignIn.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoginApi from "../../api/SignIn";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLogin } from "./SignInSlice";
function SignIn() {
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    message: "",
  });

  const handleLogin = async (e) => {
    setData({ ...data, message: "" });
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      e.stopPropagation();
      let res = await LoginApi.login(data);
      console.log(res);
      if (res.message) {
        setData({ ...data, message: res.message });
      }
      if (res.data) {
        dispatch(isLogin(res.data.fullname));
        localStorage.setItem("token", res.refreshToken);
        navigate("/");
      }
      if (res.error) {
        setData({ ...data, message: res.error.message });
      }
      // console.log(data);
    }
    setValidated(true);
  };
  return (
    <>
      <div className="content-signin py-5">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleLogin}
          className="mx-auto py-5 px-5 bg-white form rounded shadow-sm "
        >
          <div className="fs-3 pt-5">Xin chào bạn</div>
          <div className="fs-2 pb-5">Đăng nhập để tiếp tục</div>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              className="py-2"
              type="email"
              placeholder="Email"
              required={true}
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <Form.Control.Feedback></Form.Control.Feedback>
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
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
          <div className="text-danger mb-4">{data.message}</div>
          <Button
            className="w-100 py-3 form-submit"
            variant="danger"
            type="submit"
          >
            Đăng nhập
          </Button>
        </Form>
      </div>
    </>
  );
}

export default SignIn;
