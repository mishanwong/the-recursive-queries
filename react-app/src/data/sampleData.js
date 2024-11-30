export const url = "http://classwork.engr.oregonstate.edu:7641/";

export const customers = [
  { customerId: 1, name: "Sam S" },
  { customerId: 2, name: "MJ Lee" },
  { customerId: 3, name: "Kate Cole" },
  { customerId: 4, name: "Abdul Smith" },
  { customerId: 5, name: "Sven Garcia" },
];

export const categories = [
  { categoryId: 1, name: "Health and Beauty" },
  { categoryId: 2, name: "Snacks" },
  { categoryId: 3, name: "Paper" },
  { categoryId: 4, name: "Prepared Food" },
  { categoryId: 5, name: "Drinks" },
];

export const locations = [
  { locationId: 1, aisle: "A", shelf: "1", slot: "2", capacity: 2 },
  { locationId: 3, aisle: "B", shelf: "2", slot: "4", capacity: 1 },
  { locationId: 3, aisle: "D", shelf: "2", slot: "3", capacity: 4 },
  { locationId: 4, aisle: "A", shelf: "5", slot: "4", capacity: 3 },
  { locationId: 5, aisle: "B", shelf: "4", slot: "5", capacity: 2 },
];

export const products = [
  {
    productId: 1,
    category: "Paper",
    name: "Pocker Wet Tissues",
    unitPrice: "3.99",
  },
  {
    productId: 2,
    category: "Snacks",
    name: "Yum Shrimp Chips",
    unitPrice: "2.50",
  },
  {
    productId: 3,
    category: "Health and Beauty",
    name: "Travel Toothbrush Set",
    unitPrice: "5.00",
  },
  {
    productId: 4,
    category: "Prepared Food",
    name: "Healthy Chicken Rice Set",
    unitPrice: "8.25",
  },
  {
    productId: 5,
    category: "Drinks",
    name: "Super Sparkling Water",
    unitPrice: "2.00",
  },
];

export const productsLocations = [
  {
    productLocationId: 1,
    product: "Pocket Wet Tissues",
    location: "B-2-4",
    quantity: 3,
  },
  {
    productLocationId: 2,
    product: "Yum Shrimp Chips",
    location: "A-5-4",
    quantity: 6,
  },
  {
    productLocationId: 3,
    product: "Travel Toothbrush Set",
    location: "A-1-2",
    quantity: 4,
  },
  {
    productLocationId: 4,
    product: "Healthy Chicken Rice Set",
    location: "B-4-5",
    quantity: 8,
  },
  {
    productLocationId: 5,
    product: "Super Sparkling Water",
    location: "D-2-3",
    quantity: 12,
  },
];

export const sales = [
  { saleId: 1, date: "2024-06-06", customer: "Sam S" },
  { saleId: 2, date: "2024-06-30", customer: "MJ Lee" },
  { saleId: 3, date: "2024-07-14", customer: "Kate Cole" },
];

export const salesProducts = [
  {
    saleProductId: 1,
    product: "Yum Shrimp Chips",
    saleId: 1,
    quantity: 2,
    lineTotal: "5.00",
  },
  {
    saleProductId: 2,
    product: "Healthy Chicken Rice Set",
    saleId: 1,
    quantity: 1,
    lineTotal: "8.25",
  },
  {
    saleProductId: 3,
    product: "Travel Toothbrush Set",
    saleId: 3,
    quantity: 1,
    lineTotal: "5.00",
  },
  {
    saleProductId: 4,
    product: "Super Sparkling Water",
    saleId: 3,
    quantity: 5,
    lineTotal: "10.00",
  },
  {
    saleProductId: 5,
    product: "Pocket Wet Tissue",
    saleId: 3,
    quantity: 3,
    lineTotal: "11.97",
  },
];

export const salesHeaders = [
  { label: "ID", name: "saleId" },
  { label: "Date", name: "date" },
  { label: "Customer", name: "customer" },
];
export const customersHeaders = ["ID", "Name"];
export const salesProductsHeaders = [
  { label: "ID", name: "saleProductId" },
  { label: "Product", name: "name" },
  { label: "Sale ID", name: "saleId" },
  { label: "Quantity", name: "quantity" },
  { label: "Subtotal", name: "lineTotal" },
];
export const productsHeaders = ["ID", "Name", "Category", "Unit Price"];
export const locationsHeaders = ["ID", "Aisle", "Shelf", "Slot", "Capacity"];
export const productsLocationsHeaders = [
  "ID",
  "Product",
  "Location",
  "Quantity",
];
