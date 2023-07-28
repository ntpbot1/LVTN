import {
  Row,
  Col,
  Form,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import propertyApi from "../../api/propertyApi";
import paymentApi from "../../api/paymentApi";
function Pay() {
  const navigate = useNavigate();
  const { id, expiration, type } = useParams();
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  // const [type, setType] = useState("");
  // const [expiration, setExpiration] = useState("");
  // Chọn loại tin
  let cost = 0;

  let totalCost = 0;
  if (type) {
    if (type == 1) {
      cost = 2000;
    } else if (type == 2) {
      cost = 10000;
    } else if (type == 3) {
      cost = 20000;
    } else {
      cost = 50000;
    }
  }
  if (expiration) {
    if (expiration == 7) {
      totalCost = cost * 7;
    } else if (expiration == 10) {
      totalCost = (cost - cost * 0.03) * 10;
    } else if (expiration == 15) {
      totalCost = (cost - cost * 0.05) * 15;
    } else {
      totalCost = (cost - cost * 0.1) * 30;
    }
  }
  const handleRePost = async () => {
    const formDaTa = new FormData();
    formDaTa.append("amount", totalCost);
    formDaTa.append("bankCode", "");
    formDaTa.append("language", "vn");
    formDaTa.append("real_easte_id", id);
    try {
      const res1 = await paymentApi.getPayment(formDaTa);
      if (res1.data) {
        window.open(res1.data);
        navigate("/");
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="py-4 register-post-container ">
        <Row>
          <Col sm={12} md={2}></Col>
          <Col sm={12} md={8}>
            <div className="mb-4 shadow-sm rounded register-post-content">
              <div className="px-4  py-4 ">
                <div className="fs-3 register-post-title">Thanh Toán</div>
                <div className="py-2 ">
                  <div className="py-2 register-post-sub-title d-flex justify-content-between">
                    <div>Loại tin</div>
                    <div>
                      {type == 1
                        ? "Tin Thường"
                        : type == 2
                        ? "Tin VIP 1"
                        : type == 3
                        ? "Tin VIP 2"
                        : type == 4
                        ? "Tin VIP 3"
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="py-2 ">
                  <div className="py-2 register-post-sub-title d-flex justify-content-between">
                    <div>Đơn giá / ngày</div>
                    <div>{cost ? VND.format(cost) : ""}</div>
                  </div>
                </div>
                <div className="py-2 ">
                  <div className="py-2 register-post-sub-title d-flex justify-content-between">
                    <div>Thời gian đăng tin</div>
                    <div>{expiration ? `${expiration} ngày` : ""}</div>
                  </div>
                </div>
                <div className="py-2 ">
                  <div className="py-2 register-post-sub-title d-flex justify-content-between">
                    <div>Phí đăng</div>
                    <div>{totalCost ? VND.format(totalCost) : ""}</div>
                  </div>
                </div>
                <div className="py-2 ">
                  <div className="py-2 register-post-sub-title d-flex justify-content-between">
                    <div>Tổng tiền</div>
                    <div>{totalCost ? VND.format(totalCost) : ""}</div>
                  </div>
                </div>
                <div className="">
                  <Button
                    type="submit"
                    className="fs-4 bg-danger "
                    onClick={handleRePost}
                  >
                    Thanh Toán
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} md={2}></Col>
        </Row>
      </div>
    </>
  );
}

export default Pay;
