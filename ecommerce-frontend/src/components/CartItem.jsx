import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart, fetchCart } from '../store/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  

  
  const handleRemove = async () => {
    const itemId = item.id || item.cartItemId;
    if (itemId) {
      await dispatch(removeFromCart(itemId));
      dispatch(fetchCart(user.id));
    }
  };

  const handleUpdateQuantity = async (newQty) => {
    if (newQty > 0) {
      const itemId = item.id || item.cartItemId;
      if (itemId) {
        await dispatch(removeFromCart(itemId));
        await dispatch(addToCart({ 
          userId: user.id, 
          productId: item.product?.id || item.productId, 
          qty: newQty 
        }));
        dispatch(fetchCart(user.id));
      }
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200">
      <img
        src={item.product?.productImageUrl || item.productImageUrl || '/placeholder-product.jpg'}
        alt={item.product?.productName || item.productName || 'Product'}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.product?.productName || item.productName || 'Unknown Product'}</h3>
        <p className="text-sm text-gray-500">₹{(item.price || 0).toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleUpdateQuantity(item.qty - 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          disabled={item.qty <= 1}
        >
          -
        </button>
        <span className="w-8 text-center">{item.qty}</span>
        <button
          onClick={() => handleUpdateQuantity(item.qty + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <div className="text-right">
        <p className="font-medium">₹{(item.price * item.qty).toFixed(2)}</p>
        <button
          onClick={handleRemove}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;