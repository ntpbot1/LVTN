import "./RegisterPost.scss";
import {
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  FloatingLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

import { useState, useEffect, forwardRef } from "react";
import provinceApi from "../../api/provinceApi";
import { text } from "@fortawesome/fontawesome-svg-core";
function RegisterPost() {
  //Chọn loại BĐS
  const [loaiBDS, setLoaiBDS] = useState("VD: Nhà riêng");
  const handleSelectLoaiBDS = (eventKey) => {
    switch (eventKey) {
      case "l1":
        setLoaiBDS("Bán căn hộ chung cư");
        break;
      case "l2":
        setLoaiBDS("Bán nhà riêng");
        break;
      case "l3":
        setLoaiBDS("Bán đất");
        break;
      default:
        break;
    }
  };
  //Lấy danh sách tỉnh thành
  const [listProvinces, setListProvinces] = useState([]);
  useEffect(() => {
    getAllProvince();
  }, []);
  const getAllProvince = async () => {
    try {
      const req = "https://provinces.open-api.vn/api/?depth=2";
      const res = await fetch(req);
      const resJSON = await res.json();
      setListProvinces(resJSON);
    } catch (err) {
      console.log("err", err);
    }
  };
  const [nameProvince, setNameProvince] = useState("Tỉnh/Thành Phố");
  const [province, setProvince] = useState("");
  const handleSelectProvince = (eventKey) => {
    {
      setProvince(eventKey);
      {
        listProvinces.forEach((element) => {
          if (element.code == eventKey) {
            setNameProvince(element.name);
          }
        });
      }
    }
  };
  //Lấy danh sách quận huyện

  const [listDistrict, setListDistrict] = useState([]);
  useEffect(() => {
    getAllDistrict();
  }, [province]);
  const getAllDistrict = async () => {
    try {
      if (!isNaN(province)) {
        const req = `https://provinces.open-api.vn/api/p/${province}?depth=2`;
        const res = await fetch(req);
        const resJSON = await res.json();
        const { districts } = resJSON;
        setListDistrict(districts);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const [nameDistrict, setNameDistrict] = useState("Quận/Huyện");
  const [district, setDistrict] = useState("");
  const handleSelectDistrict = (eventKey) => {
    {
      setDistrict(eventKey);
      {
        listDistrict.forEach((element) => {
          if (element.code == eventKey) {
            setNameDistrict(element.name);
          }
        });
      }
    }
  };
  //Lấy danh sách phường xã

  const [listWards, setListWards] = useState([]);
  useEffect(() => {
    getAllWards();
  }, [district]);
  const getAllWards = async () => {
    try {
      if (!isNaN(district)) {
        const req = `https://provinces.open-api.vn/api/d/${district}?depth=2`;
        const res = await fetch(req);
        const resJSON = await res.json();
        const { wards } = resJSON;
        setListWards(wards);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const [nameWards, setNameWards] = useState("Phường/Xã");
  const [wards, setWards] = useState("");
  const handleSelectWards = (eventKey) => {
    {
      setWards(eventKey);
      {
        listWards.forEach((element) => {
          if (element.code == eventKey) {
            setNameWards(element.name);
          }
        });
      }
    }
  };
  //Chọn loại đơn vị giá bán
  const [loaiDV, setLoaiDV] = useState("VND");
  const handleSelectLoaiDV = (eventKey) => {
    switch (eventKey) {
      case "l1":
        setLoaiDV("VND");
        break;
      case "l2":
        setLoaiDV(`Giá / m2`);
        break;
      case "l3":
        setLoaiDV("Thỏa thuận");
        break;
      default:
        break;
    }
  };
  // Chọn loại tin
  const [cost, setCost] = useState();
  const [loaiTin, setloaiTin] = useState();
  const [day, setDay] = useState();

  const [totalCost, setTotalCost] = useState();

  const handleLoaiTin = (value) => {
    switch (value) {
      case 1:
        return setCost(2000), setloaiTin("Tin thường");
      case 2:
        return setCost(10000), setloaiTin("Tin vip 1");
      case 3:
        return setCost(20000), setloaiTin("Tin vip 2");
      case 4:
        return setCost(50000), setloaiTin("Tin vip 3");
      default:
        break;
    }
  };
  const handleMucGia = (value) => {
    switch (value) {
      case 5:
        return setTotalCost(cost * 7), setDay("7 ngày");
      case 6:
        return setTotalCost((cost - cost * 0.03) * 10), setDay("10 ngày");
      case 7:
        return setTotalCost((cost - cost * 0.05) * 15), setDay("15 ngày");
      case 8:
        return setTotalCost((cost - cost * 0.1) * 30), setDay("30 ngày");
      default:
        break;
    }
  };
  return (
    <>
      <div className="register-post-container ">
        <Row>
          <Col sm={12} md={2}></Col>
          <Col sm={12} md={8}>
            <div className="mt-4 mb-2 shadow-sm rounded register-post-content">
              <div className="px-4  py-4 ">
                <div className="fs-3 register-post-title">Thông tin cơ bản</div>
                <div className="py-2">
                  <Button
                    className="w-50 border  form-submit"
                    variant="light"
                    type="submit"
                    active={true}
                  >
                    Bán
                  </Button>
                  <Button
                    className="w-50 border  form-submit"
                    variant="light"
                    type="submit"
                  >
                    Cho thuê
                  </Button>
                </div>
                <div className="py-2">
                  <div className="py-2 register-post-sub-title">
                    Loại bất động sản<sup className="text-danger fs-7">*</sup>
                  </div>
                  <div>
                    <Dropdown onSelect={handleSelectLoaiBDS}>
                      <DropdownToggle
                        variant="light"
                        className="w-100 text-start"
                      >
                        {loaiBDS}
                      </DropdownToggle>
                      <DropdownMenu className="w-100">
                        <DropdownItem eventKey={"l1"}>
                          Bán căn hộ chung cư
                        </DropdownItem>
                        <DropdownItem eventKey={"l2"}>
                          Bán căn nhà riêng
                        </DropdownItem>
                        <DropdownItem eventKey={"l3"}>Bán đất</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <Row className="py-2">
                  <Col md={4} sm={12} className="py-2">
                    <div className="py-2 register-post-sub-title">
                      Tỉnh, thành phố<sup className="text-danger fs-7">*</sup>
                    </div>

                    {/* <select>
                      {listProvinces.map((item, index) => {
                        return (
                          <option value={index} className="register-province">
                            {item.name}
                          </option>
                        );
                      })}
                    </select> */}
                    <Dropdown onSelect={handleSelectProvince}>
                      <DropdownToggle
                        variant="light"
                        className="w-100 text-start"
                      >
                        {nameProvince}
                      </DropdownToggle>
                      <DropdownMenu className="w-100">
                        {listProvinces.map((item, index) => {
                          return (
                            <DropdownItem eventKey={item.code}>
                              {item.name}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </Dropdown>
                  </Col>

                  <Col md={4} sm={12} className="py-2">
                    <div className="py-2 register-post-sub-title">
                      Quận, huyện<sup className="text-danger fs-7">*</sup>
                    </div>

                    <Dropdown onSelect={handleSelectDistrict}>
                      <DropdownToggle
                        variant="light"
                        className="w-100 text-start"
                      >
                        {nameDistrict}
                      </DropdownToggle>
                      <DropdownMenu className="w-100">
                        {listDistrict &&
                          listDistrict.length > 0 &&
                          listDistrict.map((item, index) => {
                            return (
                              <DropdownItem eventKey={item.code}>
                                {item.name}
                              </DropdownItem>
                            );
                          })}
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                  <Col md={4} sm={12} className="py-2">
                    <div className="py-2 register-post-sub-title">
                      Phường, xã<sup className="text-danger fs-7">*</sup>
                    </div>

                    <Dropdown onSelect={handleSelectWards}>
                      <DropdownToggle
                        variant="light"
                        className="w-100 text-start"
                      >
                        {nameWards}
                      </DropdownToggle>
                      <DropdownMenu className="w-100">
                        {listWards &&
                          listWards.length > 0 &&
                          listWards.map((item, index) => {
                            return (
                              <DropdownItem eventKey={item.code}>
                                {item.name}
                              </DropdownItem>
                            );
                          })}
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                </Row>
                <div>
                  <div className="py-2 register-post-sub-title">
                    Địa chỉ hiển thị trên tin đăng
                  </div>
                  <input
                    type="text"
                    className="w-100 py-2 px-2"
                    value={
                      nameWards + ", " + nameDistrict + ", " + nameProvince
                    }
                  />
                </div>
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
            <div className="mb-2 shadow-sm rounded register-post-content">
              <div className="px-4  py-4 ">
                <div className="fs-3 register-post-title">
                  Thông tin bài viết
                </div>
                <div className="py-2">
                  <div className="py-2 register-post-sub-title">
                    Tiêu đề<sup className="text-danger fs-7">*</sup>
                  </div>
                  <div className="py-2">
                    <FloatingLabel
                      controlId="floatingTextarea"

                      //   label="Comments"
                      //   className="mb-3"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="py-2">
                  <div className="py-2 register-post-sub-title">
                    Mô tả<sup className="text-danger fs-7">*</sup>
                  </div>
                  <div className="py-2">
                    <FloatingLabel
                      controlId="floatingTextarea2"
                      //   label="Comments"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: "100px" }}
                      />
                    </FloatingLabel>
                  </div>
                </div>
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
            <div className="mb-2 shadow-sm rounded register-post-content">
              <div className="px-4  py-4 ">
                <div className="fs-3 register-post-title">
                  Thông tin bất động sản
                </div>
                <div className="py-2">
                  <div className="py-2">
                    Diện tích<sup className="text-danger fs-7">*</sup>
                  </div>
                  <div className="py-2">
                    <input
                      type="text"
                      className="w-100 py-2 px-2"
                      placeholder="Nhập diện tích, VD: 80"
                    />
                  </div>
                </div>
                <Row className="py-2">
                  <Col md={9} sm={12}>
                    <div className="py-2">
                      Mức giá<sup className="text-danger fs-7">*</sup>
                    </div>
                    <div className="py-2">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        placeholder="Nhập mức giá, VD: 12000000"
                      />
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="py-2 register-post-sub-title">Đơn vị</div>
                    <div className="py-2">
                      <Dropdown onSelect={handleSelectLoaiDV}>
                        <DropdownToggle
                          variant="light"
                          className="w-100 text-start py-2"
                        >
                          {loaiDV}
                        </DropdownToggle>
                        <DropdownMenu className="w-100">
                          <DropdownItem eventKey={"l1"}>VND</DropdownItem>
                          <DropdownItem eventKey={"l2"}>
                            Giá / m<sup>2</sup>
                          </DropdownItem>
                          <DropdownItem eventKey={"l3"}>
                            Thỏa thuận
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </Col>
                </Row>
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
                <div className="fs-3 register-post-title">
                  Thông tin liên hệ
                </div>
                <div className="py-2">
                  <div className="py-2 register-post-sub-title">
                    Tên liên hệ<sup className="text-danger fs-7">*</sup>
                  </div>
                  <div className="py-2">
                    <input
                      type="text"
                      className="w-100 py-2 px-2"
                      placeholder="Nhập tên"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <div className="py-2 register-post-sub-title">
                    Số điện thoại <sup className="text-danger fs-7">*</sup>
                  </div>
                  <div className="py-2">
                    <input
                      type="text"
                      className="w-100 py-2 px-2"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <div className="py-2 register-post-sub-title">Địa chỉ</div>
                  <div className="py-2">
                    <input
                      type="text"
                      className="w-100 py-2 px-2"
                      placeholder="Nhập địa chỉ"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <div className="py-2 register-post-sub-title">Email</div>
                  <div className="py-2">
                    <input
                      type="text"
                      className="w-100 py-2 px-2"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>
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
                        onChange={handleLoaiTin}
                      >
                        <ToggleButton
                          id="1"
                          value={1}
                          variant="light"
                          className="search-button"
                        >
                          <div>Tin thường</div>
                          <div>2000đ / ngày</div>
                        </ToggleButton>

                        <ToggleButton
                          id="2"
                          value={2}
                          variant="light"
                          className="search-button"
                        >
                          <div>Tin vip 1</div>
                          <div>10000đ / ngày</div>
                        </ToggleButton>

                        <ToggleButton
                          id="3"
                          value={3}
                          variant="light"
                          className="search-button"
                        >
                          <div>Tin vip 2</div>
                          <div>20000đ / ngày</div>
                        </ToggleButton>

                        <ToggleButton
                          id="4"
                          value={4}
                          variant="light"
                          className="search-button"
                        >
                          <div>Tin vip 3</div>
                          <div>50000đ / ngày</div>
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
                          <div>Phí : {cost ? cost * 7 : ""}</div>
                        </ToggleButton>

                        <ToggleButton
                          id="6"
                          value={6}
                          variant="light"
                          className="search-button"
                        >
                          <div>10 ngày</div>
                          <div>
                            Phí : {cost ? (cost - cost * 0.03) * 10 : ""}
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
                            Phí : {cost ? (cost - cost * 0.05) * 15 : ""}
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
                            Phí : {cost ? (cost - cost * 0.1) * 30 : ""}
                          </div>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Row>
                  </div>
                </div>
                <div className="py-2">
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
                </div>
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
                <div className="fs-3 register-post-title">Thanh toán</div>
                <div className="py-2 ">
                  <div className="py-2 register-post-sub-title d-flex justify-content-between">
                    <div>Loại tin</div>
                    <div>{loaiTin ? loaiTin : ""}</div>
                  </div>
                </div>
                <div className="py-2 ">
                  <div className="py-2 register-post-sub-title d-flex justify-content-between">
                    <div>Đơn giá / ngày</div>
                    <div>{cost ? cost : ""}</div>
                  </div>
                </div>
                <div className="py-2 ">
                  <div className="py-2 register-post-sub-title d-flex justify-content-between">
                    <div>Thời gian đăng tin</div>
                    <div>{day ? day : ""}</div>
                  </div>
                </div>
                <div className="py-2 ">
                  <div className="py-2 register-post-sub-title d-flex justify-content-between">
                    <div>Phí đăng</div>
                    <div>{totalCost ? totalCost : ""}</div>
                  </div>
                </div>
                <div className="py-2 ">
                  <div className="py-2 register-post-sub-title d-flex justify-content-between">
                    <div>Tổng tiền</div>
                    <div>{totalCost ? totalCost : ""}</div>
                  </div>
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

export default RegisterPost;
