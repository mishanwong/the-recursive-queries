import React, { useState, useEffect } from "react";
import { Page } from "./Page";
import { url } from "../data/sampleData";

export const SalesProducts = () => {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState(null);
  const [saleIds, setSaleIds] = useState(null);

  useEffect(() => {
    fetchSalesProduct();
    fetchProducts();
    fetchSales();
  }, []);

  const fetchSalesProduct = () => {
    fetch(`${url}/sales_products_browse`)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  const fetchProducts = () => {
    fetch(`${url}/products_browse`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };

  const fetchSales = () => {
    fetch(`${url}/sales_browse`)
      .then((response) => response.json())
      .then((data) => setSaleIds(data));
  };
  const attributes = [
    { label: "ID", name: "saleProductId", type: "id" },
    {
      label: "Product",
      name: "name",
      type: "dropdown",
      options: products,
      displayField: "name",
      add: true,
      update: true,
    },
    {
      label: "Sale ID",
      name: "saleId",
      type: "dropdown",
      options: saleIds,
      displayField: "saleId",
      add: true,
      update: true,
    },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      add: true,
      update: true,
    },
    { label: "Subtotal", name: "lineTotal", type: "text" },
  ];

  return (
    <div>
      <h1>SalesProducts</h1>
      <Page
        sampleData={data}
        attributes={attributes}
        tableName="SaleProduct"
        refresh={fetchSalesProduct}
      />
    </div>
  );
};
