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
    categoryId: 1,
    name: "Pocker Wet Tissues",
    unitPrice: 3.99,
  },
  { productId: 2, categoryId: 1, name: "Yum Shrimp Chips", unitPrice: 2.5 },
  {
    productId: 3,
    categoryId: 1,
    name: "Travel Toothbrush Set",
    unitPrice: 5.0,
  },
  {
    productId: 4,
    categoryId: 1,
    name: "Healthy Chicken Rice Set",
    unitPrice: 8.25,
  },
  {
    productId: 5,
    categoryId: 1,
    name: "Super Sparkling Water",
    unitPrice: 2,
  },
];

export const producstLocations = [
  { productLocationId: 1, productId: 1, locationId: 2, quantity: 5 },
  { productLocationId: 2, productId: 1, locationId: 2, quantity: 5 },
  { productLocationId: 3, productId: 1, locationId: 2, quantity: 5 },
  { productLocationId: 4, productId: 1, locationId: 2, quantity: 5 },
  { productLocationId: 5, productId: 1, locationId: 2, quantity: 5 },
];

export const sales = [
  { saleId: 1, date: "2024-06-06", customerId: 1 },
  { saleId: 2, date: "2024-06-30", customerId: 2 },
  { saleId: 3, date: "2024-07-14", customerId: 3 },
];

export const salesProducts = [
  { saleProductId: 1, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
  { saleProductId: 2, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
  { saleProductId: 3, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
  { saleProductId: 4, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
  { saleProductId: 5, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
];
