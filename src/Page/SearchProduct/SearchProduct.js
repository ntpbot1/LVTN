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
  sessionStorage.removeItem("searchCategory");
  sessionStorage.removeItem("searchContent");
  const navigate = useNavigate();
  const [listCategory, setListCategory] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [acreage, setAcreage] = useState();

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
      case "500000000":
        setPrice(eventKey);
        setLoaiGia("Dưới 500 triệu");
        break;
      case "500000000-800000000":
        setPrice(eventKey);
        setLoaiGia("500 - 800 triệu");
        break;
      case "800000000-1000000000":
        setPrice(eventKey);
        setLoaiGia("800 triệu - 1 tỷ");
        break;
      case "1000000000-2000000000":
        setPrice(eventKey);
        setLoaiGia("1 - 2 tỷ");
        break;
      case "2000000000-3000000000":
        setPrice(eventKey);
        setLoaiGia("2 - 3 tỷ");
        break;
      case "3000000000-5000000000":
        setPrice(eventKey);
        setLoaiGia("3 - 5 tỷ");
        break;
      case "5000000000-7000000000":
        setPrice(eventKey);
        setLoaiGia("5 - 7 tỷ");
        break;
      case "7000000000-10000000000":
        setPrice(eventKey);
        setLoaiGia("7 - 10 tỷ");
        break;
      case "10000000000-20000000000":
        setPrice(eventKey);
        setLoaiGia("10 - 20 tỷ");
        break;
      case "20000000000-30000000000":
        setPrice(eventKey);
        setLoaiGia("20 - 30 tỷ");
        break;
      case "30000000000-40000000000":
        setPrice(eventKey);
        setLoaiGia("30 - 40 tỷ");
        break;
      case "40000000000-60000000000":
        setPrice(eventKey);
        setLoaiGia("40 - 60 tỷ");
        break;
      case "60000000000":
        setPrice(eventKey);
        setLoaiGia("trên 60 tỷ");
        break;
      // case "l14":
      //   setLoaiGia("thỏa thuận");
      //   break;

      default:
        break;
    }
  };
  const [loaiDienTich, setLoaiDienTich] = useState("");
  const m = 2;
  const handleSelectLoaiDienTich = (eventKey) => {
    switch (eventKey) {
      case "30":
        setAcreage(eventKey);
        setLoaiDienTich(() => (
          <>
            <div>
              Dưới 30 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "30-50":
        setAcreage(eventKey);
        setLoaiDienTich(() => (
          <>
            <div>
              30 - 50 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "50-80":
        setAcreage(eventKey);
        setLoaiDienTich(() => (
          <>
            <div>
              50 - 80 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "80-100":
        setAcreage(eventKey);
        setLoaiDienTich(() => (
          <>
            <div>
              80 - 100 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "100-150":
        setAcreage(eventKey);
        setLoaiDienTich(() => (
          <>
            <div>
              100 - 150 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "150-200":
        setAcreage(eventKey);
        setLoaiDienTich(() => (
          <>
            <div>
              150 - 200 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "200-250":
        setAcreage(eventKey);
        setLoaiDienTich(() => (
          <>
            <div>
              200 - 250 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "250-350":
        setAcreage(eventKey);
        setLoaiDienTich(() => (
          <>
            <div>
              250 - 300 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "300-500":
        setAcreage(eventKey);
        setLoaiDienTich(() => (
          <>
            <div>
              300 - 500 m<sup>2</sup>
            </div>
          </>
        ));
        break;
      case "500":
        setAcreage(eventKey);
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
  const [nameProvince, setNameProvince] = useState();
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
  const [nameDistrict, setNameDistrict] = useState();
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
  const [nameWards, setNameWards] = useState();
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
    // if (loaiBDS != "") {
    //   sessionStorage.setItem("searchCategory", category);
    //   navigate("/search");
    // } else {
    //   sessionStorage.setItem("searchContent", content);
    //   navigate("/search");
    // }
    navigate(
      `/search/${content}/${category}/${nameProvince}/${nameDistrict}/${nameWards}/${price}/${acreage}`
    );
    // sessionStorage.setItem("content", content);
    // sessionStorage.setItem("category", category);
    // sessionStorage.setItem("province", nameProvince);
    // sessionStorage.setItem("district", nameDistrict);
    // sessionStorage.setItem("ward", nameWards);
    // sessionStorage.setItem("price", price);
    // sessionStorage.setItem("acreage", acreage);
    // navigate("/search");
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
                    <DropdownItem eventKey={"500000000"}>
                      Dưới 500 triệu
                    </DropdownItem>
                    <DropdownItem eventKey={"500000000-800000000"}>
                      500 - 800 triệu
                    </DropdownItem>
                    <DropdownItem eventKey={"800000000-1000000000"}>
                      800 triệu - 1 tỷ
                    </DropdownItem>
                    <DropdownItem eventKey={"1000000000-2000000000"}>
                      1 - 2 tỷ
                    </DropdownItem>
                    <DropdownItem eventKey={"2000000000-3000000000"}>
                      2 - 3 tỷ
                    </DropdownItem>
                    <DropdownItem eventKey={"3000000000-5000000000"}>
                      3 - 5 tỷ
                    </DropdownItem>
                    <DropdownItem eventKey={"5000000000-7000000000"}>
                      5 - 7 tỷ
                    </DropdownItem>
                    <DropdownItem eventKey={"7000000000-10000000000"}>
                      7 - 10 tỷ
                    </DropdownItem>
                    <DropdownItem eventKey={"10000000000-20000000000"}>
                      10 - 20 tỷ
                    </DropdownItem>
                    <DropdownItem eventKey={"20000000000-30000000000"}>
                      20 - 30 tỷ
                    </DropdownItem>
                    <DropdownItem eventKey={"30000000000-40000000000"}>
                      30 - 40 tỷ
                    </DropdownItem>
                    <DropdownItem eventKey={"40000000000-60000000000"}>
                      40 - 60 tỷ
                    </DropdownItem>
                    <DropdownItem eventKey={"60000000000"}>
                      trên 60 tỷ
                    </DropdownItem>
                    {/* <DropdownItem eventKey={"tt"}>Thỏa thuận</DropdownItem> */}
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
                    <DropdownItem eventKey={"30"}>
                      Dưới 30 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"30-50"}>
                      30 - 50 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"50-80"}>
                      50 - 80 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"80-100"}>
                      80 - 100 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"100-150"}>
                      100 - 150 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"150-200"}>
                      150 - 200 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"200-250"}>
                      200 - 250 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"250-300"}>
                      250 - 300 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"300-500"}>
                      300 - 500 m<sup>2</sup>
                    </DropdownItem>
                    <DropdownItem eventKey={"500"}>
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
