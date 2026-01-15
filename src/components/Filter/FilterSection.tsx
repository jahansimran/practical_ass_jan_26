import { Filter, Heart, Search, X } from "lucide-react";

interface FilterSectionProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: string[];
  showFavorites: boolean;
  setShowFavorites: (value: boolean) => void;
  sort: "none" | "price-asc" | "price-desc";
  setSort: (v: "none" | "price-asc" | "price-desc") => void;
}

const FilterSection = ({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  showFavorites,
  setShowFavorites,
  sort,
  setSort,
}: FilterSectionProps) => {
  return (
    <div className="mb-8 rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-white/80">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <Filter
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={20}
          />
          <select
            className="pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 bg-white appearance-none cursor-pointer min-w-50"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {/* Price Sort Dropdown */}
        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as "none" | "price-asc" | "price-desc")
          }
          className="pl-2 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 bg-white appearance-none cursor-pointer min-w-50"
        >
          <option value="none">Sort by price</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>

        {/* Favorites Toggle */}
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            showFavorites
              ? "bg-linear-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Heart size={20} fill={showFavorites ? "currentColor" : "none"} />
          <span className="hidden sm:inline">
            {showFavorites ? "Showing Favorites" : "All Products"}
          </span>
        </button>
      </div>

      {/* Active Filters Display */}
      {(category !== "all" || showFavorites || search) && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">Active filters:</span>
          {search && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Search: "{search}"
            </span>
          )}
          {category !== "all" && (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              Category: {category}
            </span>
          )}
          {showFavorites && (
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              Favorites only
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
