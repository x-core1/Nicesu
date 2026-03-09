import axios from "./axios"
import type { Product } from "../types/product"

const BASE_URL: string = "https://crud-api-production-6ec0.up.railway.app"

export const getProducts = () => {
  return axios.get<Product[]>(`${BASE_URL}/products`)
}

export const createProduct = (data: Omit<Product, "id">) => {
  return axios.post(`${BASE_URL}/products`, data)
}

export const updateProduct = (id: number, data: Partial<Product>) => {
  return axios.put(`${BASE_URL}/products/${id}`, data)
}

export const deleteProduct = (id: number) => {
  return axios.delete(`${BASE_URL}/products/${id}`)
}