import { Accordion, Nav } from "react-bootstrap";
import "./Sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faHouse,
  faList,
  faNewspaper,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../SignIn/SignInSlice.js";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutAdmin = () => {
    dispatch(logout());
  };
  const [key, setKey] = useState("");
  const handleSelect = (eventKey) => {
    setKey(eventKey);
  };
  const handleStatistical = () => {
    navigate("/admin");
  };
  return (
    <>
      <div className="sidebar-content w-25">
        <Accordion
          defaultActiveKey={key}
          alwaysOpen={false}
          onSelect={handleSelect}
          className="sidebar-accordion"
        >
          <Accordion.Item
            eventKey="0"
            onClick={handleStatistical}
            className="sidebar-accordion-item"
          >
            <Accordion.Button className="bg-light sidebar-button sidebar-button-hidden">
              <FontAwesomeIcon
                icon={faChartLine}
                className="pe-2"
              ></FontAwesomeIcon>
              Thống kê
            </Accordion.Button>
            {/* <Accordion.Body className="px-0 py-0">
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
            </Accordion.Body> */}
          </Accordion.Item>
          <Accordion.Item eventKey="1">
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
          <Accordion.Item eventKey="2">
            <Accordion.Button className="bg-light sidebar-button">
              <FontAwesomeIcon
                icon={faHouse}
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
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/admin/property/hidden"}
              >
                <div className="ps-4 py-3 bg-light">Tin BĐS đã ẩn</div>
              </Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
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
          <Accordion.Item
            eventKey="4"
            onClick={handleLogoutAdmin}
            className="sidebar-accordion-item"
          >
            <Accordion.Button className="bg-light sidebar-button sidebar-button-hidden">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="pe-2"
              ></FontAwesomeIcon>
              Đăng xuất
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
