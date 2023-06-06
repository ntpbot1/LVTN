import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Home() {
  // console.log(localStorage.getItem("token"));

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Home;
