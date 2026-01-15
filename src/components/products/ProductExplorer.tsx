"use client";
import { useMemo, useState } from "react";
import { Product, SortOption } from "@/types/product";
import { useFavorites } from "@/hooks/useFavourites";
import ProductCard from "./ProductCard";
import HeaderSection from "../Header/HeaderSection";
import FilterSection from "../Filter/FilterSection";
import NoData from "../NoDataSection/NoData";
import Pagination from "../Pagination/Pagination";

interface Props {
  initialProducts: Product[];
}

export default function ProductExplorer({ initialProducts }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortOption>("none");
  const { favorites, toggleFavorite } = useFavorites();
  const ITEMS_PER_PAGE = 4;

  const categories = useMemo(() => {
    return ["all", ...new Set(initialProducts.map((p) => p.category))];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    setCurrentPage(1); // reset pagination on change

    let result = initialProducts
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => (showFavorites ? favorites.includes(p.id) : true));

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, showFavorites, favorites, sort, initialProducts]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <HeaderSection />

        {/* Filters Section */}
        <FilterSection
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          sort={sort}
          setSort={setSort}
        />

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600 font-medium">
            {paginatedProducts.length}{" "}
            {paginatedProducts.length === 1 ? "product" : "products"} found
          </p>
          {favorites.length > 0 && (
            <p className="text-sm text-gray-500">
              {favorites.length}{" "}
              {favorites.length === 1 ? "favorite" : "favorites"}
            </p>
          )}
        </div>

        {/* Products Grid */}
        {paginatedProducts.length === 0 ? (
          <NoData />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={() => toggleFavorite(product.id)}
              />
            ))}
          </div>
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
