'use client';
import { Plus } from 'lucide-react';

export default function BlogManager({ formData, handleInputChange, handleBlogSubmit }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Create New Blog Post</h2>
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl max-w-4xl">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              value={formData.blogTitle}
              onChange={(e) => handleInputChange("blogTitle", e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter an engaging title"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Featured Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <div className="space-y-2">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600">Upload featured image</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Content *
            </label>
            <textarea
              rows="10"
              value={formData.blogContent}
              onChange={(e) => handleInputChange("blogContent", e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Write your blog content here..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                value={formData.blogCategory}
                onChange={(e) =>
                  handleInputChange("blogCategory", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select category</option>
                <option value="health">Health Tips</option>
                <option value="treatments">Treatments</option>
                <option value="wellness">Wellness</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.blogTags}
                onChange={(e) => handleInputChange("blogTags", e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="health, wellness, tips"
              />
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
              onClick={handleBlogSubmit}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
