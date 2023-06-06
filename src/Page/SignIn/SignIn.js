// import { useState } from "react";
// import "./SignIn.scss";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import LoginApi from "../../api/SignIn";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { isLogin } from "./SignInSlice";
// import * as formik from "formik";
// import * as yup from "yup";
// function SignIn() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { Formik } = formik;

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     message: "",
//   });
//   const schema = yup.object().shape({
//     lastName: yup.string().required(),
//     username: yup.string().required(),
//     city: yup.string().required(),
//     state: yup.string().required(),
//     zip: yup.string().required(),
//     terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
//   });
//   const handleLogin = async (e) => {
//     setData({ ...data, message: "" });
//     e.preventDefault();
//     let res = await LoginApi.login(data);
//     // console.log(res);
//     if (res.message) {
//       setData({ ...data, message: res.message });
//     }
//     if (res.data) {
//       dispatch(isLogin(res.data.fullname));
//       localStorage.setItem("token", res.refreshToken);
//       navigate("/");
//     }
//   };
//   return (
//     <>
//       <div className="content-signin py-5">
//         <Form className="mx-auto py-5 px-5 bg-white form rounded shadow-sm ">
//           <div className="fs-3 pt-5">Xin chào bạn</div>
//           <div className="fs-2 pb-5">Đăng nhập để tiếp tục</div>
//           <Form.Group className="mb-4" controlId="formBasicEmail">
//             <Form.Control
//               className="py-2"
//               type="email"
//               placeholder="Email"
//               value={data.email}
//               onChange={(e) => setData({ ...data, email: e.target.value })}
//             />
//           </Form.Group>
//           <Form.Group className="mb-4" controlId="formBasicPassword">
//             <Form.Control
//               className="py-2"
//               type="password"
//               placeholder="Mật khẩu"
//               value={data.password}
//               onChange={(e) => setData({ ...data, password: e.target.value })}
//             />
//           </Form.Group>
//           <div className="text-danger mb-4">{data.message}</div>
//           <Button
//             className="w-100 py-3 form-submit"
//             variant="danger"
//             type="submit"
//             onClick={handleLogin}
//           >
//             Đăng nhập
//           </Button>
//         </Form>
//       </div>
//     </>
//   );
// }

// export default SignIn;
import { useState } from "react";
import "./SignIn.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoginApi from "../../api/SignIn";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLogin } from "./SignInSlice";
import { Row, Col, InputGroup } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Formik } = formik;

  const [data, setData] = useState({
    email: "",
    password: "",
    message: "",
  });
  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string(),
  });
  const handleLogin = async (e) => {
    setData({ ...data, message: "" });
    e.preventDefault();
    let res = await LoginApi.login(data);
    // console.log(res);
    if (res.message) {
      setData({ ...data, message: res.message });
    }
    if (res.data) {
      dispatch(isLogin(res.data.fullname));
      localStorage.setItem("token", res.refreshToken);
      navigate("/");
    }
  };
  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        email: "",
        password: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <div className="content-signin py-5">
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                feedbackType="invalid"
                id="validationFormik0"
              />
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default SignIn;
