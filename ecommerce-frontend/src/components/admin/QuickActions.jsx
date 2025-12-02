import { useState } from 'react';
import { Link } from 'react-router-dom';

const QuickActions = ({ stats }) => {
  const [showActions, setShowActions] = useState(false);

  const actions = [
    {
      title: 'Add Product',
      description: 'Add new product to inventory',
      link: '/admin/add-product',
      icon: '📦',
      color: 'bg-blue-500'
    },
    {
      title: 'Add Category',
      description: 'Create new product category',
      link: '/admin/add-category',
      icon: '🏷️',
      color: 'bg-green-500'
    },
    {
      title: 'Low Stock Alert',
      description: `${stats.lowStockProducts} products need restocking`,
      link: '/admin/products',
      icon: '⚠️',
      color: 'bg-yellow-500',
      urgent: stats.lowStockProducts > 0
    },
    {
      title: 'Out of Stock',
      description: `${stats.outOfStockProducts} products unavailable`,
      link: '/admin/products',
      icon: '❌',
      color: 'bg-red-500',
      urgent: stats.outOfStockProducts > 0
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        <button
          onClick={() => setShowActions(!showActions)}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          {showActions ? 'Hide' : 'Show'} Actions
        </button>
      </div>
      
      {showActions && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                action.urgent 
                  ? 'border-red-200 bg-red-50 hover:border-red-300' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{action.icon}</span>
                <div>
                  <h4 className={`font-medium ${action.urgent ? 'text-red-800' : 'text-gray-900'}`}>
                    {action.title}
                  </h4>
                  <p className={`text-sm ${action.urgent ? 'text-red-600' : 'text-gray-600'}`}>
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickActions;