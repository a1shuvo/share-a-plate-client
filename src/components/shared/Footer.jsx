import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
          {/* Brand and Description */}
          <div className="space-y-2 max-w-sm">
            <h2 className="text-2xl font-bold text-primary">ShareAPlate</h2>
            <p className="text-sm text-gray-500">
              Connecting surplus food from restaurants to communities in need.
              Together, we reduce waste and fight hunger.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/about" className="link link-hover hover:text-primary">
              About Us
            </Link>
            <Link to="/contact" className="link link-hover hover:text-primary">
              Contact
            </Link>
            <Link to="/privacy" className="link link-hover hover:text-primary">
              Privacy Policy
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex gap-4 justify-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-circle btn-outline hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-circle btn-outline hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-all"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-circle btn-outline hover:text-white hover:bg-pink-500 hover:border-pink-500 transition-all"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-circle btn-outline hover:text-white hover:bg-blue-800 hover:border-blue-800 transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ShareAPlate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
