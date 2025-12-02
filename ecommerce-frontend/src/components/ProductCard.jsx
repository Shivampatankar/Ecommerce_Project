import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  console.log('Product data:', product);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    try {
      await dispatch(addToCart({ 
        userId: user.id, 
        productId: product.id, 
        qty: 1 
      })).unwrap();
      // Refresh cart after adding item
      dispatch(fetchCart(user.id));
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-200 mb-4">
        <img
          src={product.productImageUrl || '/placeholder-product.jpg'}
          alt={product.productName || product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
          }}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">{product.productName || product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.productDescription || product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">{product.productPrice || product.price}</span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
        {isAuthenticated && (
          <div className="flex space-x-2">
            <Link 
              to={`/products/${product.id}`}
              className="flex-1 btn-secondary text-center"
            >
              View Details
            </Link>
            {user?.userRole !== 'ADMIN' && (
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;