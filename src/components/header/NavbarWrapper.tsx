'use client';
import { usePathname } from 'next/navigation';
import NavbarComponent from './NavbarComponent';

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/home') ||
    pathname.startsWith('/blog-dashboard')
  ) {
    return null;
  }
  return <NavbarComponent />;
}
