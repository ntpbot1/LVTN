// import { useState } from "react";
// import "./SignIn.scss";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import LoginAdminApi from "../../api/adminApi";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { isLogin } from "./SignInSlice";
// import { Modal } from "react-bootstrap";
// import Spinner from "react-bootstrap/Spinner";
// function SignIn() {
//   const [validated, setValidated] = useState(false);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     message: "",
//   });

//   const handleLogin = async (e) => {
//     setData({ ...data, message: "" });
//     e.preventDefault();
//     const form = e.currentTarget;
//     if (form.checkValidity() === true) {
//       try {
//         handleShow();
//         let res = await LoginAdminApi.login(data);
//         if (res.message) {
//           setData({ ...data, message: res.message });
//         }
//         if (res.data) {
//           dispatch(isLogin(res.data.fullname));
//           sessionStorage.setItem("tokenAdmin", res.data.refreshToken);
//           handleClose();
//         }
//         if (res.error) {
//           setData({ ...data, message: res.error.message });
//         }
//       } catch (error) {
//         console.log(error);
//         handleClose();
//         setData({ ...data, message: "Thông tin đăng nhập không chính xác" });
//       }
//       // console.log(data);
//     }
//     setValidated(true);
//   };
//   return (
//     <>
//       <div className="content-signin-admin py-5">
//         <Form
//           noValidate
//           validated={validated}
//           onSubmit={handleLogin}
//           className="mx-auto py-5 px-5 bg-white form rounded shadow-sm "
//         >
//           <div className="fs-3 pt-5">Xin chào bạn</div>
//           <div className="fs-2 pb-5">Đăng nhập để tiếp tục</div>
//           <Form.Group className="mb-4" controlId="formBasicEmail">
//             <Form.Control
//               className="py-2"
//               type="email"
//               placeholder="Email"
//               required={true}
//               value={data.email}
//               onChange={(e) => setData({ ...data, email: e.target.value })}
//             />
//             <Form.Control.Feedback></Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group className="mb-4" controlId="formBasicPassword">
//             <Form.Control
//               className="py-2"
//               type="password"
//               placeholder="Mật khẩu"
//               required={true}
//               minLength={6}
//               value={data.password}
//               onChange={(e) => setData({ ...data, password: e.target.value })}
//             />
//             <Form.Control.Feedback></Form.Control.Feedback>
//           </Form.Group>
//           <div className="text-danger mb-4">{data.message}</div>
//           <Button
//             className="w-100 py-3 form-submit"
//             variant="danger"
//             type="submit"
//           >
//             Đăng nhập
//           </Button>
//         </Form>
//       </div>
//       <Modal className="loading" show={show} onHide={handleClose}>
//         <Spinner
//           className="bg-transparent mx-auto my-auto"
//           animation="border"
//         />
//       </Modal>
//     </>
//   );
// }

// export default SignIn;

import { useState } from "react";
import "./SignIn.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoginAdminApi from "../../api/adminApi";
import { useDispatch } from "react-redux";
import { isLogin } from "./SignInSlice";
import { Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignIn() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
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
        let res = await LoginAdminApi.login(values.email, values.password);
        if (res.message) {
          setMessage(res.message);
        }
        if (res.data) {
          dispatch(isLogin(res.data.fullname));
          sessionStorage.setItem("tokenAdmin", res.data.refreshToken);
          handleClose();
        }
        if (res.error) {
          setMessage(res.error.message);
        }
        console.log("asdas");
      } catch (error) {
        console.log(error);
        handleClose();
        setMessage("Thông tin đăng nhập không chính xác");
      }
    },
  });
  return (
    <>
      <div className="content-signin-admin py-5">
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
              placeholder="Email"
              name="email"
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
              placeholder="Mật khẩu"
              name="password"
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
