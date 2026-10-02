import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import {
  Heart,
  Search,
  Phone,
  MapPin,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { User } from '../firebase';

interface NavbarProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenContactModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  onOpenWishlist,
  onOpenContactModal,
  searchQuery,
  setSearchQuery,
  user,
  onLogin,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-red-100">
      {/* Top Banner with Brand Red Theme */}
      <div className="bg-[#E51A24] text-white text-[11px] sm:text-xs py-1.5 px-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex items-center gap-1 font-medium tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-amber-200" />
              <span>Tel Gali, Atarra (210201), Uttar Pradesh</span>
            </span>
            <span className="hidden md:inline opacity-70">|</span>
            <span className="hidden md:flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Sarees • Lehengas • Mens Wear • Coat Suits • Sherwani • Kids Wear</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-[11px]">
            <a
              href="tel:9455212218"
              className="flex items-center gap-1 hover:text-amber-200 transition-colors font-semibold"
            >
              <Phone className="w-3 h-3" />
              <span>9455212218</span>
            </a>
            <span className="opacity-70">/</span>
            <a
              href="tel:7607254842"
              className="hover:text-amber-200 transition-colors hidden sm:inline font-semibold"
            >
              7607254842
            </a>
            <span className="opacity-70 hidden lg:inline">|</span>
            <span className="hidden lg:inline text-amber-200 font-medium">
              Free Delivery Across Atarra & Banda
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <a
            href="#"
            className="flex items-center group py-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <BrandLogo size="md" />
          </a>

          {/* Desktop Nav Links in English */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            <button
              onClick={() => scrollTo('featured-collections')}
              className="hover:text-[#E51A24] transition-colors py-2 flex items-center gap-1"
            >
              <span>Featured Sarees</span>
              <span className="text-[10px] bg-red-100 text-[#E51A24] px-1.5 py-0.5 rounded-full font-bold">
                Special
              </span>
            </button>
            <button
              onClick={() => scrollTo('catalog-section')}
              className="hover:text-[#E51A24] transition-colors py-2"
            >
              All Clothes & Catalog
            </button>
            <button
              onClick={() => scrollTo('size-customization-guide')}
              className="hover:text-[#E51A24] transition-colors py-2"
            >
              Size & Custom Guide
            </button>
            <button
              onClick={() => scrollTo('reviews-section')}
              className="hover:text-[#E51A24] transition-colors py-2"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollTo('location-section')}
              className="hover:text-[#E51A24] transition-colors py-2"
            >
              Showroom & Map
            </button>
          </nav>

          {/* Actions & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="hidden md:flex relative items-center w-44 lg:w-56">
              <input
                type="text"
                placeholder="Search clothes, sarees, suits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-full focus:outline-none focus:border-[#E51A24] focus:ring-1 focus:ring-[#E51A24] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearchMobile(!showSearchMobile)}
              className="md:hidden p-2 text-stone-700 hover:text-[#E51A24]"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-700 hover:text-[#E51A24]"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#E51A24] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Contact Us Direct Button */}
            <button
              onClick={onOpenContactModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#E51A24] text-white hover:bg-red-700 font-bold text-xs rounded-full shadow-md shadow-red-500/25 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </button>

            {/* Google User Profile */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onLogout}
                  className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="hidden sm:flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-full transition-all"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-[#E51A24]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {showSearchMobile && (
          <div className="md:hidden pb-3 px-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sarees, coat suits, sherwani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#E51A24]"
                autoFocus
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1 text-base font-medium text-stone-800">
            <button
              onClick={() => scrollTo('featured-collections')}
              className="w-full text-left py-2 px-3 rounded-md hover:bg-red-50 hover:text-[#E51A24]"
            >
              ✨ Featured Saree Collections
            </button>
            <button
              onClick={() => scrollTo('catalog-section')}
              className="w-full text-left py-2 px-3 rounded-md hover:bg-red-50 hover:text-[#E51A24]"
            >
              👗 All Clothes (Mens, Ladies, Kids, Sarees)
            </button>
            <button
              onClick={() => scrollTo('size-customization-guide')}
              className="w-full text-left py-2 px-3 rounded-md hover:bg-red-50 hover:text-[#E51A24]"
            >
              📏 Size & Customization Guide
            </button>
            <button
              onClick={() => scrollTo('reviews-section')}
              className="w-full text-left py-2 px-3 rounded-md hover:bg-red-50 hover:text-[#E51A24]"
            >
              ⭐ Customer Reviews
            </button>
            <button
              onClick={() => scrollTo('location-section')}
              className="w-full text-left py-2 px-3 rounded-md hover:bg-red-50 hover:text-[#E51A24]"
            >
              📍 Showroom Location & Google Map
            </button>
          </div>

          <div className="pt-3 border-t border-stone-100 flex gap-2">
            <a
              href="tel:9455212218"
              className="flex-1 text-center py-2.5 bg-[#E51A24] text-white font-bold rounded-xl text-xs"
            >
              Call 9455212218
            </a>
            <a
              href="https://wa.me/919455212218"
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
