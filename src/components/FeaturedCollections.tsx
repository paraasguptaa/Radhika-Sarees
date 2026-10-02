import React, { useState } from 'react';
import { ProductItem, CollectionFilter } from '../types';
import { Sparkles, MessageCircle, Phone, ArrowRight, Eye, ShieldCheck, Heart } from 'lucide-react';

interface FeaturedCollectionsProps {
  products: ProductItem[];
  onOpenInquiry: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: ProductItem) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  products,
  onOpenInquiry,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [activeTab, setActiveTab] = useState<CollectionFilter>('New Arrivals');

  const categories: { id: CollectionFilter; label: string; badge: string; desc: string }[] = [
    {
      id: 'New Arrivals',
      label: 'New Arrivals',
      badge: 'Season 2026',
      desc: 'Freshly unboxed handloom sarees, designer sheer organzas, and trending ethnic ensembles.',
    },
    {
      id: 'Bridal Wear',
      label: 'Bridal Wear',
      badge: 'Royal Trousseau',
      desc: 'Heirloom Banarasi Katan silk, pure Kanjeevaram pattu, and grand hand-embroidered wedding sarees.',
    },
    {
      id: 'Festive Collection',
      label: 'Festive Collection',
      badge: 'Auspicious Specials',
      desc: 'Radiant Jaipuri Bandhanis, pure Chanderi weaves, and celebratory partywear for festivals.',
    },
  ];

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];

  // Filter items matching the collection type (specifically sarees & lehengas)
  const collectionItems = products.filter(
    (p) => p.collectionType === activeTab && (p.category === 'Sarees' || p.category === 'Lehengas')
  );

  return (
    <section id="featured-collections" className="py-16 sm:py-20 bg-gradient-to-b from-[#FFFDF9] via-red-50/30 to-white border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-[#E51A24] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Showcase • Featured Saree Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Signature Saree Collections
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Explore handpicked masterpieces direct from master weaving clusters. Click any design to inquire on WhatsApp or speak directly with our Tel Gali, Atarra showroom.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-sm ${
                activeTab === cat.id
                  ? 'bg-[#E51A24] text-white shadow-lg shadow-red-500/25 scale-105'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-red-300 hover:text-[#E51A24]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === cat.id ? 'bg-white/20 text-white' : 'bg-red-50 text-[#E51A24]'
                }`}
              >
                {cat.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Description Banner */}
        <div className="bg-red-50/70 border border-red-100 rounded-2xl p-4 text-center max-w-2xl mx-auto mb-10 text-xs sm:text-sm text-stone-700 font-medium">
          {currentCategory.desc}
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collectionItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onQuickView(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-red-100/80 hover:border-red-300 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Badge */}
                <span className="absolute top-3.5 left-3.5 bg-[#E51A24] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {item.tag || item.collectionType}
                </span>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(item);
                  }}
                  className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                    wishlistIds.includes(item.id)
                      ? 'bg-[#E51A24] text-white'
                      : 'bg-white/90 text-stone-700 hover:text-[#E51A24]'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlistIds.includes(item.id) ? 'fill-white' : ''}`} />
                </button>

                {/* Fabric tag overlay */}
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] px-3 py-1 rounded-lg font-medium">
                  {item.fabric}
                </div>
              </div>

              {/* Information & Action Details */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span className="font-semibold text-[#E51A24]">{item.category}</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      ✓ In Stock at Atarra Showroom
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-lg sm:text-xl group-hover:text-[#E51A24] transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.customizationAvailable.slice(0, 2).map((custom, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium"
                      >
                        ✓ {custom}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions: Price Removed, Contact Us & Inquire Buttons */}
                <div className="pt-4 border-t border-stone-100 space-y-2">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-stone-500 font-semibold">Pricing & Availability:</span>
                    <span className="text-[#E51A24] font-bold text-xs uppercase tracking-wide">
                      Price on Request
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenInquiry(item);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-3 px-3 bg-[#E51A24] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-500/20"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Contact Us</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const msg = `Hello Radhika Sarees! I am interested in inquiring about:\n*${item.name}* (${item.collectionType})\nFabric: ${item.fabric}\nPlease share pricing and availability at your Tel Gali, Atarra showroom.`;
                        window.open(`https://wa.me/919455212218?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Local Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-600 bg-white border border-stone-200 px-5 py-2.5 rounded-full shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Looking for custom colors or bulk bridal trousseau? Call <strong>9455212218</strong> / <strong>7607254842</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
};
