import { Form, Row, Col, Button } from "react-bootstrap";
import "./Statistical.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
import { useFormik } from "formik";
import * as Yup from "yup";
function Statistical() {
  const curDate = new Date();
  const [statis, setStatis] = useState();
  const [date, setDate] = useState(`${curDate.getDate()}`);
  const [month, setMonth] = useState(`${curDate.getMonth() + 1}`);
  const [year, setYear] = useState(`${curDate.getFullYear()}`);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  if (date.length < 2) {
    setDate(`0${date}`);
  }
  if (month.length < 2) {
    setMonth(`0${month}`);
  }
  const [start, setStart] = useState("2023-06-01");
  const end = `${year}-${month}-${date}`;
  // const [end, setEnd] = useState("2023-07-08");

  // useEffect(() => {
  //   getStatistical();
  // }, []);
  // const getStatistical = async () => {
  //   try {
  //     const res = await propertyApi.statistical(start, end);
  //     setStatis(res.data);
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };
  const formik = useFormik({
    initialValues: {
      start: "",
      end: "",
    },
    validationSchema: Yup.object({
      start: Yup.date().required("Chưa chọn ngày bắt đầu"),
      end: Yup.date().required("Chưa chọn ngày kết thúc"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await propertyApi.statistical(values.start, values.end);
        setStatis(res.data);
      } catch (err) {
        console.log("err", err);
      }
    },
  });
  return (
    <>
      <div className="container-statistical w-75">
        <div className=" ps-3 py-3 bg-primary text-light category-title">
          Thống kê
        </div>
        <div className="pt-3">
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={1}></Col>
              <Col>
                <Row className="d-flex align-items-center">
                  {/* <Col md={2}></Col> */}
                  <Col>
                    <Form.Label className="statistical-start">
                      Ngày bắt đầu
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      className="py-2"
                      type="date"
                      name="start"
                      // placeholder="Ngày "
                      value={formik.values.start}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.start}
                    />
                    {formik.errors.start && formik.touched.start && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.start}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col md={1}></Col>

              <Col>
                <Row className="d-flex align-items-center">
                  {/* <Col md={2}></Col> */}
                  <Col>
                    <Form.Label className="statistical-start">
                      Ngày kết thúc
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      className="py-2"
                      type="date"
                      name="end"
                      // placeholder="Ngày "
                      value={formik.values.end}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.end}
                    />
                    {formik.errors.end && formik.touched.end && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.end}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col md={1}></Col>
              <Col>
                <Row>
                  <Col md={12}>
                    <Form.Label className="statistical-start">
                      Thống kê
                    </Form.Label>
                  </Col>
                  <Col>
                    <Button
                      className="w-100 form-submit"
                      variant="primary"
                      type="submit"
                    >
                      Xác nhận
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col md={1}></Col>
            </Row>
          </Form>
        </div>
        <div>
          <Row className="pt-4 statistical-row">
            <Col md={1}></Col>
            <Col className="statistical-col">
              <div className="d-flex shadow-sm rounded h-100 bg-light">
                <div className="h-100 w-25 d-flex align-items-center justify-content-center rounded statistical-bg-1 ">
                  <FontAwesomeIcon icon={faNewspaper}></FontAwesomeIcon>
                </div>
                <div className="h-100 w-75">
                  <div className="d-flex justify-content-center statistical-title">
                    Tổng tin đăng
                  </div>
                  <div className="d-flex py-2 justify-content-center">
                    {statis && statis.news[1]}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={1}></Col>
            <Col className="statistical-col">
              <div className="d-flex shadow-sm rounded h-100 bg-light">
                <div className="h-100 w-25 d-flex align-items-center justify-content-center rounded statistical-bg-2 ">
                  <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>
                </div>
                <div className="h-100 w-75">
                  <div className="d-flex justify-content-center statistical-title">
                    Tổng doanh thu
                  </div>
                  <div className="d-flex py-2  justify-content-center">
                    {statis && VND.format(statis.payment[0].totalsale / 100)}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={1}></Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Statistical;
