// File: src/component/DashboardGuest/Footer.jsx

import React from 'react';

// Kita bisa definisikan style untuk link di sini agar tidak berulang
const footerLinkStyle = { 
  color: 'var(--color-cream)', 
  opacity: 0.8 
};
const footerLinkHoverStyle = "hover:opacity-100 hover:underline transition-opacity";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: 'var(--color-coffee-dark)' }}
      className="p-4"
    >
      <div className="container mx-auto flex justify-between items-center text-sm">
        
        {/* Kiri: Copyright */}
        <p style={{ color: 'var(--color-cream)', opacity: 0.6 }}>
          &copy; {new Date().getFullYear()} FAF Grind & Learn. All Rights Reserved.
        </p>

        {/* Kanan: Link Tambahan */}
        <div className="flex space-x-6">
          <a href="/privacy-policy" style={footerLinkStyle} className={footerLinkHoverStyle}>
            Privacy Policy
          </a>
          <a href="/terms-of-service" style={footerLinkStyle} className={footerLinkHoverStyle}>
            Terms of Service
          </a>
        </div>

      </div>
    </footer>
  );
}