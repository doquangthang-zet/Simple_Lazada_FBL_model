export default function CategoryCreate() {
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
            <label for="cartegory">Choose a parent cartegory: </label> <br />
            <select name="cartegory" id="cartegory">
              <option value="Null">None</option>
              <option value="E-devices">E-devices</option>
              <option value="Cloth">Cloth</option>
              <option value="Car">Car</option>
              <option value="Toy">Toy</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Add Attribute:</label>
            <div class="mb-3">
              <label for="attributeName" class="form-label">
                Attribute Name
              </label>
              <input type="text" class="form-control" id="attributeName" />
            </div>

            <div class="mb-3">
              <label class="form-label">Attribute Type:</label> <br />
              <input
                type="radio"
                name="attributeType"
                id="numberType"
                value="int"
              />
              <label for="numberType" class="form-label">
                Number
              </label>
              &nbsp;
              <input
                type="radio"
                name="attributeType"
                id="characterType"
                value="char"
              />
              <label for="characterType" class="form-label">
                Text
              </label>
            </div>

            <div class="mb-3">
              <label class="form-label">Attribute Requirement:</label> <br />
              <input
                type="radio"
                name="attributeRequirement"
                id="required"
                value="required"
              />
              <label for="required" class="form-label">
                Required
              </label>
              &nbsp;
              <input
                type="radio"
                name="attributeRequirement"
                id="optional"
                value="null"
              />
              <label for="optional" class="form-label">
                Optional
              </label>
            </div>
          </div>
          <button type="submit" class="actionBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
