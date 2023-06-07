import { Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "../SignIn/SignIn";
function Home() {
  const inforAdmin = useSelector((state) => state.loginAdmin);
  return (
    <>
      <div className="d-flex">
        {inforAdmin.isLogin ? (
          <>
            <Sidebar />
            <Outlet />
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </>
  );
}

export default Home;
