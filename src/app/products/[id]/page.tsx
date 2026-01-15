import { fetchProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import {
  Share2,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  try {
    const product = await fetchProductById(id);

    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft size={16} />
              Back to Products
            </Link>
            <span>/</span>
            <span className="text-gray-400">{product?.category}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Product Details</span>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-12">
              {/* Product Image Section */}
              <div className="relative">
                <div className="sticky top-8">
                  {/* Main Image */}
                  <div className="relative bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden group">
                    <img
                      src={product?.image}
                      alt={product?.title}
                      className="w-full h-125 object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Action Buttons */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3">
                      <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="flex flex-col">
                {/* Category */}
                <span className="inline-block text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">
                  {product?.category}
                </span>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {product?.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.floor(product?.rating?.rate)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">
                    {product?.rating?.rate} ({product?.rating?.count} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-5xl font-bold bg-linear-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                    ${product?.price}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    Product Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product?.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-8">
                  <button className="flex-1 bg-linear-to-r from-blue-700 to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer">
                    <ShoppingCart size={24} />
                    Add to Cart
                  </button>
                  <button className="cursor-pointer px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    Buy Now
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t-2 border-gray-100">
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-linear-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow duration-300">
                    <div className="p-3 bg-blue-100 rounded-full mb-3">
                      <Truck className="text-blue-600" size={24} />
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      Free Delivery
                    </span>
                    <span className="text-xs text-gray-600 mt-1">
                      On orders over $50
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-linear-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow duration-300">
                    <div className="p-3 bg-green-100 rounded-full mb-3">
                      <Shield className="text-green-600" size={24} />
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      Secure Payment
                    </span>
                    <span className="text-xs text-gray-600 mt-1">
                      100% protected
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-linear-to-br from-orange-50 to-red-50 hover:shadow-lg transition-shadow duration-300">
                    <div className="p-3 bg-orange-100 rounded-full mb-3">
                      <RotateCcw className="text-orange-600" size={24} />
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      Easy Returns
                    </span>
                    <span className="text-xs text-gray-600 mt-1">
                      30-day guarantee
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
