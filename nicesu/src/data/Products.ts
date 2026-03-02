export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: "HOT" | "NEW";
}

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 180,
    image: "/images/shoe1.png",
    badge: "HOT",
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    price: 200,
    image: "/images/shoe2.png",
    badge: "NEW",
  },
  {
    id: 3,
    name: "New Balance 550",
    price: 150,
    image: "/images/shoe3.png",
  },
  {
    id: 4,
    name: "Puma RS-X",
    price: 170,
    image: "/images/shoe4.png",
    badge: "HOT",
  },
  {
    id: 5,
    name: "Converse Run Star",
    price: 140,
    image: "/images/shoe5.png",
  },
  {
    id: 6,
    name: "Vans Old Skool",
    price: 120,
    image: "/images/shoe6.png",
    badge: "NEW",
  },
];
