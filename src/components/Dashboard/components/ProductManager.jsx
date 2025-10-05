'use client';
import { Plus } from 'lucide-react';

export default function ProductManager({ formData, handleInputChange, handleProductSubmit }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl max-w-3xl">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) =>
                  handleInputChange("productName", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Price *
              </label>
              <input
                type="number"
                value={formData.productPrice}
                onChange={(e) =>
                  handleInputChange("productPrice", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              rows="4"
              value={formData.productDescription}
              onChange={(e) =>
                handleInputChange("productDescription", e.target.value)
              }
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Product Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <div className="space-y-2">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600">
                  Drop images here or click to browse
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              onClick={handleProductSubmit}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
