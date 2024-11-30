// Navigation.js
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link> |<Link to="/sales">Sales</Link> |
      <Link to="/customers">Customers</Link> |
      <Link to="/salesproducts">SalesProducts</Link> |
      <Link to="/products">Products</Link> |
      <Link to="/categories">Categories</Link> |
      <Link to="/locations">Locations</Link> |
      <Link to="productslocations">ProductsLocations</Link>
    </nav>
  );
}

export default Navigation;
