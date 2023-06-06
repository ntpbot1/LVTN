import { Button } from "react-bootstrap";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../SignIn/SignInSlice";

function Header() {
  const inforUser = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };
  console.log(inforUser, localStorage.getItem("token"));
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
            <div className="nav-item">
              <Button
                className="nav-item-button"
                variant="light"
                onClick={handleLogOut}
              >
                {/* <Link
                  className="text-decoration-none text-dark bg-transparent"
                  to={"/dang-xuat"}
                > */}
                Đăng xuất
                {/* </Link> */}
              </Button>
            </div>
            <div className="nav-space">|</div>

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
              <Button className="nav-item-button" variant="light">
                <Link
                  className="text-decoration-none text-dark bg-transparent"
                  to={"/dang-nhap"}
                >
                  Đăng Nhập
                </Link>
              </Button>
            </div>
            <div className="nav-space">|</div>
            <div className="nav-item">
              <Button className="nav-item-button" variant="light">
                <Link
                  className="text-decoration-none text-dark bg-transparent"
                  to={"/dang-ky"}
                >
                  Đăng Ký
                </Link>
              </Button>
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
        )}
      </div>
    </>
  );
}

export default Header;
