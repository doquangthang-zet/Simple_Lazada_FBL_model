import React from 'react';

const Item = ({name, category}) => {
    <div className="item-container">
    <div>
      <span className="item-label">Name:</span>
      {name}
    </div>
    <div>
      <span className="item-label">Category:</span>
      {category}
    </div>
  </div>
}

export default Item;
// https://contactmentor.com/filter-list-by-category-react-js/#google_vignette