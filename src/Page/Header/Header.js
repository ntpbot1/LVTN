import { Button, Dropdown, Image } from "react-bootstrap";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../SignIn/SignInSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

function Header() {
  const inforUser = useSelector((state) => state.login);
  console.log(inforUser);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };

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
          <div className="nav-item">
            <Link
              className="text-decoration-none text-dark bg-transparent"
              to={"/nha-dat-ban"}
            >
              Nhà đất bán
            </Link>
          </div>
          <div className="nav-item">
            <Link
              className="text-decoration-none text-dark bg-transparent"
              to={"/nha-dat-cho-thue"}
            >
              Nhà đất cho thuê
            </Link>
          </div>
        </div>
        {inforUser.isLogin ? (
          <div className="d-flex flex-row align-items-center nav-left">
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
                      src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                    ></Image>
                    <div className="nav-item-name px-2">
                      {inforUser.userName}
                    </div>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem className="d-flex align-items-center ">
                      <FontAwesomeIcon
                        style={{ color: "#6c757d" }}
                        icon={faUser}
                      ></FontAwesomeIcon>

                      <div className="menu-item-name ps-2">
                        Thay đổi thông tin cá nhân
                      </div>
                    </DropdownItem>
                    <DropdownItem className="d-flex align-items-center">
                      <FontAwesomeIcon
                        style={{ color: "#6c757d" }}
                        icon={faLock}
                      ></FontAwesomeIcon>
                      <div className="menu-item-name ps-2">
                        Thay đổi mật khẩu
                      </div>
                    </DropdownItem>

                    <DropdownItem
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
            {/* <div className="nav-space">|</div> */}

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
