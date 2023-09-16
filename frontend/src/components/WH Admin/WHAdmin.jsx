import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import WHASideBar from "../Layout/WHASideBar";
import WarehouseList from "./Warehouse";
import CategoryList from "./Category";
import WarehouseCreate from "./WarehouseCreate";
import WarehouseEdit from "./WarehouseEdit";
import CategoryCreate from "./CategoryCreate";
import CategoryEdit from "./CategoryEdit";
import WarehouseViewProduct from "./WarehouseViewProduct";
import WarehouseMoveProduct from "./WarehouseMoveProduct";
import axios from "axios";
import { useEffect } from "react";


export default function WHAdmin() {
  const navigate = useNavigate()
  useEffect(() => {
      getUser()
  }, [])
  function getUser() {
      axios.get("http://localhost:4000")
      .then(res => {
          if(res.data.Status !== "Success") {
              navigate("/login")
          } 
          if (res.data.role !== 'admin') {
            navigate("/login")
          }
      })
  }
  return (
    <div>
      <Header />
      <WHASideBar />
      <div>
        <Routes>
          <Route path="/warehouse" element={<WarehouseList />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/newWarehouse" element={<WarehouseCreate />} />
          <Route path="/editCategory/:id" element={<CategoryEdit />} />
          <Route path="/editWarehouse/:id" element={<WarehouseEdit />} />
          <Route path="/newCategory" element={<CategoryCreate />} />
          <Route path="/editCategory" element={<CategoryEdit />} />
          <Route
            path="/viewWarehouseProduct/:id"
            element={<WarehouseViewProduct />}
          />
          <Route
            path="/moveWarehouseProduct/:id"
            element={<WarehouseMoveProduct />}
          />
        </Routes>
      </div>
    </div>
  );
}
