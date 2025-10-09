'use client';
import { useState, useEffect } from 'react';
import { Plus, UploadCloud, X, Edit, Trash2, Loader2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    _id: null,
    title: '',
    content: '',
    category: '',
    tags: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsCompressing(true);
    setError(null);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);

    } catch (compressionError) {
      console.error('Image compression error:', compressionError);
      setError('Failed to compress image. Please try a different image.');
    } finally {
      setIsCompressing(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const resetForm = () => {
    setFormData({ _id: null, title: '', content: '', category: '', tags: '' });
    removeImage();
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    if (!formData.title || !formData.content || !formData.category) {
      setError('Please fill all required fields.');
      return;
    }
    if (!formData._id && !image) {
        setError('Please upload an image for a new post.');
        return;
    }

    setIsSaving(true);
    try {
      const method = formData._id ? 'PUT' : 'POST';
      const url = formData._id ? `/api/blogs?id=${formData._id}` : '/api/blogs';
      const body = { ...formData, tags: formData.tags.toString(), image };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || `Failed to ${formData._id ? 'update' : 'publish'} blog.`);
      }

      setSuccess(`Blog ${formData._id ? 'updated' : 'published'} successfully!`);
      resetForm();
      fetchBlogs();

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 4000);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      category: blog.category,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
    });
    setImagePreview(blog.imageUrl);
    setImage(null); // Don't set image data unless a new one is chosen
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDeleteModal = (blog) => {
    setBlogToDelete(blog);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setBlogToDelete(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    setIsSaving(true);
    try {
      const response = await fetch(`/api/blogs?id=${blogToDelete._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete blog');
      setSuccess('Blog deleted successfully!');
      fetchBlogs();
      closeDeleteModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{formData._id ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl max-w-4xl">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Blog Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter an engaging title"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Featured Image *</label>
              {imagePreview ? (
                  <div className='relative group w-full h-72 rounded-xl overflow-hidden'>
                      <img src={imagePreview} alt="Preview" className='w-full h-full object-cover' />
                      <button onClick={removeImage} className='absolute top-3 right-3 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity'>
                          <X size={20}/>
                      </button>
                  </div>
              ) : (
                  <label htmlFor='image-upload' className=" rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <div className="space-y-2">
                          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <UploadCloud className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-gray-600">Click to upload a featured image</p>
                          <p className='text-xs text-gray-500'>PNG, JPG, WEBP (Max 1MB)</p>
                      </div>
                      <input id='image-upload' type='file' accept='image/png, image/jpeg, image/webp' className='hidden' onChange={handleImageChange} />
                  </label>
              )}
               {isCompressing && (
                <div className="flex items-center justify-center mt-4 text-gray-600">
                  <Loader2 className="animate-spin mr-2" />
                  <p>Compressing image, please wait...</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Content *</label>
              <textarea
                rows="10"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Health Tips">Health Tips</option>
                  <option value="Treatments">Treatments</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Hijama">Hijama</option>
                  <option value="Acupuncture">Acupuncture</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="e.g. health, wellness, tips"
                />
              </div>
            </div>

            <div className='space-y-2 pt-2'>
              {error && <div className='text-red-600 bg-red-100 p-3 rounded-lg text-sm'>{error}</div>}
              {success && <div className='text-green-600 bg-green-100 p-3 rounded-lg text-sm'>{success}</div>}
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleSubmit}
              disabled={isSaving || isCompressing}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSaving ? <><Loader2 className="animate-spin mr-2" />{formData._id ? 'Updating...' : 'Publishing...'}</> : (formData._id ? 'Update Post' : 'Publish Post')}
            </button>
            {formData._id && (
              <button onClick={resetForm} className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold">Cancel Edit</button>
            )}
          </div>
        </div>
      </div>

      {/* Blog List Section */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Blogs</h2>
        {isLoading ? (
          <div className="flex justify-center items-center p-8"><Loader2 className="animate-spin text-blue-500" size={32} /></div>
        ) : error ? (
          <div className='text-red-600 bg-red-100 p-3 rounded-lg'>{error}</div>
        ) : (
          <div className="space-y-4">
            {blogs.map(blog => (
              <div key={blog._id} className="flex items-center justify-between bg-white/50 p-4 rounded-lg shadow-sm">
                <div>
                  <h3 className="font-semibold">{blog.title}</h3>
                  <p className="text-sm text-gray-500">{blog.category} - {new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(blog)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"><Edit size={18} /></button>
                  <button onClick={() => openDeleteModal(blog)} className="p-2 text-red-600 hover:bg-red-100 rounded-full"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full">
            <h3 className="text-lg font-bold">Confirm Deletion</h3>
            <p className="text-gray-600 my-4">Are you sure you want to delete the blog post "{blogToDelete?.title}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button onClick={closeDeleteModal} className="px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200">Cancel</button>
              <button onClick={handleDelete} disabled={isSaving} className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 flex items-center">
                {isSaving && <Loader2 className="animate-spin mr-2" size={16} />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}