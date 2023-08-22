import { Route, Routes } from "react-router-dom";
import Header from "../Layout/Header";
import WHASideBar from "../Layout/WHASideBar";
import WarehouseList from "./Warehouse";
import CategoryList from "./Category";


export default function WHAdmin() {
  return (
    <div>
      <Header />
      <WHASideBar />
      <div>
        <Routes>
          <Route path="/warehouse" element={<WarehouseList />} />
          <Route path="/category" element={<CategoryList />} />
        </Routes>
      </div>
    </div>
  );
}
