import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <Link to="/">
            <img src="/logo.png" alt="Ecom logo" className="w-32" />
          </Link>
          <p className="mt-2 text-sm">
            Sustainable Shopping for a Greener Tommorow.
          </p>
          <p className="mt-2 text-sm">
            123 Green Street, Eco City, Earth 10001
          </p>
          <p className="mt-2 text-sm">Email: support@ecoKart.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>
        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold">Customer Care</h3>
          <ul className="mt-2 text-sm space-y-2">
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/order-tracking">Order Tracking</Link>
            </li>
            <li>
              <Link to="/shipping-returns">Shipping & Returns</Link>
            </li>
            <li>
              <Link to="/eco-guide">Eco-Friendly Guide</Link>
            </li>
          </ul>
        </div>
        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-semibold">Join Our Green Community</h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="h-6 w-6 hover:text-blue-500" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="h-6 w-6 hover:text-pink-500" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPinterest className="h-6 w-6 hover:text-red-500" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitterSquare className="h-6 w-6 hover:text-blue-400" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-x1 font-semibold">Stay in the Loop</h3>
          <p className="mt-2 text-sm">
            Subscribe to get the latest eco deals and updates.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-2 py-1 rounded-1-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button className="bg-green-600 text-white px-4 py-2  rounded-r-md hover:bg-green-700 transition">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} EcoKart. All rights reserved. | Made
          with ❤️ for the planet
        </p>
      </div>
    </footer>
  );
}

export default Footer;
