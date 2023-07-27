import "./ChangeProperty.scss";
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
  FormGroup,
} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useState, useEffect } from "react";
// import paymentApi from "../../api/paymentApi";
import categoryApi from "../../api/categoryApi";
import registerPost from "../../api/registerPostApi";
import paymentApi from "../../api/paymentApi";
import { useNavigate, useParams } from "react-router-dom";
import propertyApi from "../../api/propertyApi";

function ChangProperty() {
  // Chọn loại BĐS
  // Mã thẻ : 9704198526191432198
  const {
    idInfo,
    p,
    d,
    w,
    a,
    ac,
    pr,
    s,
    i,
    di,
    bd,
    bedroom,
    bathroom,
    floor,
    facade,
    roadWidth,
    length,
    width,
    usableArea,
  } = useParams();
  if (s.indexOf("-") > -1) {
    s.replace("-", "/");
  }
  const vt = a.indexOf(",");
  const address = a.slice(0, vt);
  const navigate = useNavigate();
  const id = Date.now().toString();
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const [status, setStatus] = useState(s);
  const [listCategory, setListCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [listProvinces, setListProvinces] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [nameProvince, setNameProvince] = useState(p);
  const [nameDistrict, setNameDistrict] = useState(d);
  const [nameWards, setNameWards] = useState(w);
  const [type, setType] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cost, setCost] = useState("");
  const [direction, setDirection] = useState(di);
  const [balconyDirection, setBalconyDirection] = useState(bd);
  const [interior, setInterior] = useState(i);
  // const [address, setAddress] = useState("");

  // const [realEasteId, setRealEasteId] = useState("");

  const [district, setDistrict] = useState("");

  // const handleCategory = (value) => {
  //   if (value === true) {
  //     setCategory(true);
  //     setListCategory2(
  //       listCategory.filter((e) => {
  //         return e.type === true;
  //       })
  //     );
  //   } else if (value === false) {
  //     setCategory(false);
  //     setListCategory2(
  //       listCategory.filter((e) => {
  //         return e.type === false;
  //       })
  //     );
  //   }
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
  // useEffect(() => {
  //   getAllCategory();
  // }, []);
  // const getAllCategory = async () => {
  //   try {
  //     const res = await categoryApi.getAll();
  //     setListCategory(res.data);
  //     setListCategory2(
  //       res.data.filter((e) => {
  //         return e.type === true;
  //       })
  //     );
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };
  // const handleCategoryName = (value) => {
  //   const index = value.indexOf("-");
  //   const nameCat = value.slice(0, index);
  //   const idCat = value.slice(index + 1);
  //   setCategoryName(nameCat);
  //   setCategoryId(idCat);
  // };
  const handleDirection = (value) => {
    switch (value) {
      case "1":
        setDirection("Đông");
        break;
      case "2":
        setDirection("Tây");
        break;
      case "3":
        setDirection("Nam");
        break;
      case "4":
        setDirection("Bắc");
        break;
      case "5":
        setDirection("Đông Bắc");
        break;
      case "6":
        setDirection("Tây Bắc");
        break;
      case "7":
        setDirection("Tây Nam");
        break;
      case "8":
        setDirection("Đông Nam");
        break;
      default:
        break;
    }
  };
  const handleBalconyDirection = (value) => {
    switch (value) {
      case "1":
        setBalconyDirection("Đông");
        break;
      case "2":
        setBalconyDirection("Tây");
        break;
      case "3":
        setBalconyDirection("Nam");
        break;
      case "4":
        setBalconyDirection("Bắc");
        break;
      case "5":
        setBalconyDirection("Đông Bắc");
        break;
      case "6":
        setBalconyDirection("Tây Bắc");
        break;
      case "7":
        setBalconyDirection("Tây Nam");
        break;
      case "8":
        setBalconyDirection("Đông Nam");
        break;
      default:
        break;
    }
  };
  const handleInterior = (value) => {
    switch (value) {
      case "1":
        setInterior("Đầy đủ");
        break;
      case "2":
        setInterior("Cơ bản");
        break;
      case "3":
        setInterior("Không nội thất");
        break;

      default:
        break;
    }
  };
  const handleStatus = (value) => {
    switch (value) {
      case "1":
        setStatus("Sổ đỏ/ Sổ hồng");
        break;
      case "2":
        setStatus("Hợp đồng mua bán");
        break;
      case "3":
        setStatus("Đang chờ sổ");
        break;

      default:
        break;
    }
  };
  const formik = useFormik({
    initialValues: {
      address: address,
      acreage: ac,
      // title: "",
      // content: "",
      price: pr,
      floor: floor,
      bedroom: bedroom,
      bathroom: bathroom,
      facade: facade,
      roadWidth: roadWidth,
      length: length,
      width: width,
      totalUsableArea: usableArea,
      // categoryName: categoryName,
      // thumbnail: "",
      // img: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Cần nhập địa chỉ"),
      // title: Yup.string().required("Cần nhập tiêu đề"),
      // content: Yup.string().required("Cần nhập mô tả"),
      price: Yup.number()
        .label("Phải là số")
        .integer("Phải là số nguyên")
        .min(999, "Tối thiểu là 999")
        .max(999999999999, "Tối đa là 999.999.999.999")
        // .moreThan(0, "Không nhập số âm")
        .required("Cần nhập mức giá"),
      acreage: Yup.number()
        .label("Phải là số")
        .integer("Phải là số nguyên")
        .min(1, "Tối thiểu là 1")
        .max(9999, "Tối đa là 9999")
        // .moreThan(-1, "Không nhập số âm")
        .required("Cần nhập diện tích"),
      floor: Yup.number()
        .label("Phải là số")
        .integer("Phải là số nguyên")
        .min(1, "Tối thiểu là 1")
        .max(20, "Tối đa là 20")
        .required("Cần nhập số tầng"),
      bedroom: Yup.number()
        .label("Phải là số")
        .integer("Phải là số nguyên")
        .min(1, "Tối thiểu là 1")
        .max(20, "Tối đa là 20")
        .required("Cần nhập số phòng ngủ"),
      bathroom: Yup.number()
        .label("Phải là số")
        .integer("Phải là số nguyên")
        .min(1, "Tối thiểu là 1")
        .max(20, "Tối đa là 20")
        .required("Cần nhập số phòng tắm"),
      facade: Yup.number()
        .label("Phải là số")
        .integer("Phải là số nguyên")
        .min(1, "Tối thiểu là 1")
        .max(20, "Tối đa là 20")
        .required("Cần nhập mặt tiền"),
      roadWidth: Yup.number()
        .label("Phải là số")
        .integer("Phải là số nguyên")
        .min(1, "Tối thiểu là 1")
        .max(20, "Tối đa là 20")
        .required("Cần nhập đường vào"),
      length: Yup.number()
        .label("Phải là số")
        .integer("Phải là số nguyên")
        .min(1, "Tối thiểu là 1")
        .max(50, "Tối đa là 20")
        .required("Cần nhập chiều dài"),
      width: Yup.number()
        .label("Phải là số")
        .integer("Phải là số nguyên")
        .min(1, "Tối thiểu là 1")
        .max(50, "Tối đa là 20")
        .required("Cần nhập chiều rộng"),
      totalUsableArea: Yup.number()
        .label("Phải là số")
        .integer("Phải là số nguyên")
        .min(1, "Tối thiểu là 1")
        .max(200, "Tối đa là 200")
        .required("Cần nhập diện tích sử dụng"),
      // categoryName: Yup.string().required("Cần nhập "),
      // thumbnail: Yup.mixed().required("Chưa chọn ảnh chính"),
      // img: Yup.mixed().required("Chưa chọn ảnh phụ"),
    }),
    onSubmit: async (values) => {
      // setMessage("");
      const formDaTa2 = new FormData();
      formDaTa2.append("acreage", parseInt(values.acreage));
      formDaTa2.append("price", parseInt(values.price));
      formDaTa2.append("number_bedrooms", parseInt(values.bedroom));
      formDaTa2.append("number_bathrooms", parseInt(values.bathroom));
      formDaTa2.append("number_floors", parseInt(values.floor));
      formDaTa2.append("direction", direction);
      formDaTa2.append("balcony_direction", balconyDirection);
      formDaTa2.append("facade", parseInt(values.facade));
      formDaTa2.append("road_width", parseInt(values.roadWidth));
      formDaTa2.append("interior", interior);
      formDaTa2.append("address", values.address);
      formDaTa2.append("length", parseInt(values.length));
      formDaTa2.append("width", parseInt(values.width));
      formDaTa2.append("total_usable_area", parseInt(values.totalUsableArea));
      formDaTa2.append("ward", nameWards);
      formDaTa2.append("district", nameDistrict);
      formDaTa2.append("city", nameProvince);
      formDaTa2.append("status", status);
      try {
        const res = propertyApi.editInfoNew(idInfo, formDaTa2);
        // navigate("/quan-ly-tin-dang");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <div className="register-post-container ">
          <Row>
            <Col sm={12} md={2}></Col>
            <Col sm={12} md={8}>
              <div className="mt-4 mb-2 shadow-sm rounded register-post-content">
                <div className="px-4  py-4 ">
                  <div className="fs-3 register-post-title">
                    Thông tin cơ bản
                  </div>
                  {/* <div className="py-2">
                    <ToggleButtonGroup
                      className="w-100"
                      type="radio"
                      name="sdasd"
                      defaultValue={11}
                      onChange={handleCategory}
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
                      <Form.Group>
                        <Dropdown
                      
                          onSelect={handleCategoryName}
               
                        >
                          <DropdownToggle
                            variant="light"
                            className="w-100 text-start"
                          >
                            {categoryName}
                          </DropdownToggle>
                          <DropdownMenu className="w-100">
                            {listCategory2 &&
                              listCategory2.map((cat) => (
                                <DropdownItem
                                  eventKey={`${cat.name}-${cat.slug}`}
                                >
                                  {cat.name}
                                </DropdownItem>
                              ))}
                          </DropdownMenu>
                        </Dropdown>
                      </Form.Group>
                    </div>
                  </div> */}
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
                      <Dropdown
                        onSelect={handleSelectProvince}
                        className="dropdown-province"
                      >
                        <DropdownToggle
                          variant="light"
                          className="w-100 text-start"
                        >
                          {nameProvince ? nameProvince : "Tỉnh/Thành Phố"}
                        </DropdownToggle>
                        <DropdownMenu className="w-100 dropdown-menu-province">
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

                      <Dropdown
                        onSelect={handleSelectDistrict}
                        className="dropdown-province"
                      >
                        <DropdownToggle
                          variant="light"
                          className="w-100 text-start"
                        >
                          {nameDistrict ? nameDistrict : "Quận/Huyện"}
                        </DropdownToggle>
                        <DropdownMenu className="w-100 dropdown-menu-province">
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

                      <Dropdown
                        onSelect={handleSelectWards}
                        className="dropdown-province"
                      >
                        <DropdownToggle
                          variant="light"
                          className="w-100 text-start"
                        >
                          {nameWards ? nameWards : "Phường/Xã"}
                        </DropdownToggle>
                        <DropdownMenu className="w-100 dropdown-menu-province">
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
                  <Form.Group>
                    <Form.Label className="py-2 register-post-sub-title">
                      Địa chỉ
                    </Form.Label>
                    <Form.Control
                      name="address"
                      type="input"
                      className="w-100 py-2 px-2"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.address}
                    />
                    {formik.errors.address && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.address}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
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
              <div className="mb-2 shadow-sm rounded register-post-content">
                <div className="px-4  py-4 ">
                  <div className="fs-3 register-post-title">
                    Thông tin bài viết
                  </div>
                  <Form.Group className="py-2">
                    <Form.Label className="py-2 register-post-sub-title">
                      Tiêu đề<sup className="text-danger fs-7">*</sup>
                    </Form.Label>
                    <div className="py-2">
                      <FloatingLabel
                        controlId="floatingTextarea"
                      >
                        <Form.Control
                          name="title"
                          as="textarea"
                          placeholder="Leave a comment here"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.title}
                        />
                        {formik.errors.title && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.title}
                          </Form.Control.Feedback>
                        )}
                      </FloatingLabel>
                    </div>
                  </Form.Group>
                  <Form.Group className="py-2">
                    <Form.Label className="py-2 register-post-sub-title">
                      Mô tả<sup className="text-danger fs-7">*</sup>
                    </Form.Label>
                    <div className="py-2">
                      <FloatingLabel
                        controlId="floatingTextarea2"
                        //   label="Comments"
                      >
                        <Form.Control
                          name="content"
                          as="textarea"
                          placeholder="Leave a comment here"
                          value={formik.values.content}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.content}
                          style={{ height: "100px" }}
                        />
                        {formik.errors.content && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.content}
                          </Form.Control.Feedback>
                        )}
                      </FloatingLabel>
                    </div>
                  </Form.Group>
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
              <div className="mb-2 shadow-sm rounded register-post-content">
                <div className="px-4  py-4 ">
                  <div className="fs-3 register-post-title">
                    Thông tin bất động sản
                  </div>
                  <Form.Group className="py-2">
                    <Form.Label className="py-2">
                      Diện tích<sup className="text-danger fs-7">*</sup>
                    </Form.Label>
                    <Form.Control
                      name="acreage"
                      type="input"
                      className="w-100 py-2 px-2"
                      placeholder="Nhập diện tích, VD: 80"
                      value={formik.values.acreage}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.acreage}
                    />

                    {formik.errors.acreage && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.acreage}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Row className="py-2">
                    <Form.Group md={12} sm={12}>
                      <Form.Label className="py-2">
                        Mức giá<sup className="text-danger fs-7">*</sup>
                      </Form.Label>

                      <Form.Control
                        name="price"
                        type="text"
                        className="w-100 py-2 px-2"
                        placeholder="Nhập mức giá, VD: 12000000"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.price}
                      />
                      {formik.errors.price && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.price}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Row>
                  <div className="py-2">
                    <div className="py-2">
                      Giấy tờ pháp lý<sup className="text-danger fs-7">*</sup>
                    </div>
                    <div className="py-2">
                      <div className="">
                        <div className="">
                          <Dropdown
                            onSelect={handleStatus}
                            className="border border-secondary py-1"
                            style={{ height: "43px" }}
                          >
                            <DropdownToggle
                              variant="light"
                              className="w-100 text-start d-flex align-items-center justify-content-between bg-transparent register-direction"
                            >
                              {status ? status : "Chọn"}
                            </DropdownToggle>
                            <DropdownMenu className="w-100">
                              <DropdownItem eventKey={"1"}>
                                Sổ đỏ/ Sổ hồng
                              </DropdownItem>
                              <DropdownItem eventKey={"2"}>
                                Hợp đồng mua bán
                              </DropdownItem>
                              <DropdownItem eventKey={"3"}>
                                Đang chờ sổ
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Row className="py-2">
                    <Row className="d-flex align-items-center">
                      <div className=" d-flex align-items-center">
                        Nội thất<sup className="text-danger fs-7">*</sup>
                      </div>
                    </Row>
                    <div>
                      <div className="">
                        <div className="pt-2">
                          <div className="">
                            <Dropdown
                              onSelect={handleInterior}
                              className="border border-secondary py-1"
                              style={{ height: "43px" }}
                            >
                              <DropdownToggle
                                variant="light"
                                className="w-100 text-start d-flex align-items-center justify-content-between bg-transparent register-direction"
                              >
                                {interior ? interior : "Chọn"}
                              </DropdownToggle>
                              <DropdownMenu className="w-100">
                                <DropdownItem eventKey={"1"}>
                                  Đầy đủ
                                </DropdownItem>
                                <DropdownItem eventKey={"2"}>
                                  Cơ bản
                                </DropdownItem>
                                <DropdownItem eventKey={"3"}>
                                  Không nội thất
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Row className="py-2">
                    <Row className="d-flex align-items-center">
                      <div className=" d-flex align-items-center">
                        Hướng nhà<sup className="text-danger fs-7">*</sup>
                      </div>
                    </Row>
                    <div className="pt-2">
                      <div className="">
                        <Dropdown
                          onSelect={handleDirection}
                          className="border border-secondary py-1"
                          style={{ height: "43px" }}
                        >
                          <DropdownToggle
                            variant="light"
                            className="w-100 text-start d-flex align-items-center justify-content-between bg-transparent register-direction"
                          >
                            {direction ? direction : "Chọn hướng"}
                          </DropdownToggle>
                          <DropdownMenu className="w-100">
                            <DropdownItem eventKey={"1"}>Đông</DropdownItem>
                            <DropdownItem eventKey={"2"}>Tây</DropdownItem>
                            <DropdownItem eventKey={"3"}>Nam</DropdownItem>
                            <DropdownItem eventKey={"4"}>Bắc</DropdownItem>
                            <DropdownItem eventKey={"5"}>Đông Bắc</DropdownItem>
                            <DropdownItem eventKey={"6"}>Tây Bắc</DropdownItem>
                            <DropdownItem eventKey={"7"}>Tây Nam</DropdownItem>
                            <DropdownItem eventKey={"8"}>Đông Nam</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                        {/* <input
                        type="text"
                        className="w-100 py-2 px-2"
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                      /> */}
                      </div>
                    </div>
                  </Row>
                  <Row className="py-2">
                    <Row className="d-flex align-items-center">
                      <div className=" d-flex align-items-center">
                        Hướng ban công<sup className="text-danger fs-7">*</sup>
                      </div>
                    </Row>
                    <div className="pt-2">
                      <div className="">
                        <Dropdown
                          onSelect={handleBalconyDirection}
                          className="border border-secondary py-1"
                          style={{ height: "43px" }}
                        >
                          <DropdownToggle
                            variant="light"
                            className="w-100 text-start d-flex align-items-center justify-content-between bg-transparent register-direction"
                          >
                            {balconyDirection ? balconyDirection : "Chọn hướng"}
                          </DropdownToggle>
                          <DropdownMenu className="w-100">
                            <DropdownItem eventKey={"1"}>Đông</DropdownItem>
                            <DropdownItem eventKey={"2"}>Tây</DropdownItem>
                            <DropdownItem eventKey={"3"}>Nam</DropdownItem>
                            <DropdownItem eventKey={"4"}>Bắc</DropdownItem>
                            <DropdownItem eventKey={"5"}>Đông Bắc</DropdownItem>
                            <DropdownItem eventKey={"6"}>Tây Bắc</DropdownItem>
                            <DropdownItem eventKey={"7"}>Tây Nam</DropdownItem>
                            <DropdownItem eventKey={"8"}>Đông Nam</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>
                  </Row>
                  <Row className="py-2">
                    <Col md={9} sm={12} className="d-flex align-items-center">
                      <div className=" d-flex align-items-center">
                        Số tầng<sup className="text-danger fs-7">*</sup>
                      </div>
                    </Col>
                    <Col md={3} sm={12}>
                      <Form.Group className="">
                        <Form.Control
                          type="text"
                          className="w-100 py-2 px-2"
                          name="floor"
                          value={formik.values.floor}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.floor}
                        />
                        {formik.errors.floor && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.floor}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col md={9} sm={12} className="d-flex align-items-center">
                      <div className=" d-flex align-items-center">
                        Số phòng ngủ<sup className="text-danger fs-7">*</sup>
                      </div>
                    </Col>
                    <Col md={3} sm={12}>
                      <Form.Group className="">
                        <Form.Control
                          type="text"
                          className="w-100 py-2 px-2"
                          name="bedroom"
                          value={formik.values.bedroom}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.bedroom}
                        />
                        {formik.errors.bedroom && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.bedroom}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col md={9} sm={12} className="d-flex align-items-center">
                      <div className=" d-flex align-items-center">
                        Số phòng tắm<sup className="text-danger fs-7">*</sup>
                      </div>
                    </Col>
                    <Col md={3} sm={12}>
                      <Form.Group className="">
                        <Form.Control
                          type="text"
                          className="w-100 py-2 px-2"
                          name="bathroom"
                          value={formik.values.bathroom}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.bathroom}
                        />
                        {formik.errors.bathroom && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.bathroom}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="py-2">
                    <Col md={9} sm={12} className="d-flex align-items-center">
                      <div className=" d-flex align-items-center">
                        Mặt tiền<sup className="text-danger fs-7">*</sup>
                      </div>
                    </Col>
                    <Col md={3} sm={12}>
                      <Form.Group className="">
                        <Form.Control
                          type="text"
                          className="w-100 py-2 px-2"
                          name="facade"
                          value={formik.values.facade}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.facade}
                        />
                        {formik.errors.facade && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.facade}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col md={9} sm={12} className="d-flex align-items-center">
                      <div className=" d-flex align-items-center">
                        Đường vào<sup className="text-danger fs-7">*</sup>
                      </div>
                    </Col>
                    <Col md={3} sm={12}>
                      <Form.Group className="">
                        <Form.Control
                          type="text"
                          className="w-100 py-2 px-2"
                          name="roadWidth"
                          value={formik.values.roadWidth}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.roadWidth}
                        />
                        {formik.errors.roadWidth && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.roadWidth}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="py-2">
                    <Col md={9} sm={12} className="d-flex align-items-center">
                      <div className=" d-flex align-items-center">
                        Chiều dài<sup className="text-danger fs-7">*</sup>
                      </div>
                    </Col>
                    <Col md={3} sm={12}>
                      <Form.Group className="">
                        <Form.Control
                          type="text"
                          className="w-100 py-2 px-2"
                          name="length"
                          value={formik.values.length}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.length}
                        />
                        {formik.errors.length && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.length}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col md={9} sm={12} className="d-flex align-items-center">
                      <div className=" d-flex align-items-center">
                        Chiều rộng<sup className="text-danger fs-7">*</sup>
                      </div>
                    </Col>
                    <Col md={3} sm={12}>
                      <Form.Group className="">
                        <Form.Control
                          type="text"
                          className="w-100 py-2 px-2"
                          name="width"
                          value={formik.values.width}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.width}
                        />
                        {formik.errors.width && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.width}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col md={9} sm={12} className="d-flex align-items-center">
                      <div className=" d-flex align-items-center">
                        Diện tích sử dụng
                        <sup className="text-danger fs-7">*</sup>
                      </div>
                    </Col>
                    <Col md={3} sm={12}>
                      <Form.Group className="">
                        <Form.Control
                          type="text"
                          className="w-100 py-2 px-2"
                          name="totalUsableArea"
                          value={formik.values.totalUsableArea}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.totalUsableArea}
                        />
                        {formik.errors.totalUsableArea && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.totalUsableArea}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <div className="">
                      <Button
                        type="submit"
                        className="mt-3 bg-primary float-end"
                      >
                        Sửa
                      </Button>
                    </div>
                  </Row>
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
                  <div className="fs-3 register-post-title">Hình ảnh</div>
                  <div className="py-2">
                    <div className="py-2 register-post-sub-title">
                      Chọn ảnh chính<sup className="text-danger fs-7">*</sup>
                    </div>
                    <div className="py-2">
                      <Form.Group className="mb-3">
                        
                        <Form.Control
                          type="file"
                          name="thumbnail"
                          accept="image/*"
                          placeholder="Chọn ảnh"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "thumbnail",
                              e.target.files[0]
                            );
                            setThumbnail(e.target.files[0]);
                          }}
                          isInvalid={!!formik.errors.thumbnail}

                 
                        />
                        {formik.errors.thumbnail && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.thumbnail}
                          </Form.Control.Feedback>
                        )}
                        {thumbnail && (
                          <>
                            <Row>
                              {
                                <Col lg={3} md={3} sm={3}>
                                  <Image
                   
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
                   
                        <Form.Control
                          type="file"
                          multiple
                          name="img"
                          accept="image/*"
                          placeholder="Chọn ảnh"
                          onChange={(e) => {
                            formik.setFieldValue("img", e.target.files);
                            setImg(e.target.files);
                          }}
                          isInvalid={!!formik.errors.img}
                        />
                        {formik.errors.img && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.img}
                          </Form.Control.Feedback>
                        )}
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
        </div> */}
        {/* <div className="register-post-container ">
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
                              {cost
                                ? VND.format((cost - cost * 0.03) * 10)
                                : ""}
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
                              {cost
                                ? VND.format((cost - cost * 0.05) * 15)
                                : ""}
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
             
                </div>
              </div>
            </Col>
            <Col sm={12} md={2}></Col>
          </Row>
        </div> */}
        {/*         
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
                  
                </div>
              </div>
            </Col>
            <Col sm={12} md={2}></Col>
          </Row>
        </div> */}
      </Form>
    </>
  );
}

export default ChangProperty;
