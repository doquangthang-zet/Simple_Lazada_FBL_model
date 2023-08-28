import { Route, Routes } from "react-router-dom";
import Header from "../Layout/Header";
import WHASideBar from "../Layout/WHASideBar";
import WarehouseList from "./Warehouse";
import CategoryList from "./Category";
import WarehouseCreate from "./WarehouseCreate";
import WarehouseEdit from "./WarehouseEdit";
import CategoryCreate from "./CategoryCreate";
import CategoryEdit from "./CategoryEdit";


export default function WHAdmin() {
  return (
    <div>
      <Header />
      <WHASideBar />
      <div>
        <Routes>
          <Route path="/warehouse" element={<WarehouseList />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/newWarehouse" element={<WarehouseCreate />} />
          <Route path="/editWarehouse" element={<WarehouseEdit />} />
          <Route path="/newCategory" element={<CategoryCreate />} />
          <Route path="/editCategory" element={<CategoryEdit />} />
        </Routes>
      </div>
    </div>
  );
}
