import { Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
function Home() {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Home;
