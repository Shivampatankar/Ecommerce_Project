import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  useEffect(() => {
    if (user?.id) {
      fetchCart();
    }
  }, [user?.id]);

  const fetchCart = async () => {
    try {
      const response = await api.get(`/api/cart/${user.id}`);
      const cartData = response.data;

      const transformedItems = (cartData.items || []).map((item) => ({
        id: item.id,
        product: {
          id: item.productId,
          name: item.productName,
          price: item.price,
          imageUrl: item.productImageUrl || "/placeholder-product.jpg",
        },
        quantity: item.qty,
      }));

      setItems(transformedItems);
      setTotalAmount(cartData.total || 0);

      if (transformedItems.length === 0) {
        navigate("/cart");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setItems([]);
        setTotalAmount(0);
        navigate("/cart");
      }
    }
  };

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Debug token
      const token = localStorage.getItem("token");
      console.log("Token exists:", !!token);
      console.log("Token length:", token?.length);

      var str = await api.post(`/api/orders/place/${user.id}`, {
        amount: totalAmount.toFixed(2),
      });
      console.log(str.data);
      var options = {
        key: "rzp_test_RmRzXWbFCKS1fx", 
        amount: str.data.amount, 
        currency: "INR",
        name: "Order payment",
        description: "checkout Transaction",
        image: "../../images/Suraj.png",
        order_id: str.data.id, 
        handler: async function (response) {
          try {
            console.log("Payment successful:", response.razorpay_payment_id);
            // Clear cart from backend
            await api.delete(`/api/cart/clear/${user.id}`);
            setItems([]);
            setTotalAmount(0);
            toast.success("Order placed successfully!");
            navigate("/orders");
          } catch (error) {
            console.error("Failed to clear cart:", error);
            // Still proceed with success flow
            setItems([]);
            setTotalAmount(0);
            toast.success("Order placed successfully!");
            navigate("/orders");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          address: "Razorpay ecommerce",
        },
        theme: {
          color: "#3399cc",
        },
      };
      let rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
        alert("OOPs payment failed!!1");
      });
     
      rzp1.open();
     
    } catch (error) {
      console.error("Order placement failed:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      console.error("User:", user);
      const errorMsg =
        error.response?.data?.message ||
        `Failed to place order (${error.response?.status}). Please try again.`;
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Shipping Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  disabled
                  className="input-field bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="input-field bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  className="input-field"
                  placeholder="Enter your address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="input-field"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    className="input-field"
                    placeholder="State"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    className="input-field"
                    placeholder="ZIP Code"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="input-field"
                    placeholder="Phone Number"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.product.imageUrl || "/placeholder-product.jpg"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={
                loading ||
                !shippingInfo.address ||
                !shippingInfo.city ||
                !shippingInfo.state ||
                !shippingInfo.zipCode ||
                !shippingInfo.phone
              }
              className="w-full btn-primary mt-6 flex justify-center items-center"
            >
              {loading ? (
                <Loader size="sm" />
              ) : (
                `Pay ₹${totalAmount.toFixed(2)}`
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By placing this order, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
