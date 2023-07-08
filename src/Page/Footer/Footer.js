import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faUser,
  faHeadphones,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
function Footer() {
  return (
    <>
      <div className="container-fluid ">
        <div className="container py-5">
          <Row className="d-flex flex-row contact">
            <Col sm={12} md={3} className="fs-1 contact-item logo">
              ThanhBuild
            </Col>
            <Col sm={12} md={3} className="contact-item hotline">
              <div className="d-flex flex-row align-items-center">
                <div className="mx-3 icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="d-flex flex-column">
                  <div className="text-black-50 title">Hotline</div>
                  <div className="fw-bold link">1900 000</div>
                </div>
              </div>
            </Col>
            <Col sm={12} md={3} className="contact-item support">
              <div className="d-flex flex-row align-items-center">
                <div className="mx-3 icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="d-flex flex-column">
                  <div className="text-black-50 title">Chăm sóc khách hàng</div>
                  <div className="fw-bold link">chamsoc.com</div>
                </div>
              </div>
            </Col>
            <Col sm={12} md={3} className="contact-item care">
              <div className="d-flex flex-row align-items-center">
                <div className="mx-3 icon">
                  <FontAwesomeIcon icon={faHeadphones} />
                </div>
                <div className="d-flex flex-column">
                  <div className="text-black-50 title">Hỗ trợ khách hàng</div>
                  <div className="fw-bold link">hotro@bds.com</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="d-flex flex-row pt-5 info">
            <Col sm={12} md={3} className="d-flex flex-column info-item">
              <div className="fw-bold">Công ty cổ phần ....</div>
              <div className="d-flex flex-row align-items-center mt-3">
                <div className="me-3 icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="fw-bold title">Công Viên Phú Lâm</div>
              </div>
              <div className="d-flex flex-row align-items-center mt-3">
                <div className="me-3 icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="fw-bold title">61375</div>
              </div>
            </Col>
            <Col sm={12} md={3} className="d-flex flex-column pt-4 info-item">
              <div className="fw-bold text-uppercase">Hướng dẫn</div>
              <Link className="text-decoration-none text-dark py-1" to={"/"}>
                Báo cáo & hỗ trợ
              </Link>
              <Link className="text-decoration-none text-dark py-1" to={"/"}>
                Câu hỏi thường gặp
              </Link>
              <Link className="text-decoration-none text-dark py-1" to={"/"}>
                Thông báo
              </Link>
              <Link className="text-decoration-none text-dark py-1" to={"/"}>
                Liên hệ
              </Link>
              <Link className="text-decoration-none text-dark py-1" to={"/"}>
                Sitemap
              </Link>
            </Col>
            <Col sm={12} md={3} className="d-flex flex-column pt-4   info-item">
              <div className="fw-bold text-uppercase">Quy định</div>
              <Link className="text-decoration-none text-dark py-1" to={"/"}>
                Quy định đăng tin
              </Link>
              <Link className="text-decoration-none text-dark py-1" to={"/"}>
                Quy chế hoạt động
              </Link>
              <Link className="text-decoration-none text-dark py-1" to={"/"}>
                Điều khoản thỏa thuận
              </Link>
              <Link className="text-decoration-none text-dark py-1" to={"/"}>
                Chính sách bảo mật
              </Link>
              <Link className="text-decoration-none text-dark py-1" to={"/"}>
                Giải quyến khiếu nại
              </Link>
              <Link className="text-decoration-none text-dark py-1" to={"/"}>
                Góp ý báo lỗi
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Footer;
