'use client';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  addToCart,
  clearCart,
} from '@/lib/features/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  // Remove one item completely
  const handleRemoveItem = (id: number) => {
    // Remove all quantities of this item
    dispatch({
      type: 'cart/removeFromCart',
      payload: id,
      meta: { removeAll: true },
    });
  };

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
    <div className="max-w-3xl mx-auto mt-32 p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded shadow p-4 gap-4"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={80}
              height={80}
              className="rounded object-cover"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-gray-500 text-sm">{item.category}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold">${item.price}</span>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2"
                  aria-label="Decrease quantity"
                >
                  <FaMinus />
                </button>
                <span className="px-2 font-semibold">{item.quantity}</span>
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2"
                  aria-label="Increase quantity"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-bold text-lg">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-2 text-red-500 hover:text-red-700 p-2"
                aria-label="Remove item"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8 border-t pt-4">
        <button
          onClick={() => dispatch(clearCart())}
          className="text-red-500 hover:underline"
        >
          Clear Cart
        </button>
        <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-semibold">
          Checkout
        </button>
      </div>
    </div>
  );
}
