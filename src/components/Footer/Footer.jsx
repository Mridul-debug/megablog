import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white border-t border-gray-700">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-6">
          {/* Logo & Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-6 flex items-center space-x-2">
                <Logo width="120px" />
              </div>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Company */}
          <FooterColumn title="Company">
            <FooterLink to="/">Features</FooterLink>
            <FooterLink to="/">Pricing</FooterLink>
            <FooterLink to="/">Affiliate Program</FooterLink>
            <FooterLink to="/">Press Kit</FooterLink>
          </FooterColumn>

          {/* Support */}
          <FooterColumn title="Support">
            <FooterLink to="/">Account</FooterLink>
            <FooterLink to="/">Help</FooterLink>
            <FooterLink to="/">Contact Us</FooterLink>
            <FooterLink to="/">Customer Support</FooterLink>
          </FooterColumn>

          {/* Legals */}
          <FooterColumn title="Legals">
            <FooterLink to="/">Terms & Conditions</FooterLink>
            <FooterLink to="/">Privacy Policy</FooterLink>
            <FooterLink to="/">Licensing</FooterLink>
          </FooterColumn>
        </div>
      </div>
    </section>
  )
}

// Reusable Footer Column
const FooterColumn = ({ title, children }) => (
  <div className="w-full p-6 md:w-1/2 lg:w-2/12">
    <div className="h-full">
      <h3 className="mb-6 text-xs font-bold uppercase tracking-wider text-gray-400">{title}</h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  </div>
)

// Reusable Footer Link
const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-base text-gray-300 transition-all duration-200 hover:text-white hover:translate-x-1 block"
    >
      {children}
    </Link>
  </li>
)

export default Footer
