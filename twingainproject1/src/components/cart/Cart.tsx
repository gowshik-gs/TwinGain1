import React from 'react';
import { useCartStore } from '../../lib/store';
import { Trash2, Plus, Minus } from 'lucide-react';
import { createCheckoutSession } from '../../lib/stripe';

export function Cart() {
  const { items, addItem, removeItem } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      await createCheckoutSession(items);
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Add some products to your cart to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Shopping Cart</h2>
      <div className="bg-white shadow-lg rounded-lg">
        <ul role="list" className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.productId} className="flex py-6 px-4">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-1 items-end justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        addItem({ ...item, quantity: Math.max(0, item.quantity - 1) })
                      }
                      className="rounded-md bg-gray-100 p-1 hover:bg-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-gray-600">{item.quantity}</span>
                    <button
                      onClick={() => addItem(item)}
                      className="rounded-md bg-gray-100 p-1 hover:bg-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-lg font-medium text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-200 px-4 py-6">
          <div className="flex justify-between text-lg font-medium text-gray-900">
            <p>Total</p>
            <p>₹{total.toFixed(2)}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}