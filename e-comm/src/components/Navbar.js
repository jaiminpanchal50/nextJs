import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">
                    <Link href="/">BrandName</Link>
                </div>

                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
                    <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">Products</Link>
                    <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About</Link>
                    <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link>
                </div>

                <button className="md:hidden text-gray-600 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>

    );
};

export default Navbar;