import Products from "@/components/Products";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              All Products
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover our comprehensive courses and bootcamps designed to help you achieve location independence and build sustainable income streams while traveling.
            </p>
          </div>
          <Products />
        </div>
      </div>
    </div>
  );
}