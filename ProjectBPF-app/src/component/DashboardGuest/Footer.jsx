import React from "react";
import logo from "../../assets/FAF Logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaRss,
  FaGoogle,
  FaFlickr,
} from "react-icons/fa";

const footerLinkStyle = {
  color: "var(--color-cream)",
  opacity: 0.8,
};

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--color-coffee-dark)" }}
      className="pt-10 px-4 text-sm"
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        {/* 1. LOGO */}
        <div>
          <img src={logo} alt="Logo" className="w-28 mb-2" />
          <p className="text-lg" style={{ color: "var(--color-cream)" }}>
            - Brew. Learn. Repeat.
          </p>
        </div>

        {/* 2. Link ke PCR */}
        <div>
          <h2 style={{ ...footerLinkStyle, fontWeight: "bold" }}
          className="text-lg">
            Check Politeknik Caltex Riau!
          </h2>
          <a
            href="https://pcr.ac.id/"
            style={footerLinkStyle}
            className="hover:opacity-100 hover:underline transition-opacity"
          >
            Our Website
          </a>
          <br />
          <a
            href="https://www.youtube.com/@PoliteknikCaltexRiauOfficial"
            style={footerLinkStyle}
            className="hover:opacity-100 hover:underline transition-opacity"
          >
            Our Youtube
          </a>
          <br />
          <a
            href="https://www.instagram.com/politeknikcaltexriau/"
            style={footerLinkStyle}
            className="hover:opacity-100 hover:underline transition-opacity"
          >
            Our Instagram
          </a>
        </div>

        {/* 3. Link FAF */}
        <div>
          <h2 style={{ ...footerLinkStyle, fontWeight: "bold" }}
          className="text-lg">
            FAF Developer!
          </h2>
          <a
            href="https://www.instagram.com/bertttt11/"
            style={footerLinkStyle}
            className="hover:opacity-100 hover:underline transition-opacity"
          >
            Albert's Instagram
          </a>
          <br />
          <a
            href="https://www.instagram.com/frh_geaks/"
            style={footerLinkStyle}
            className="hover:opacity-100 hover:underline transition-opacity"
          >
            Farizy's Instagram
          </a>
          <br />
          <a
            href="http://instagram.com/febriana_tan/"
            style={footerLinkStyle}
            className="hover:opacity-100 hover:underline transition-opacity"
          >
            Febriana's Instagram
          </a>
        </div>

        {/* 4. Guest Website*/}
        <div>
          <h2 style={{ ...footerLinkStyle, fontWeight: "bold" }}
          className="text-lg">
            FAF!
          </h2>
          <a
            href="/guest/program"
            style={footerLinkStyle}
            className="hover:opacity-100 hover:underline transition-opacity"
          >
            Programs
          </a>
          <br />
          <a
            href="/guest/artikel"
            style={footerLinkStyle}
            className="hover:opacity-100 hover:underline transition-opacity"
          >
            Artikel
          </a>
          <br />
          <a
            href="/guest/faq"
            style={footerLinkStyle}s
            className="hover:opacity-100 hover:underline transition-opacity"
          >
            FAQ
          </a>
          <br />
          <a
            href="/guest/about-us"
            style={footerLinkStyle}
            className="hover:opacity-100 hover:underline transition-opacity"
          >
            About Us
          </a>
          <br />
        </div>
      </div>

      {/* Social Media dan Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center">
        <div className="flex justify-center space-x-6 text-white text-xl mb-4">
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookF className="hover:opacity-80 transition-opacity" />
          </a>
          <a
            href="https://twitter.com/yourpage"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter className="hover:opacity-80 transition-opacity" />
          </a>
          <a href="https://rss.yoursite.com" target="_blank" rel="noreferrer">
            <FaRss className="hover:opacity-80 transition-opacity" />
          </a>
          <a
            href="https://plus.google.com/yourpage"
            target="_blank"
            rel="noreferrer"
          >
            <FaGoogle className="hover:opacity-80 transition-opacity" />
          </a>
          <a
            href="https://flickr.com/yourpage"
            target="_blank"
            rel="noreferrer"
          >
            <FaFlickr className="hover:opacity-80 transition-opacity" />
          </a>
        </div>
        <p
          style={{ color: "var(--color-cream)", opacity: 0.6 }}
          className="text-sm"
        >
          &copy; {new Date().getFullYear()} FAF Grind & Learn. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
