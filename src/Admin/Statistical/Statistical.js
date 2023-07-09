import { Row, Col } from "react-bootstrap";
import "./Statistical.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
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
  // const end = `${year}-${month}-${date}`;
  const [end, setEnd] = useState("2023-07-08");

  useEffect(() => {
    getStatistical();
  }, []);
  const getStatistical = async () => {
    try {
      const res = await propertyApi.statistical(start, end);
      setStatis(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <>
      <div className="container-statistical w-75">
        <div className=" ps-3 py-3 bg-primary text-light category-title">
          Thống kê
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
