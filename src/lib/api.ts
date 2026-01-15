import { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }

  const text = await res.text();

  if (!text) {
    throw new Error("Empty response from API");
  }

  return JSON.parse(text);
}
