'use client';
import { usePathname } from 'next/navigation';
import { AppSidebar } from './SidebarComponent';

export default function SidebarWrapper() {
  const pathname = usePathname();
  const hiddenPaths = ['/', '/register', '/login', '/home', '/product'];
  const shouldHideSidebar = hiddenPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  if (shouldHideSidebar) return null;

  return <AppSidebar />;
}
