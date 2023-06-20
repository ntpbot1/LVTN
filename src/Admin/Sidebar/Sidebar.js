import { Accordion, Nav } from "react-bootstrap";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../SignIn/SignInSlice.js";

function Sidebar() {
  const dispatch = useDispatch();
  const handleLogoutAdmin = () => {
    dispatch(logout());
  };
  const [key, setKey] = useState("");
  const handleSelect = (eventKey) => {
    setKey(eventKey);
  };
  return (
    <>
      <div className="sidebar-content w-25">
        <Accordion
          defaultActiveKey={key}
          alwaysOpen={false}
          onSelect={handleSelect}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Button className="bg-light sidebar-button">
              <FontAwesomeIcon icon={faList} className="pe-2"></FontAwesomeIcon>
              Quản lý danh mục
            </Accordion.Button>
            <Accordion.Body className="px-0 py-0">
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/admin/category"}
              >
                <div className="ps-4 py-3 bg-light">Danh sách danh mục</div>
              </Link>
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/admin/category/add"}
              >
                <div className="ps-4 py-3 bg-light">Thêm danh mục</div>
              </Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Button className="bg-light sidebar-button">
              <FontAwesomeIcon
                icon={faNewspaper}
                className="pe-2"
              ></FontAwesomeIcon>
              Quản lý tin BĐS
            </Accordion.Button>
            <Accordion.Body className="px-0 py-0">
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/admin/property"}
              >
                <div className="ps-4 py-3 bg-light">Danh sách tin BĐS</div>
              </Link>
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/admin/property/censor"}
              >
                <div className="ps-4 py-3 bg-light">Duyệt tin BĐS</div>
              </Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Button className="bg-light sidebar-button">
              <FontAwesomeIcon
                icon={faNewspaper}
                className="pe-2"
              ></FontAwesomeIcon>
              Quản lý tin tức
            </Accordion.Button>
            <Accordion.Body className="px-0 py-0">
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/admin/news"}
              >
                <div className="ps-4 py-3 bg-light">Danh sách tin tức</div>
              </Link>
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/admin/news/add"}
              >
                <div className="ps-4 py-3 bg-light">Thêm tin tức</div>
              </Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5" onClick={handleLogoutAdmin}>
            <Accordion.Button className="bg-light sidebar-button">
              <FontAwesomeIcon icon={faList} className="pe-2"></FontAwesomeIcon>
              Quản lý thông tin cá nhân
            </Accordion.Button>
            <Accordion.Body className="px-0 py-0">
              <div className="ps-4 py-3 bg-light">Đăng xuất</div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* <Link
          className="text-decoration-none text-dark bg-transparent"
          to={"/nha-dat-ban"}
        >
          <div className="ps-4 py-3 bg-light">Thoát</div>
        </Link> */}
      </div>
    </>
  );
}

export default Sidebar;
