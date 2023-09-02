import { NavLink, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { RiListOrdered2 } from "react-icons/ri";
import { FaProductHunt } from "react-icons/fa";

export default function WHASideBar() {
  return (
    <aside
      className={"aside-bar d-flex align-items-center justify-content-center"}
    >
      <div className="aside-bar-container h-100">
        <p className={"p1"}>
          <span>WAREHOUSE ADMIN DASHBOARD</span>
        </p>

        <NavLink
          to={"/admin/category"}
          className={({ isActive }) =>
            isActive
              ? "d-flex p-1 align-items-center navLink isActive"
              : "d-flex p-1 align-items-center navLink"
          }
        >
          <FaProductHunt className="iconTag" />
          <p>Category</p>
        </NavLink>

        <NavLink
          to={"/admin/warehouse"}
          className={({ isActive }) =>
            isActive
              ? "d-flex p-1 align-items-center navLink isActive"
              : "d-flex p-1 align-items-center navLink"
          }
        >
          <RiListOrdered2 className="iconTag" />
          <p>Warehouse</p>
        </NavLink>

        {/* <NavLink to={"/dashboard/users"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><FontAwesomeIcon className="iconTag" icon={faUsers}/> Users</NavLink> */}
      </div>
    </aside>
  );
}
