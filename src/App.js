import { Routes, Route } from "react-router-dom";
import Home from "./Page/Home/Home.js";
import SignIn from "./Page/SignIn/SignIn.js";
import SignUp from "./Page/SignUp/SignUp.js";
import DetailProduct from "./Page/DetailProduct/DetailProduct.js";
import Product from "./Page/Product/Product.js";
import RegisterPost from "./Page/RegisterPost/RegisterPost.js";
import AdminHome from "./Admin/Home/Home.js";
import Category from "./Admin/Category/Category.js";
import AddCategory from "./Admin/Category/AddCategory/AddCategory.js";
import Property from "./Admin/Property/Property.js";
import CensorProperty from "./Admin/Property/CensorProperty/CensorProperty.js";
import Content from "./Page/Content/Content.js";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="dang-nhap" element={<SignIn />}></Route>
          <Route path="dang-ky" element={<SignUp />}></Route>
          <Route path="chi-tiet" element={<DetailProduct />}></Route>
          <Route path="nha-dat-ban" element={<Product />}></Route>
          <Route path="nha-dat-cho-thue" element={<Product />}></Route>
          <Route path="dang-tin" element={<RegisterPost />}></Route>
          <Route index element={<Content />}></Route>
        </Route>

        <Route path="/admin" element={<AdminHome />}>
          <Route path="category" element={<Category />}></Route>
          <Route path="category/add" element={<AddCategory />}></Route>
          <Route path="property" element={<Property />}></Route>
          <Route path="property/censor" element={<CensorProperty />}></Route>
        </Route>

        <Route path="*" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
