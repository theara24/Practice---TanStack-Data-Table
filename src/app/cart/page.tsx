'use client';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  removeFromCart,
  addToCart,
} from '@/lib/features/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // Calculate subtotal and tax (example: 8% tax)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = +(subtotal * 0.08).toFixed(2);
  const grandTotal = +(subtotal + tax).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/product" className="text-blue-500 underline">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow p-6 gap-6 border border-gray-100"
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={90}
                height={90}
                className="rounded-xl object-cover bg-gray-100"
              />
              <div className="flex-1 w-full">
                <div className="font-semibold text-lg">{item.title}</div>
                <div className="font-bold text-xl mt-1">${item.price}</div>
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2"
                  aria-label="Decrease quantity"
                >
                  <FaMinus />
                </button>
                <span className="px-3 font-semibold text-lg">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2"
                  aria-label="Increase quantity"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="flex flex-col items-end ml-4">
                <div className="font-bold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="mt-2 text-red-500 hover:text-red-700 p-2"
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>
              Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)}{' '}
              items)
            </span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold">${grandTotal.toFixed(2)}</span>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-900 transition">
            Proceed to Checkout
          </button>
          <ul className="text-xs text-gray-500 mt-4 space-y-1">
            <li>✓ Secure checkout</li>
            <li>✓ 30-day return policy</li>
            <li>✓ Customer support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
