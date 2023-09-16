import { NavLink, useNavigate } from "react-router-dom";
import { IoHome} from "react-icons/io5";
import { RiListOrdered2 } from "react-icons/ri";
import { FaProductHunt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SideBar() {
    const [id, setId] = useState()
    const [msg, setMsg] = useState('')

    useEffect(() => {
        axios.get("http://localhost:4000")
        .then(res => {
            if(res.data.Status === "Success") {
                setId(res.data.id)
            } else {
                setMsg(res.data.Error)
            }
        })
        .then(err => console.log(err))
    }, []);

    return (
      <aside
        className={"aside-bar d-flex align-items-center justify-content-center"}
      >
        <div className="aside-bar-container h-100">
          <p className={"p1"}>
            <span>SELLER DASHBOARD</span>
          </p>
          <NavLink
            to={`/seller/${id}/home`}
            className={({ isActive }) =>
              isActive
                ? "d-flex p-1 align-items-center navLink isActive"
                : "d-flex p-1 align-items-center navLink"
            }
          >
            <IoHome className="iconTag" />
            <p>Home</p>
          </NavLink>

          <NavLink
            to={`/seller/${id}/products`}
            className={({ isActive }) =>
              isActive
                ? "d-flex p-1 align-items-center navLink isActive"
                : "d-flex p-1 align-items-center navLink"
            }
          >
            <FaProductHunt className="iconTag" />
            <p>Products</p>
          </NavLink>

          <NavLink
            to={`/seller/${id}/inbound`}
            className={({ isActive }) =>
              isActive
                ? "d-flex p-1 align-items-center navLink isActive"
                : "d-flex p-1 align-items-center navLink"
            }
          >
            <RiListOrdered2 className="iconTag" />
            <p>Inbound Orders</p>
          </NavLink>

          {/* <NavLink to={"/dashboard/users"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><FontAwesomeIcon className="iconTag" icon={faUsers}/> Users</NavLink> */}
        </div>
      </aside>
    );
}