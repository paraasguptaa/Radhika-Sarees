import React from 'react';
import { BrandLogo } from './BrandLogo';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  Clock,
  ShieldCheck,
  Scissors,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-white pt-16 pb-12 border-t-4 border-[#E51A24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" textColor="text-white" />
            
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm mt-3">
              Radhika Sarees (Tel Gali, Atarra) is your trusted destination for complete family celebrations. Featuring royal bridal sarees, wedding lehengas, mens coat suits, groom sherwanis, blazers, ladies wear, and kids festive collections.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/radhikasareesatarra/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-pink-400 hover:bg-[#E51A24] hover:text-white transition-all shadow-sm"
                title="Instagram @radhikasareesatarra"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com/radhikasareesatarra"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-blue-400 hover:bg-[#E51A24] hover:text-white transition-all shadow-sm"
                title="Facebook Radhika Sarees Atarra"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919455212218"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-emerald-400 hover:bg-[#E51A24] hover:text-white transition-all shadow-sm"
                title="WhatsApp 9455212218"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Clothing Categories */}
          <div>
            <h4 className="font-serif font-bold text-sm text-amber-300 uppercase tracking-wider mb-3">
              Our Wardrobe
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#featured-collections" className="hover:text-white transition-colors">
                  Banarasi & Kanjeevaram Sarees
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-white transition-colors">
                  Bridal & Reception Lehengas
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-white transition-colors">
                  Mens Coat Suits & Blazers
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-white transition-colors">
                  Royal Groom Sherwanis
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-white transition-colors">
                  Ladies Anarkalis & Festive Suits
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-white transition-colors">
                  Kids Ethnic Festive Sets
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-amber-300 uppercase tracking-wider mb-3">
              Helpful Guides
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#featured-collections" className="hover:text-white transition-colors">
                  Featured Collections
                </a>
              </li>
              <li>
                <a href="#size-customization-guide" className="hover:text-white transition-colors">
                  Size & Measurement Guide
                </a>
              </li>
              <li>
                <a href="#size-customization-guide" className="hover:text-white transition-colors">
                  Fall Pico & Blouse Customization
                </a>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-white transition-colors">
                  Customer Testimonials
                </a>
              </li>
              <li>
                <a href="#location-section" className="hover:text-white transition-colors">
                  Google Maps Directions
                </a>
              </li>
              <li>
                <a href="#contact-section" className="hover:text-white transition-colors">
                  Contact Showroom
                </a>
              </li>
            </ul>
          </div>

          {/* Showroom Details */}
          <div>
            <h4 className="font-serif font-bold text-sm text-amber-300 uppercase tracking-wider mb-3">
              Visit Showroom
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E51A24] shrink-0 mt-0.5" />
                <span>
                  Tel Gali, Atarra, PIN <strong>210201</strong>, District Banda (UP)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E51A24] shrink-0" />
                <span>9455212218 / 7607254842</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E51A24] shrink-0" />
                <span className="break-all">radhikasareesatarra@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E51A24] shrink-0" />
                <span>10:00 AM – 9:30 PM (All 7 Days)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} <strong>Radhika Sarees</strong>. All rights reserved.
            <div className="text-[11px] text-stone-400 mt-0.5">
              Tel Gali, Atarra 210201, Uttar Pradesh • Sarees, Lehengas, Mens Suits, Sherwanis & Kids Wear
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Genuine Fabrics Guaranteed</span>
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <Scissors className="w-3.5 h-3.5" />
              <span>In-House Master Tailoring</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
