import { Button, Dropdown, Image, Row } from "react-bootstrap";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, isSave, isGetDeTail } from "../SignIn/SignInSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLock,
  faNewspaper,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
  const navigate = useNavigate();
  const [listSave, setListSave] = useState();
  const [showFollow, setShowFollow] = useState(false);
  const inforUser = useSelector((state) => state.login);
  console.log(inforUser);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };
  const handleChangePass = () => {
    navigate("/doi-mat-khau");
  };
  const handleChangeInfo = () => {
    navigate("/doi-thong-tin");
  };
  const handleProperty = () => {
    navigate("/quan-ly-tin-dang");
  };
  const handleShowFollow = () => {
    setShowFollow(!showFollow);
  };
  const handleClickSave = (slug) => {
    sessionStorage.setItem("slug-real-easte", slug);
    dispatch(isGetDeTail({ slug: slug }));
    navigate("/chi-tiet");
    handleShowFollow();
  };
  useEffect(() => {
    getAllSave();
  }, [inforUser.id]);
  const getAllSave = async () => {
    try {
      let res = await propertyApi.getSave();
      // setListSave(res.data);
      dispatch(
        isSave({
          listNews: res.data,
        })
      );
    } catch (err) {
      console.log("err", err);
    }
  };
  const useViewport = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return { width };
  };
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 576;
  if (isMobile) {
    return <>Mobile</>;
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-centers header-container">
        <div className="d-flex flex-row align-items-center nav-right">
          <Link
            className="text-decoration-none text-dark bg-transparent"
            to={"/"}
          >
            <div className="fs-1 text-danger logo nav-item">ThanhBuild</div>
          </Link>
        </div>
        {inforUser.isLogin ? (
          <div className="d-flex flex-row align-items-center position-relative nav-left">
            <div className="follow" onClick={handleShowFollow}>
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: "#ddd", width: "" }}
              ></FontAwesomeIcon>
            </div>
            {showFollow == true ? (
              <div className="position-absolute position-absolute top-100 start-0  translate-middle-x follow-container">
                <div className="follow-content rounded-1">
                  <div className="py-2  fs-5 color-secondary d-flex justify-content-center follow-title">
                    Tin đăng đã lưu
                  </div>
                  {inforUser.listNews ? (
                    <div className="fs-7 color-secondary ">
                      {inforUser.listNews.map((sav, index) => (
                        <div
                          className="d-flex align-items-center follow-list follow-item "
                          style={{ height: "50px" }}
                          onClick={() => handleClickSave(sav.slug)}
                        >
                          <div className="h-100 d-flex align-items-center">
                            <Image
                              roundedCircle={false}
                              width={40}
                              height={40}
                              src={sav.thumbnail}
                            ></Image>
                          </div>
                          <div className="ps-2 h-100 list-item" key={index}>
                            {sav.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="fs-5 color-secondary d-flex justify-content-center follow-item follow-list"></div>
                  )}
                  <div className="color-secondary d-flex justify-content-center align-items-center follow-item follow-list">
                    Xem tất cả
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="nav-info ">
              <div className="d-flex align-items-center h-100">
                <Dropdown>
                  <DropdownToggle
                    variant="light"
                    className="w-100 text-start d-flex align-items-center justify-content-between bg-transparent border-none info-select"
                  >
                    <Image
                      roundedCircle={true}
                      width={40}
                      height={40}
                      src={inforUser.img}
                    ></Image>
                    <div className="nav-item-name px-2">
                      {inforUser.userName}
                    </div>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      eventKey={"1"}
                      className="d-flex align-items-center "
                      onClick={handleProperty}
                    >
                      <FontAwesomeIcon
                        style={{ color: "#6c757d" }}
                        icon={faNewspaper}
                      ></FontAwesomeIcon>

                      <div className="menu-item-name ps-2">
                        Quản lý tin đăng
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      eventKey={"2"}
                      className="d-flex align-items-center "
                      onClick={handleChangeInfo}
                    >
                      <FontAwesomeIcon
                        style={{ color: "#6c757d" }}
                        icon={faUser}
                      ></FontAwesomeIcon>

                      <div className="menu-item-name ps-2">
                        Thay đổi thông tin cá nhân
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      eventKey={"3"}
                      className="d-flex align-items-center"
                      onClick={handleChangePass}
                    >
                      <FontAwesomeIcon
                        style={{ color: "#6c757d" }}
                        icon={faLock}
                      ></FontAwesomeIcon>
                      <div className="menu-item-name ps-2">
                        Thay đổi mật khẩu
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      eventKey={"4"}
                      className="d-flex align-items-center"
                      onClick={handleLogOut}
                    >
                      <FontAwesomeIcon
                        style={{ color: "#6c757d" }}
                        icon={faRightFromBracket}
                      ></FontAwesomeIcon>
                      <div className="menu-item-name ps-2">Đăng xuất</div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <div className="nav-item mx-4">
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/dang-tin"}
              >
                <Button className="nav-item-button-special" variant="light">
                  Đăng tin
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-row align-items-center nav-left">
            <div className="nav-item">
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/dang-nhap"}
              >
                <Button className="nav-item-button" variant="light">
                  Đăng Nhập
                </Button>
              </Link>
            </div>
            <div className="nav-space">|</div>
            <div className="nav-item">
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/dang-ky"}
              >
                <Button className="nav-item-button" variant="light">
                  Đăng Ký
                </Button>
              </Link>
            </div>
            <div className="nav-item mx-4">
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/dang-nhap"}
              >
                <Button className="nav-item-button-special" variant="light">
                  Đăng tin
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
