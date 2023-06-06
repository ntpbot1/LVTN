import { Accordion, Nav } from "react-bootstrap";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function Sidebar() {
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
          {/* <Accordion.Item eventKey="2">
            <Accordion.Button className="bg-light sidebar-button">
              <FontAwesomeIcon icon={faList} className="pe-2"></FontAwesomeIcon>
              Quản lý danh mục
            </Accordion.Button>
            <Accordion.Body className="px-0 py-0">
              <Link
                className="text-decoration-none text-dark bg-transparent"
                to={"/nha-dat-ban"}
              >
                <div className="ps-4 py-3 bg-light">Nhà đất bán</div>
              </Link>
            </Accordion.Body>
          </Accordion.Item> */}
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
