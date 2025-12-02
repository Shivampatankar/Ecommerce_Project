import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    stock: '',
    productImageUrl: '',
    categoryId: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        productName: formData.productName,
        productDescription: formData.productDescription,
        productPrice: parseFloat(formData.productPrice),
        stock: parseInt(formData.stock),
        productImageUrl: formData.productImageUrl,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
      };


      await api.post('/api/products', productData);
      toast.success('Product added successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Failed to add product:', error);
      console.error('Error response:', error.response?.data);
      toast.error('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="productName"
                required
                className="input-field"
                placeholder="Enter product name"
                value={formData.productName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="productDescription"
                required
                rows={4}
                className="input-field"
                placeholder="Enter product description"
                value={formData.productDescription}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  name="productPrice"
                  required
                  min="0"
                  step="0.01"
                  className="input-field"
                  placeholder="0.00"
                  value={formData.productPrice}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  required
                  min="0"
                  className="input-field"
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                className="input-field"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="productImageUrl"
                className="input-field"
                placeholder="/images/products/nike.jpg or https://example.com/image.jpg"
                value={formData.productImageUrl}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter a valid image URL or leave empty for default placeholder
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary flex justify-center items-center"
              >
                {loading ? <Loader size="sm" /> : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;