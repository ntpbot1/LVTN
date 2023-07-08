import {
  Col,
  Container,
  Row,
  ToggleButton,
  ToggleButtonGroup,
  Dropdown,
  Button,
} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { useState, useEffect } from "react";
import categoryApi from "../../api/categoryApi";
import "./SearchProduct.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import provinceApi from "../../api/provinceApi";
import propertyApi from "../../api/propertyApi";
function SearchProduct() {
  sessionStorage.setItem("searchCategory", null);
  sessionStorage.setItem("searchContent", null);

  const navigate = useNavigate();
  const [listCategory, setListCategory] = useState();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState();

  const [hinhThuc, setHinhThuc] = useState("nha-dat-ban");
  const handleHinhThuc = (value) => {
    if (value == 1) {
      setHinhThuc("nha-dat-ban");
    } else if (value == 2) {
      setHinhThuc("nha-dat-cho-thue");
    }
  };
  const [loaiBDS, setLoaiBDS] = useState("");
  const handleSelectLoaiBDS = (eventKey) => {
    listCategory.forEach((cat, index) => {
      if (cat.id == eventKey) {
        setLoaiBDS(cat.name);
        setCategory(cat.slug);
      }
    });
  };
  const [loaiGia, setLoaiGia] = useState("");
  const handleSelectLoaiGia = (eventKey) => {
    switch (eventKey) {
      case "l1":
        setLoaiGia("Dưới 500 triệu");
        break;
      case "l2":
        setLoaiGia("500 - 800 triệu");
        break;
      case "l3":
        setLoaiGia("800 triệu - 1 tỷ");
        break;
      case "l4":
        setLoaiGia("1 - 2 tỷ");
        break;
      case "l5":
        setLoaiGia("2 - 3 tỷ");
        break;
      case "l6":
        setLoaiGia("3 - 5 tỷ");
        break;
      case "l7":
        setLoaiGia("5 - 7 tỷ");
        break;
      case "l8":
        setLoaiGia("7 - 10 tỷ");
        break;
      case "l9":
        setLoaiGia("10 - 20 tỷ");
        break;
      case "l10":
        setLoaiGia("20 - 30 tỷ");
        break;
      case "l11":
        setLoaiGia("30 - 40 tỷ");
        break;
      case "l12":
        setLoaiGia("40 - 60 tỷ");
        break;
      case "l3":
        setLoaiGia("trên 60 tỷ");
        break;
      case "l14":
        setLoaiGia("thỏa thuận");
        break;

      default:
        break;
    }
  };
  const [loaiDienTich, setLoaiDienTich] = useState("");
  const m = 2;
  const handleSelectLoaiDienTich = (eventKey) => {
    switch (eventKey) {
      case "l1":
        setLoaiDienTich(() => (
          <>
            <div>
              Dưới 30 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "l2":
        setLoaiDienTich(() => (
          <>
            <div>
              30 - 50 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "l3":
        setLoaiDienTich(() => (
          <>
            <div>
              50 - 80 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "l4":
        setLoaiDienTich(() => (
          <>
            <div>
              80 - 100 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "l5":
        setLoaiDienTich(() => (
          <>
            <div>
              100 - 150 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "l6":
        setLoaiDienTich(() => (
          <>
            <div>
              150 - 200 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "l7":
        setLoaiDienTich(() => (
          <>
            <div>
              200 - 250 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "l8":
        setLoaiDienTich(() => (
          <>
            <div>
              250 - 300 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "l9":
        setLoaiDienTich(() => (
          <>
            <div>
              300 - 500 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "l10":
        setLoaiDienTich(() => (
          <>
            <div>
              trên 500 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      default:
        break;
    }
  };
  //Lấy ds danh mục
  useEffect(() => {
    getAllCategory();
  }, []);
  const getAllCategory = async () => {
    try {
      let res = await categoryApi.getAll();
      setListCategory(res.data);
    } catch (err) {
      console.log("err", err);
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
  const [nameProvince, setNameProvince] = useState("");
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
  const [nameDistrict, setNameDistrict] = useState("");
  const [district, setDistrict] = useState("");
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
  const [nameWards, setNameWards] = useState("");
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
  const handleSearch = async () => {
    if (loaiBDS != "") {
      sessionStorage.setItem("searchCategory", category);
      navigate("/search");
    } else {
      sessionStorage.setItem("searchContent", content);
      navigate("/search");
    }
  };
  return (
    <>
      <div className="search-product-content">
        <Container>
          <Row className="pt-5">
            {/* <Col md={8}>
              <ToggleButtonGroup
                type="radio"
                name="abc"
                defaultValue={1}
                onChange={handleHinhThuc}
              >
                <ToggleButton
                  id="1"
                  value={1}
                  variant="light"
                  className="search-button"
                >
                  Nhà đất bán
                </ToggleButton>

                <ToggleButton
                  id="2"
                  value={2}
                  variant="light"
                  className="search-button"
                >
                  Nhà đất cho thuê
                </ToggleButton>
              </ToggleButtonGroup>
            </Col> */}
            <Col md={4}></Col>
          </Row>
          <div className="search-product py-2 ">
            <Row className="d-flex justify-content-center align-items-center my-2 mx-3 py-2 bg-light search-control ">
              <Col lg={2} md={3} sm={12}>
                <div className="">
                  <div>
                    <Dropdown onSelect={handleSelectLoaiBDS}>
                      <DropdownToggle
                        variant="light"
                        className="w-100 text-start d-flex align-items-center justify-content-between search-select"
                      >
                        {loaiBDS ? loaiBDS : "Loại nhà đất"}
                      </DropdownToggle>
                      <DropdownMenu className="">
                        {listCategory &&
                          listCategory.map((cat, index) => (
                            <DropdownItem key={index} eventKey={cat.id}>
                              {cat.name}
                            </DropdownItem>
                          ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </Col>
              <Col lg={8} md={6} sm={12} className="h-100 ">
                <input
                  type="text"
                  className="w-100 bg-light search-input"
                  value={content}
                  placeholder="Tìm nhanh. VD: Đường Võ Văn Kiệt"
                  onChange={(e) => setContent(e.target.value)}
                ></input>
              </Col>
              <Col lg={2} md={3} sm={12}>
                {/* <Link to={`/${hinhThuc}`}> */}
                <Button
                  className="float-end  form-submit text-light"
                  variant="danger"
                  type="submit"
                  onClick={handleSearch}
                >
                  <FontAwesomeIcon icon={faSearch} className="pe-2" />
                  Tìm Kiếm
                </Button>
                {/* </Link> */}
              </Col>
            </Row>
            <Row className="mx-1">
              <Col lg={3} md={4} sm={12} className="py-2">
                {/* <div className="py-2 register-post-sub-title">
                  Tỉnh, thành phố<sup className="text-danger fs-7">*</sup>
                </div> */}

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
                    className="w-100 text-start d-flex align-items-center justify-content-between"
                  >
                    {nameProvince ? nameProvince : "Tỉnh/Thành phố"}
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

              <Col lg={3} md={4} sm={12} className="py-2">
                {/* <div className="py-2 register-post-sub-title">
                  Quận, huyện<sup className="text-danger fs-7">*</sup>
                </div> */}

                <Dropdown onSelect={handleSelectDistrict}>
                  <DropdownToggle
                    variant="light"
                    className="w-100 text-start d-flex align-items-center justify-content-between"
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
              <Col lg={3} md={4} sm={12} className="py-2">
                {/* <div className="py-2 register-post-sub-title">
                  Phường, xã<sup className="text-danger fs-7">*</sup>
                </div> */}

                <Dropdown onSelect={handleSelectWards}>
                  <DropdownToggle
                    variant="light"
                    className="w-100 text-start d-flex align-items-center justify-content-between"
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
            <Row className="mx-1 ">
              <Col lg={3} md={4} className="py-2">
                <Dropdown onSelect={handleSelectLoaiGia}>
                  <DropdownToggle
                    variant="light"
                    className="w-100 text-start d-flex align-items-center justify-content-between search-select "
                  >
                    {loaiGia ? loaiGia : "Mức giá"}
                  </DropdownToggle>
                  <DropdownMenu className="">
                    <DropdownItem eventKey={"l1"}>Dưới 500 triệu</DropdownItem>
                    <DropdownItem eventKey={"l2"}>500 - 800 triệu</DropdownItem>
                    <DropdownItem eventKey={"l3"}>
                      800 triệu - 1 tỷ
                    </DropdownItem>
                    <DropdownItem eventKey={"l4"}>1 - 2 tỷ</DropdownItem>
                    <DropdownItem eventKey={"l5"}>2 - 3 tỷ</DropdownItem>
                    <DropdownItem eventKey={"l6"}>3 - 5 tỷ</DropdownItem>
                    <DropdownItem eventKey={"l7"}>5 - 7 tỷ</DropdownItem>
                    <DropdownItem eventKey={"l8"}>7 - 10 tỷ</DropdownItem>
                    <DropdownItem eventKey={"l9"}>10 - 20 tỷ</DropdownItem>
                    <DropdownItem eventKey={"l10"}>20 - 30 tỷ</DropdownItem>
                    <DropdownItem eventKey={"l11"}>30 - 40 tỷ</DropdownItem>
                    <DropdownItem eventKey={"l12"}>40 - 60 tỷ</DropdownItem>
                    <DropdownItem eventKey={"l13"}>trên 60 tỷ</DropdownItem>
                    <DropdownItem eventKey={"l14"}>Thỏa thuận</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>
              <Col lg={3} md={4} className="py-2">
                <Dropdown onSelect={handleSelectLoaiDienTich}>
                  <DropdownToggle
                    variant="light"
                    className="w-100 text-start d-flex align-items-center justify-content-between search-select "
                  >
                    {loaiDienTich ? loaiDienTich : "Diện tích"}
                  </DropdownToggle>
                  <DropdownMenu className="">
                    <DropdownItem eventKey={"l1"}>
                      Dưới 30 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"l2"}>
                      30 - 50 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"l3"}>
                      50 - 80 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"l4"}>
                      80 - 100 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"l5"}>
                      100 - 150 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"l6"}>
                      150 - 200 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"l7"}>
                      200 - 250 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"l8"}>
                      250 - 300 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"l9"}>
                      300 - 500 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"l10"}>
                      trên 500 m<sup>2</sup>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SearchProduct;
