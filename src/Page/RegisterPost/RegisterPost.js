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
  Image,
} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

import { useState, useEffect } from "react";
// import paymentApi from "../../api/paymentApi";
import categoryApi from "../../api/categoryApi";
import registerPost from "../../api/registerPostApi";
import paymentApi from "../../api/paymentApi";
import { useNavigate } from "react-router-dom";
function RegisterPost() {
  // Chọn loại BĐS
  // Mã thẻ : 9704198526191432198
  const navigate = useNavigate();
  const id = Date.now().toString();
  const status1 = "xuat ban";
  const [status, setStatus] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [listCategory, setListCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [listProvinces, setListProvinces] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [nameProvince, setNameProvince] = useState("");
  const [nameDistrict, setNameDistrict] = useState("");
  const [nameWards, setNameWards] = useState("");
  const [type, setType] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cost, setCost] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [floor, setFloor] = useState("");
  const [direction, setDirection] = useState("");
  const [balconyDirection, setBalconyDirection] = useState("");
  const [facade, setFacade] = useState("");
  const [roadWidth, setRoadWidth] = useState("");
  const [interior, setInterior] = useState("");
  // const [address, setAddress] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [totalUsableArea, setTotalUsableArea] = useState("");
  const [img, setImg] = useState([]);
  // const [realEasteId, setRealEasteId] = useState("");
  const [acreage, setAcreage] = useState("");
  const [price, setPrice] = useState("");
  const [district, setDistrict] = useState("");
  const resultTitle = title.replace(",", "");

  const handleRegisterPost = async () => {
    const formDaTa = new FormData();
    formDaTa.append("content", content);
    formDaTa.append("title", title);
    formDaTa.append("expiration", expiration);
    formDaTa.append("type", type);
    formDaTa.append("thumbnail", thumbnail);
    formDaTa.append("status", "xuat ban");
    formDaTa.append("category", categoryId);
    formDaTa.append("id", id);
    const formDaTa2 = new FormData();
    Array.from(img).forEach((image) => {
      formDaTa2.append("images", image);
    });
    formDaTa2.append("acreage", acreage);
    formDaTa2.append("price", price);
    formDaTa2.append("number_bedrooms", bedroom);
    formDaTa2.append("number_bathrooms", bathroom);
    formDaTa2.append("number_floors", floor);
    formDaTa2.append("direction", direction);
    formDaTa2.append("balcony_direction", balconyDirection);
    formDaTa2.append("facade", facade);
    formDaTa2.append("road_width", roadWidth);
    formDaTa2.append("interior", interior);
    formDaTa2.append("address", address);
    formDaTa2.append("length", length);
    formDaTa2.append("width", width);
    formDaTa2.append("total_usable_area", totalUsableArea);
    formDaTa2.append("ward", nameWards);
    formDaTa2.append("district", nameDistrict);
    formDaTa2.append("city", nameProvince);
    formDaTa2.append("status", status);

    const formDaTa3 = new FormData();
    formDaTa3.append("amount", totalCost);
    formDaTa3.append("bankCode", "");
    formDaTa3.append("language", "vn");
    try {
      const res = await registerPost.create(formDaTa);
      if (res.data.id) {
        formDaTa3.append("real_easte_id", res.data.id);
        try {
          const res3 = await paymentApi.getPayment(formDaTa3);
          if (res3.data) {
            window.open(res3.data);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (res.data.slug) {
        formDaTa2.append("real_easte_id", res.data.slug);
        try {
          const res2 = await registerPost.createInfo(formDaTa2);
        } catch (error) {
          console.log(error);
        }
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleCategory = (value) => {
  //   setCategory(value);
  // };

  //Lấy danh sách tỉnh thành
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
  const [province, setProvince] = useState("");
  const handleSelectProvince = (eventKey) => {
    {
      setProvince(eventKey);
      setNameDistrict("");
      setDistrict("");
      setNameWards("");
      setWards("");
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
  const handleSelectDistrict = (eventKey) => {
    {
      setDistrict(eventKey);
      setNameWards("");
      setWards("");
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

  const [totalCost, setTotalCost] = useState();

  const handleType = (value) => {
    switch (value) {
      case 1:
        return setCost(2000), setType(1);
      case 2:
        return setCost(10000), setType(2);
      case 3:
        return setCost(20000), setType(3);
      case 4:
        return setCost(50000), setType(4);
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
  useEffect(() => {
    getAllCategory();
  }, []);
  const getAllCategory = async () => {
    try {
      const res = await categoryApi.getAll();
      setListCategory(res.data);
      setCategoryName(listCategory[0].name);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleCategoryName = (value) => {
    const index = value.indexOf("-");
    const nameCat = value.slice(0, index);
    const idCat = value.slice(index + 1);
    setCategoryName(nameCat);
    setCategoryId(idCat);
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
                  <ToggleButtonGroup
                    className="w-100"
                    type="radio"
                    name="sdasd"
                    defaultValue={11}
                    // onChange={handleCategory}
                  >
                    <ToggleButton
                      id="11"
                      value={true}
                      variant="light"
                      className="w-50"
                    >
                      Nhà đất bán
                    </ToggleButton>

                    <ToggleButton
                      id="12"
                      value={false}
                      variant="light"
                      className="w-50"
                    >
                      Nhà đất cho thuê
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="py-2">
                  <div className="py-2 register-post-sub-title">
                    Loại bất động sản<sup className="text-danger fs-7">*</sup>
                  </div>
                  <div>
                    <Dropdown onSelect={handleCategoryName}>
                      <DropdownToggle
                        variant="light"
                        className="w-100 text-start"
                      >
                        {categoryName}
                      </DropdownToggle>
                      <DropdownMenu className="w-100">
                        {listCategory.map((cat) => (
                          <DropdownItem eventKey={`${cat.name}-${cat.slug}`}>
                            {cat.name}
                          </DropdownItem>
                        ))}
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
                        {nameProvince ? nameProvince : "Tỉnh/Thành Phố"}
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
                        {nameDistrict ? nameDistrict : "Quận/Huyện"}
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
                        {nameWards ? nameWards : "Phường/Xã"}
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
                  <div className="py-2 register-post-sub-title">Địa chỉ</div>
                  <input
                    type="text"
                    className="w-100 py-2 px-2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
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
                      value={acreage}
                      onChange={(e) => setAcreage(e.target.value)}
                    />
                  </div>
                </div>
                <Row className="py-2">
                  <Col md={12} sm={12}>
                    <div className="py-2">
                      Mức giá<sup className="text-danger fs-7">*</sup>
                    </div>
                    <div className="py-2">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        placeholder="Nhập mức giá, VD: 12000000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </Col>
                  {/* <Col md={3} sm={12}>
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
                  </Col> */}
                </Row>
                <div className="py-2">
                  <div className="py-2">
                    Giấy tờ pháp lý<sup className="text-danger fs-7">*</sup>
                  </div>
                  <div className="py-2">
                    <input
                      type="text"
                      className="w-100 py-2 px-2"
                      placeholder="Nhập giấy tờ, VD: Sổ đỏ/ Sổ hồng"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>
                </div>

                <Row className="py-2">
                  <Col md={9} sm={12} className="d-flex align-items-center">
                    <div className=" d-flex align-items-center">
                      Số phòng ngủ<sup className="text-danger fs-7">*</sup>
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        // placeholder="Nhập mức giá, VD: 12000000"
                        value={bedroom}
                        onChange={(e) => setBedroom(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col md={9} sm={12} className="d-flex align-items-center">
                    <div className=" d-flex align-items-center">
                      Số phòng tắm<sup className="text-danger fs-7">*</sup>
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        // placeholder="Nhập mức giá, VD: 12000000"
                        value={bathroom}
                        onChange={(e) => setBathroom(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col md={9} sm={12} className="d-flex align-items-center">
                    <div className=" d-flex align-items-center">
                      Số tầng<sup className="text-danger fs-7">*</sup>
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        // placeholder="Nhập mức giá, VD: 12000000"
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col md={9} sm={12} className="d-flex align-items-center">
                    <div className=" d-flex align-items-center">
                      Hướng nhà<sup className="text-danger fs-7">*</sup>
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        // placeholder="Nhập mức giá, VD: 12000000"
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col md={9} sm={12} className="d-flex align-items-center">
                    <div className=" d-flex align-items-center">
                      Hướng ban công<sup className="text-danger fs-7">*</sup>
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        // placeholder="Nhập mức giá, VD: 12000000"
                        value={balconyDirection}
                        onChange={(e) => setBalconyDirection(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col md={9} sm={12} className="d-flex align-items-center">
                    <div className=" d-flex align-items-center">
                      Mặt tiền<sup className="text-danger fs-7">*</sup>
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        // placeholder="Nhập mức giá, VD: 12000000"
                        value={facade}
                        onChange={(e) => setFacade(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col md={9} sm={12} className="d-flex align-items-center">
                    <div className=" d-flex align-items-center">
                      Đường vào<sup className="text-danger fs-7">*</sup>
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        // placeholder="Nhập mức giá, VD: 12000000"
                        value={roadWidth}
                        onChange={(e) => setRoadWidth(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="py-2">
                  <Col md={9} sm={12} className="d-flex align-items-center">
                    <div className=" d-flex align-items-center">
                      Nội thất<sup className="text-danger fs-7">*</sup>
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        // placeholder="Nhập mức giá, VD: 12000000"
                        value={interior}
                        onChange={(e) => setInterior(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col md={9} sm={12} className="d-flex align-items-center">
                    <div className=" d-flex align-items-center">
                      Chiều dài<sup className="text-danger fs-7">*</sup>
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        // placeholder="Nhập mức giá, VD: 12000000"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col md={9} sm={12} className="d-flex align-items-center">
                    <div className=" d-flex align-items-center">
                      Chiều rộng<sup className="text-danger fs-7">*</sup>
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        // placeholder="Nhập mức giá, VD: 12000000"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col md={9} sm={12} className="d-flex align-items-center">
                    <div className=" d-flex align-items-center">
                      Diện tích sử dụng<sup className="text-danger fs-7">*</sup>
                    </div>
                  </Col>
                  <Col md={3} sm={12}>
                    <div className="">
                      <input
                        type="text"
                        className="w-100 py-2 px-2"
                        // placeholder="Nhập mức giá, VD: 12000000"
                        value={totalUsableArea}
                        onChange={(e) => setTotalUsableArea(e.target.value)}
                      />
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
                <div className="fs-3 register-post-title">Hình ảnh</div>
                <div className="py-2">
                  <div className="py-2 register-post-sub-title">
                    Chọn ảnh chính<sup className="text-danger fs-7">*</sup>
                  </div>
                  <div className="py-2">
                    <Form.Group className="mb-3">
                      {/* <Form.Label>Multiple files input example</Form.Label> */}
                      <Form.Control
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        placeholder="Chọn ảnh"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                      />
                      {thumbnail && (
                        <>
                          <Row>
                            {
                              <Col lg={3} md={3} sm={3}>
                                <Image
                                  // roundedCircle={true}
                                  height={120}
                                  src={URL.createObjectURL(thumbnail)}
                                  className="pt-3  w-100"
                                ></Image>
                              </Col>
                            }
                          </Row>
                        </>
                      )}
                    </Form.Group>
                  </div>
                  <div className="py-2 register-post-sub-title">
                    Chọn ảnh phụ<sup className="text-danger fs-7">*</sup>
                  </div>
                  <div className="py-2">
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      {/* <Form.Label>Multiple files input example</Form.Label> */}
                      <Form.Control
                        type="file"
                        multiple
                        name="images"
                        accept="image/*"
                        placeholder="Chọn ảnh"
                        onChange={(e) => setImg(e.target.files)}
                      />
                      {img && (
                        <>
                          <Row>
                            {Array.from(img).map((i) => (
                              <Col lg={3} md={3} sm={3}>
                                <Image
                                  // roundedCircle={true}
                                  height={120}
                                  src={URL.createObjectURL(i)}
                                  className="pt-3  w-100"
                                ></Image>
                              </Col>
                            ))}
                          </Row>
                        </>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} md={2}></Col>
        </Row>
      </div>
      {/* <div className="register-post-container ">
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
      </div> */}
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
                        onChange={handleType}
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
                    <div>{type ? type : ""}</div>
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
                    <div>{expiration ? expiration : ""}</div>
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
                <div className="">
                  <Button
                    type="submit"
                    className="fs-4 bg-danger "
                    onClick={handleRegisterPost}
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

export default RegisterPost;
