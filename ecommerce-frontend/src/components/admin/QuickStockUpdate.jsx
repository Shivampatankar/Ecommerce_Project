import { useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const QuickStockUpdate = ({ product, onUpdate }) => {
  const [stock, setStock] = useState(product.stock);
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    if (stock === product.stock) return;
    
    setUpdating(true);
    try {
      await api.put(`/api/products/${product.id}`, {
        ...product,
        stock: parseInt(stock)
      });
      toast.success('Stock updated!');
      onUpdate();
    } catch (error) {
      toast.error('Failed to update stock');
      setStock(product.stock);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
        min="0"
      />
      {stock != product.stock && (
        <button
          onClick={handleUpdate}
          disabled={updating}
          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {updating ? '...' : 'Update'}
        </button>
      )}
    </div>
  );
};

export default QuickStockUpdate;