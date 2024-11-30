import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Categories } from "./pages/Categories";
import { Home } from "./pages/Home";
import { Sales } from "./pages/Sales";
import { SalesProducts } from "./pages/SalesProducts";
import { Customers } from "./pages/Customers";
import { Products } from "./pages/Products";
import { ProductsLocations } from "./pages/ProductsLocations";
import { Locations } from "./pages/Locations";

function App() {
  return (
    <Router basename="/the-recursive-queries">
      <h1>Happy Day Convenience Store</h1>
      <Navigation />
      <Routes>
        <Route
          path="/"
          exact
          element={<Home />}
        />
        <Route
          path="/sales"
          element={<Sales />}
        />
        <Route
          path="/customers"
          element={<Customers />}
        />
        <Route
          path="/salesproducts"
          element={<SalesProducts />}
        />
        <Route
          path="/products"
          element={<Products />}
        />
        <Route
          path="/locations"
          element={<Locations />}
        />
        <Route
          path="/productslocations"
          element={<ProductsLocations />}
        />
        <Route
          path="/categories"
          element={<Categories />}
        />
      </Routes>
    </Router>
  );
}

export default App;
