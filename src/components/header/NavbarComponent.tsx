'use client';

import Link from 'next/link';
import { navLink } from './menu';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectCartCount } from '@/lib/features/cartSlice';

export default function NavbarComponent() {
  const pathname = usePathname();
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    const toggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (toggle && mobileMenu) {
      const handleClick = () => {
        mobileMenu.classList.toggle('hidden');
      };
      toggle.addEventListener('click', handleClick);

      // Cleanup event listener on unmount
      return () => {
        toggle.removeEventListener('click', handleClick);
      };
    }
  }, []);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* <!-- Logo --> */}
          <div className="flex-shrink-0 text-white text-2xl font-bold">
            MyBrand
          </div>

          {/* <!-- Desktop Menu --> */}
          <div className="hidden md:flex space-x-6 text-white font-medium">
            {navLink.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`${
                  pathname === item.path ? 'text-amber-300' : ''
                }hover:text-yellow-300 transition`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* <!-- Desktop Button and Cart Icon --> */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="bg-white text-indigo-700 px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold"
            >
              Get Started
            </a>
            <Link
              href="/cart"
              className="relative text-white text-2xl hover:text-yellow-300 transition"
            >
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* <!-- Mobile Menu Button --> */}
          <div className="md:hidden">
            <button
              id="menu-toggle"
              className="text-white focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile Menu --> */}
      <div
        id="mobile-menu"
        className="md:hidden hidden px-4 pb-4 space-y-2 text-white font-medium"
      >
        {navLink.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`${
              pathname === item.path ? 'text-black' : ''
            }hover:text-yellow-300 transition`}
          >
            {item.name}
          </Link>
        ))}
        <a
          href="#"
          className="block bg-white text-indigo-700 text-center px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold mt-2"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
