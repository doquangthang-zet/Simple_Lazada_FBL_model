export default function WarehouseEdit() {
  return (
    <div className="products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="titlepage">
              <h2>Edit Warehouse</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="inputForm">
        <form>
          <div class="mb-3">
            <label for="warehouseName" class="form-label">
              Warehouse Name
            </label>
            <input type="text" class="form-control" id="warehouseName" />
          </div>

          <div class="mb-3">
            <label for="warehouseAddress" class="form-label">
              Warehouse Address
            </label>
            <input type="text" class="form-control" id="warehouseAddress" />
          </div>

          <div class="mb-3">
            <label for="warehouseVolume" class="form-label">
              Warehouse Volume
            </label>
            <input
              type="number"
              class="form-control"
              id="warehouseVolume"
              placeholder="Enter volume"
            />
          </div>

          <div class="mb-3">
            <label for="warehouseImage" class="form-label">
              Warehouse Image
            </label>
            <input type="file" class="form-control" id="warehouseImage" />
          </div>

          <button type="submit" class="actionBtn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
