import {
  Row,
  Col,
  Form,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import propertyApi from "../../api/propertyApi";
import paymentApi from "../../api/paymentApi";
function RePost() {
  const { slug } = useParams();
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const [type, setType] = useState("");
  const [expiration, setExpiration] = useState("");
  // Chọn loại tin
  const [cost, setCost] = useState("");

  const [totalCost, setTotalCost] = useState();

  const handleType = (value) => {
    switch (value) {
      case 1:
        return setCost(2000), setType(1), setTotalCost(0), setExpiration(0);
      case 2:
        return setCost(10000), setType(2), setTotalCost(0), setExpiration(0);
      case 3:
        return setCost(20000), setType(3), setTotalCost(0), setExpiration(0);
      case 4:
        return setCost(50000), setType(4), setTotalCost(0), setExpiration(0);
      default:
        break;
    }
  };
  const handleMucGia = (value) => {
    switch (value) {
      case 5:
        return setTotalCost(cost * 7), setExpiration(7);
      case 6:
        return setTotalCost((cost - cost * 0.03) * 10), setExpiration(10);
      case 7:
        return setTotalCost((cost - cost * 0.05) * 15), setExpiration(15);
      case 8:
        return setTotalCost((cost - cost * 0.1) * 30), setExpiration(30);
      default:
        break;
    }
  };
  const handleRePost = async () => {
    try {
      const res = await propertyApi.rePost(slug, type, expiration);
      if (res.data) {
        const formDaTa = new FormData();
        formDaTa.append("amount", totalCost);
        formDaTa.append("bankCode", "");
        formDaTa.append("language", "vn");
        try {
          const res1 = await paymentApi.getPayment(formDaTa);
          if (res1.data) {
            window.open(res1.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="pt-4 register-post-container ">
        <Row>
          <Col sm={12} md={2}></Col>
          <Col sm={12} md={8}>
            <div className="mb-4 shadow-sm rounded register-post-content">
              <div className="px-4  py-4 ">
                <div className="fs-3 register-post-title">
                  Cấu hình tin đăng
                </div>
                <div className="py-2">
                  <div className="py-2 register-post-sub-title">
                    Chọn loại tin đăng
                  </div>
                  <div className="py-2">
                    <Row>
                      <ToggleButtonGroup
                        type="radio"
                        name="abc"
                        // defaultValue={1}
                        onChange={handleType}
                      >
                        <ToggleButton
                          id="1"
                          value={1}
                          variant="light"
                          className="search-button"
                        >
                          <div>Tin thường</div>
                          <div>{`${VND.format(2000)} / ngày`} </div>
                        </ToggleButton>

                        <ToggleButton
                          id="2"
                          value={2}
                          variant="light"
                          className="search-button"
                        >
                          <div>Tin VIP 1</div>
                          <div>{`${VND.format(10000)} / ngày`}</div>
                        </ToggleButton>

                        <ToggleButton
                          id="3"
                          value={3}
                          variant="light"
                          className="search-button"
                        >
                          <div>Tin VIP 2</div>
                          <div>{`${VND.format(20000)} / ngày`}</div>
                        </ToggleButton>

                        <ToggleButton
                          id="4"
                          value={4}
                          variant="light"
                          className="search-button"
                        >
                          <div>Tin VIP 3</div>
                          <div>{`${VND.format(50000)} / ngày`}</div>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Row>
                  </div>
                </div>

                <div className="py-2">
                  <div className="py-2 register-post-sub-title">
                    Số ngày đăng
                  </div>
                  <div className="py-2">
                    <Row>
                      <ToggleButtonGroup
                        type="radio"
                        name="xyz"
                        id="2"
                        // defaultValue={1}
                        onChange={handleMucGia}
                      >
                        <ToggleButton
                          id="5"
                          value={5}
                          variant="light"
                          className="search-button"
                        >
                          <div>7 ngày</div>
                          <div>Phí : {cost ? VND.format(cost * 7) : ""}</div>
                        </ToggleButton>

                        <ToggleButton
                          id="6"
                          value={6}
                          variant="light"
                          className="search-button"
                        >
                          <div>10 ngày</div>
                          <div>
                            Phí :{" "}
                            {cost ? VND.format((cost - cost * 0.03) * 10) : ""}
                          </div>
                        </ToggleButton>

                        <ToggleButton
                          id="7"
                          value={7}
                          variant="light"
                          className="search-button"
                        >
                          <div>15 ngày</div>
                          <div>
                            Phí :{" "}
                            {cost ? VND.format((cost - cost * 0.05) * 15) : ""}
                          </div>
                        </ToggleButton>

                        <ToggleButton
                          id="8"
                          value={8}
                          variant="light"
                          className="search-button"
                        >
                          <div>30 ngày</div>
                          <div>
                            Phí :{" "}
                            {cost ? VND.format((cost - cost * 0.1) * 30) : ""}
                          </div>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Row>
                  </div>
                </div>
                {/* <div className="py-2">
                  <div className="py-2 register-post-sub-title">
                    Ngày bắt đầu
                  </div>
                  <div className="py-2">
                    <input
                      type="date"
                      min="2023-03-06"
                      // className="w-100 py-2 px-2"
                      // placeholder="Nhập email"
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </Col>
          <Col sm={12} md={2}></Col>
        </Row>
      </div>
      <div className="register-post-container ">
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

export default RePost;
