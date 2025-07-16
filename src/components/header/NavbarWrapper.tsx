'use client';
import { usePathname } from "next/navigation";
import NavbarComponent from "./NavbarComponent";

export default function NavbarWrapper() {
    const pathname = usePathname();
    const hiddenPaths = ['/dashboard', '/home', '/blog-dashboard', '/regiter', '/login'];
     const shouldHideNavbar = hiddenPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
    if (shouldHideNavbar) return null;

    return <NavbarComponent />;
}
