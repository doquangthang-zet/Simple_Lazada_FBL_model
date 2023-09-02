import { NavLink } from "react-router-dom";

export default function CategoryList() {
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
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <NavLink to="/admin/editCategory">
                  <button type="button" class="actionBtn editBtn">
                    Edit
                  </button>
                </NavLink>

                <button type="button" class="actionBtn deleteBtn">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
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
