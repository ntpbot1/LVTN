import { useState } from "react";
import "./SignIn.scss";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import LoginApi from "../../api/SignIn";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLogin } from "./SignInSlice";
import { Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import logoFB from "../../img/facebook.svg";
import logoGG from "../../img/google.svg";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignIn() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const handleFB = async () => {
    window.open("http://lvtn-bds.onrender.com/user/facebook");
    // try {
    //   const res = await SignUpApi.signUpWithFB();
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleGG = async () => {
    window.open("http://lvtn-bds.onrender.com/user/google");

    // try {
    //   const res = await SignUpApi.signUpWithGG();
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Không đúng").required("Chưa nhập email"),
      password: Yup.string()
        .required("Chưa nhập mật khẩu")
        .min(6, "Tối thiểu 6 ký tự"),
    }),
    onSubmit: async (values) => {
      setMessage("");
      try {
        handleShow();
        let res = await LoginApi.login(values.email, values.password);
        if (res.message) {
          setMessage(res.message);
        }
        if (res.data) {
          dispatch(
            isLogin({
              id: res.data.data.id,
              img: res.data.data.avatar,
              name: res.data.data.fullname,
              email: values.email,
              phone: res.data.data.phone,
              birth: res.data.data.dateOfBirth,
              address: res.data.data.address,
            })
          );
          sessionStorage.setItem("token", res.data.refreshToken);
          handleClose();
          navigate("/");
        }
        if (res.error) {
          setMessage(res.error.message);
        }
      } catch (error) {
        console.log(error);
        handleClose();
        setMessage("Thông tin đăng nhập không chính xác");
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
          <div className="fs-3 pt-5">Xin chào bạn</div>
          <div className="fs-2 pb-5">Đăng nhập để tiếp tục</div>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              className="py-2"
              type="email"
              name="email"
              placeholder="Email"
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
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              className="py-2"
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.password}
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
            Đăng nhập
          </Button>
          <></>
          <Link
            className="text-decoration-none text-dark bg-transparent"
            to={"/quen-mat-khau"}
          >
            <div className="text-danger float-end mt-2">Quên mật khẩu?</div>
          </Link>
          <Form.Group className="mb-4 sosical" controlId="formBasicPassword">
            <div className="pt-4">
              <div className="d-flex align-items-center w-100">
                <div className="sosical-space"></div>
                <div className="d-flex justify-content-center sosical-title">
                  Hoặc
                </div>
                <div className="sosical-space"></div>
              </div>
            </div>
            <div className="pt-4">
              <div className="d-flex justify-content-between">
                <div
                  className="d-flex align-items-center justify-content-center py-2 rounded sosical-frame"
                  onClick={handleFB}
                >
                  <Image
                    roundedCircle={true}
                    width={20}
                    height={20}
                    src={logoFB}
                  ></Image>
                  <div className="ps-2 sosical-fb">Facebook</div>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center py-2 rounded sosical-frame"
                  onClick={handleGG}
                >
                  <Image
                    roundedCircle={true}
                    width={20}
                    height={20}
                    src={logoGG}
                  ></Image>

                  <div className="ps-2  sosical-gg">Google</div>
                </div>
              </div>
            </div>
          </Form.Group>
        </Form>
      </div>
      <Modal className="loading" show={show} onHide={handleClose}>
        <Spinner
          className="bg-transparent mx-auto my-auto"
          animation="border"
        />
      </Modal>
    </>
  );
}

export default SignIn;
