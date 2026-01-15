import { Search } from "lucide-react";

const NoData = () => {
  return (
    <div className="text-center py-20">
      <div className="inline-block p-8 bg-white rounded-full shadow-lg mb-4">
        <Search size={48} className="text-gray-300" />
      </div>
      <p className="text-2xl font-semibold text-gray-700 mb-2">
        No products found
      </p>
      <p className="text-gray-500">
        Try adjusting your filters or search terms
      </p>
    </div>
  );
};

export default NoData;
