import axios from "axios";
import { React, useState, useEffect } from "react";
import { getAllCates, saveNewCate } from "../../api/app";
export default function CategoryCreate() {
  const [cateName, setCateName] = useState('')
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState('')
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  function fetchCategories() {
    getAllCates().then(res => {
      setCategories(res.cate)
    })
  }

  function saveCategory() {
    const data = {
      name: cateName,
      parent_cate: parentCategory || undefined,
      properties: properties,
    }
    saveNewCate(data)
    fetchCategories()
  }

  function addProperty() {
    setProperties(prev => {
      return [...prev, {name:'', type:'', required: false}]
    })
  }

  function handlePropertyNameChange(index, prop, newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    })
    console.log({index, prop, newName})
  }

  function handlePropertyTypeChange(index, prop, newType) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].type = newType;
      return properties;
    })
    console.log({index, prop, newType})
  }

  function handlePropertyRequireChange(index, prop, newRequire) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].required = newRequire;
      return properties;
    })
    console.log({index, prop, newRequire})
  }

   function removeProp(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p, pi) => {
        return pi !== indexToRemove;
      });
    })
   }

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
        <form onSubmit={saveCategory}>
          <div class="mb-3">
            <label for="categoryName" class="form-label">
              Category Name
            </label>
            <input type="text" class="form-control" id="categoryName" value={cateName} onChange={e => setCateName(e.target.value)} />
          </div>

          <div class="mb-3">
            <label for="cartegory">Choose a parent cartegory: </label> <br />
            <select name="cartegory" id="cartegory" value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
              <option value="">None</option>
              {categories.length > 0 && categories.map(cate => (
                <option value={cate._id}>{cate.name}</option>
              ))}
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Properties:</label>
            <button type="button" class="actionBtn" onClick={addProperty}>
              Add new property
            </button>
          </div>

          <div class="mb-3">
            {properties.length > 0 && properties.map((prop, index) => (
              <div className="d-flex">
                <div class="p-2">
                  <label for="attributeName" class="form-label">
                    Attribute Name
                  </label>
                  <input type="text" class="form-control" id="attributeName" placeholder="Property name" value={prop.name} onChange={e => handlePropertyNameChange(index, prop, e.target.value)} />
                </div>

                <div class="p-2">
                  <label class="form-label">Attribute Type:</label> <br />
                  <input
                    type="radio"
                    name={`attributeType${index}`}
                    id='numberType'
                    value="number"
                    checked={prop.type === "number"}
                    onChange={e => handlePropertyTypeChange(index, prop, e.target.value)}
                  />
                  <label for="numberType" class="form-label">
                    Number
                  </label>
                  &nbsp;
                  <input
                    type="radio"
                    name={`attributeType${index}`}
                    id="characterType"
                    value="text"
                    checked={prop.type === "text"}
                    onChange={e => handlePropertyTypeChange(index, prop, e.target.value)}
                  />
                  <label for="characterType" class="form-label">
                    Text
                  </label>
                </div>

                <div class="p-2">
                  <label class="form-label">Attribute Requirement:</label> <br />
                  <input
                    type="radio"
                    name={`attributeRequirement${index}`}
                    id="required"
                    value={true}
                    checked={prop.required == "true"}
                    onChange={e => handlePropertyRequireChange(index, prop, e.target.value)}
                  />
                  <label for="required" class="form-label">
                    Required
                  </label>
                  {/* &nbsp; */}
                  <input
                    type="radio"
                    name={`attributeRequirement${index}`}
                    id="optional"
                    value={false}
                    checked={prop.required === "false"}
                    onChange={e => handlePropertyRequireChange(index, prop, e.target.value)}
                  />
                  <label for="optional" class="form-label">
                    Optional
                  </label>
                </div>

                <div className="p-2 mt-3">
                  <button type="button" class="actionBtn deleteBtn" onClick={() => removeProp(index)} >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div> 

          <button type="submit" class="actionBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
