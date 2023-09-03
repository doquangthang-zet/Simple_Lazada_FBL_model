export default function CategoryEdit() {
  return (
    <div className="products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="titlepage">
              <h2>New Category</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="inputForm">
        <form>
          <div class="mb-3">
            <label for="categoryName" class="form-label">
              Category Name
            </label>
            <input type="text" class="form-control" id="categoryName" />
          </div>

          <div class="mb-3">
            <label for="cartegory">Choose a parent cartegory: </label>
            <select name="cartegory" id="cartegory">
              <option value="Null">None</option>
              <option value="E-devices">E-devices</option>
              <option value="Cloth">Cloth</option>
              <option value="Car">Car</option>
              <option value="Toy">Toy</option>
            </select>
          </div>

          <button type="submit" class="actionBtn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
