import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const AdminEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    stock: '',
    productImageUrl: '',
    categoryId: '',
  });

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
      await fetchProduct();
    };
    loadData();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/api/products/${id}`);
      const product = response.data;
      console.log('Product data:', product);
      console.log('Available categories:', categories);
      
      // Find category ID by name since backend doesn't return categoryId
      const category = categories.find(cat => cat.name === product.categoryName);
      console.log('Found category:', category);
      
      setFormData({
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
        stock: product.stock,
        productImageUrl: product.productImageUrl,
        categoryId: category ? category.id.toString() : '',
      });
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Failed to load product');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
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
    setUpdating(true);

    try {
      const productData = {
        productName: formData.productName,
        productDescription: formData.productDescription,
        productPrice: parseFloat(formData.productPrice),
        stock: parseInt(formData.stock),
        productImageUrl: formData.productImageUrl,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : categories[0]?.id,
      };

      await api.put(`/api/products/${id}`, productData);
      toast.success('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Failed to update product:', error);
      console.error('Error response:', error.response?.data);
      toast.error('Failed to update product. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/products')}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Products
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                required
                className="input-field"
                placeholder="Enter product name"
                value={formData.productName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="productDescription"
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
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="productPrice"
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
              <label htmlFor="productImageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="productImageUrl"
                name="productImageUrl"
                className="input-field"
                placeholder="/images/products/nike.jpg or https://example.com/image.jpg"
                value={formData.productImageUrl}
                onChange={handleChange}
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 btn-primary flex justify-center items-center"
              >
                {updating ? <Loader size="sm" /> : 'Update Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
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

export default AdminEditProduct;