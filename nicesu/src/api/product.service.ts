import type { Product } from "../types/product";
import { products as initialProducts } from "../data/products";

let products: Product[] = [...initialProducts];

export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...products]), 300);
  });
};

export const addProduct = async (newProduct: Product): Promise<Product> => {
  return new Promise((resolve) => {
    products.push(newProduct);
    resolve(newProduct);
  });
};

export const deleteProduct = async (id: number): Promise<void> => {
  return new Promise((resolve) => {
    products = products.filter((p) => p.id !== id);
    resolve();
  });
};

export const updateProduct = async (updated: Product): Promise<Product> => {
  return new Promise((resolve) => {
    products = products.map((p) =>
      p.id === updated.id ? updated : p
    );
    resolve(updated);
  });
};