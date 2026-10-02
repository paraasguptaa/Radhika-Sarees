import React from 'react';
import { BrandLogo } from './BrandLogo';
import {
  Sparkles,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  MessageCircle,
  Scissors,
  ArrowRight,
} from 'lucide-react';

interface HeroBannerProps {
  onExploreFeatured: () => void;
  onExploreAllClothes: () => void;
  onOpenContact: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreFeatured,
  onExploreAllClothes,
  onOpenContact,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-red-50/40 to-white pt-8 pb-14 sm:pb-20 border-b border-red-100/60">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#E51A24_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Message */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Top Local Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100/90 border border-red-200 text-[#E51A24] text-xs font-bold tracking-wide shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#E51A24] animate-pulse" />
              <span>Tel Gali, Atarra (210201), Banda, Uttar Pradesh</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Premier Family Fashion & Bridal Destination at{' '}
              <span className="text-[#E51A24] underline decoration-amber-400 decoration-wavy decoration-2">
                Radhika Sarees
              </span>
            </h1>

            {/* Subtext highlighting all clothing categories */}
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Welcome to Atarra’s most trusted multi-category apparel house. We feature grand bridal & handloom <strong>Sarees</strong>, designer <strong>Lehengas</strong>, <strong>Mens Wear</strong> (Coat Suits, Sherwanis & Blazers), <strong>Ladies Wear</strong>, and festive <strong>Kids Wear</strong> at direct master-weaver values.
            </p>

            {/* Clothing Category Tags */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1 text-xs">
              {['Sarees', 'Bridal Lehengas', 'Coat Suits', 'Groom Sherwanis', 'Blazers', 'Ladies Wear', 'Kids Ethnic'].map((item) => (
                <span
                  key={item}
                  className="bg-white border border-stone-200 text-stone-800 font-semibold px-2.5 py-1 rounded-lg shadow-2xs"
                >
                  ✓ {item}
                </span>
              ))}
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-left">
              <div className="bg-white/80 p-3 rounded-2xl border border-red-100 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#E51A24] mb-1" />
                <div className="text-xs font-bold text-stone-900">100% Genuine Quality</div>
                <div className="text-[11px] text-stone-500">Pure silk & wool fabric</div>
              </div>

              <div className="bg-white/80 p-3 rounded-2xl border border-red-100 shadow-xs">
                <Scissors className="w-5 h-5 text-[#E51A24] mb-1" />
                <div className="text-xs font-bold text-stone-900">Custom Tailoring</div>
                <div className="text-[11px] text-stone-500">Fall pico, blouse & suit fit</div>
              </div>

              <div className="bg-white/80 p-3 rounded-2xl border border-red-100 shadow-xs">
                <Truck className="w-5 h-5 text-[#E51A24] mb-1" />
                <div className="text-xs font-bold text-stone-900">Doorstep Delivery</div>
                <div className="text-[11px] text-stone-500">Free across Atarra & Banda</div>
              </div>
            </div>

            {/* Action Buttons: Contact Us Prominent */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-3">
              <button
                onClick={onOpenContact}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#E51A24] hover:bg-red-700 text-white font-bold text-sm rounded-full shadow-lg shadow-red-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Showroom (Get Quotes)</span>
              </button>

              <button
                onClick={onExploreFeatured}
                className="flex items-center gap-2 px-5 py-3.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-sm rounded-full transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Featured Sarees</span>
              </button>

              <button
                onClick={onExploreAllClothes}
                className="flex items-center gap-1.5 px-4 py-3.5 text-stone-700 hover:text-[#E51A24] font-semibold text-sm transition-colors"
              >
                <span>Browse All Clothes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Contact Line */}
            <div className="pt-2 text-xs text-stone-500 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <span>Showroom Helpline: <strong className="text-stone-800">9455212218 / 7607254842</strong></span>
              <span>•</span>
              <a
                href="https://wa.me/919455212218"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Video Call Available</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Grid of Apparel with Circular Brand Logo Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Showcase Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-stone-100 group">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000"
                  alt="Radhika Sarees Atarra - Bridal and Family Collection"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Floating Brand Logo Badge in Logo Theme */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-xl border border-red-100 flex items-center gap-3">
                  <BrandLogo size="md" showText={false} />
                  <div>
                    <div className="text-xs font-black text-[#E31E24] uppercase tracking-wider">
                      Radhika Sarees
                    </div>
                    <div className="text-[10px] text-stone-600 font-semibold">
                      Tel Gali, Atarra (210201)
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-red-50 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#E51A24] tracking-wider">
                        Full Family Shopping
                      </span>
                      <h3 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                        Sarees, Suits, Sherwanis & Lehengas
                      </h3>
                    </div>
                    <button
                      onClick={onOpenContact}
                      className="px-3.5 py-1.5 bg-[#E51A24] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-red-700 transition-colors"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
