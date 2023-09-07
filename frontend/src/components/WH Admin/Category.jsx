import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteCateById, getAllCates } from "../../api/app";
import { withSwal } from 'react-sweetalert2';

function CategoryList({swal})  {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getAllCates().then(res => {
      setCategories(res.cate)
      console.log(res)
    })
  }, [])

  function fetchCategories() {
    getAllCates().then(res => {
      setCategories(res.cate)
    })
  }

  function deleteCate(cate) {
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${cate.name}`,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, Delete!",
      reverseButtons: true,
      confirmButtonColor: '#d55',
    }).then(result => {
      if (result.isConfirmed) {
        deleteCateById(cate._id)
        fetchCategories()
      }
        console.log({result})
    });
  }
  return (
    <div className="products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="titlepage">
              <h2>Category List</h2>
            </div>
          </div>
        </div>
      </div>

      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Parent Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 && categories.map(cate => (
              <tr>
                <th scope="row">1</th>
                <td>{cate.name}</td>
                <td>{cate?.parent?.name}</td>
                <td>
                  <NavLink to={"/admin/editCategory/" + cate._id}>
                    <button type="button" class="actionBtn editBtn">
                      Edit
                    </button>
                  </NavLink>

                  <button type="button" class="actionBtn deleteBtn" onClick={() => deleteCate(cate)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NavLink to="/admin/newCategory">
        <button type="button" class="actionBtn">
          Create
        </button>
      </NavLink>
    </div>
  );
}

export default withSwal (({swal}, ref) => (
  <CategoryList swal={swal} />
))
