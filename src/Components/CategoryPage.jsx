import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


const CategoryPage = ({ products, addToWishlist }) => {
  const { categoryName } = useParams();
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState('low-to-high'); // Default sort option

  useEffect(() => {
    filterAndSortProducts();
  }, [categoryName, sortOption]); // Trigger re-render when categoryName or sortOption changes

  const filterAndSortProducts = () => {
    let categoryProducts = [];

    // Check if categoryName is a product name or category
    const isProductName = products.some(product => product.name.toLowerCase() === categoryName.toLowerCase());

    if (isProductName) {
      categoryProducts = products.filter(product => product.name.toLowerCase() === categoryName.toLowerCase());
    } else {
      categoryProducts = products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase());
    }

    // Sort products based on sortOption
    switch (sortOption) {
      case 'low-to-high':
        categoryProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-to-low':
        categoryProducts.sort((a, b) => b.price - a.price);
        break;
      case 'medium-to-high':
        categoryProducts.sort((a, b) => a.price - b.price);
        break;
      case 'low-to-medium':
        categoryProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    setSortedProducts(categoryProducts);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="container">
      <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="mr-2">Sort by:</label>
          <select className="form-control d-inline-block w-auto" value={sortOption} onChange={handleSortChange}>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="medium-to-high">Price: Medium to High</option>
            <option value="low-to-medium">Price: Low to Medium</option>
          </select>
        </div>
        {sortedProducts.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-outline-dark" onClick={() => addToWishlist(product.id)}>Add to Wishlist</button>
                {/* Link to product details */}
                <Link to={`/product/${encodeURIComponent(product.name)}`} className="btn btn-dark ml-2">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
