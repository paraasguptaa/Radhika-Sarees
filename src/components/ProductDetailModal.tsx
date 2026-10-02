import React, { useState } from 'react';
import { ProductItem } from '../types';
import {
  X,
  Star,
  Heart,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
  Scissors,
  Ruler,
  Sparkles,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: ProductItem) => void;
  onOpenInquiry: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onOpenInquiry,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);

  const handleWhatsApp = () => {
    const text = `Hello Radhika Sarees! I would like to inquire about:\n*${product.name}*\nCategory: ${product.category}\nCollection: ${product.collectionType}\nFabric: ${product.fabric}\nPlease share pricing and availability at your Tel Gali, Atarra showroom.`;
    window.open(`https://wa.me/919455212218?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-red-100 flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-red-50 text-stone-700 hover:text-[#E51A24] transition-colors shadow-md"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 bg-stone-50 p-6 flex flex-col justify-between">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-inner bg-white border border-stone-200">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 bg-[#E51A24] text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-xs">
                {product.tag}
              </span>
            )}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                isWishlisted
                  ? 'bg-[#E51A24] text-white'
                  : 'bg-white/90 text-stone-700 hover:text-[#E51A24]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === idx
                      ? 'border-[#E51A24] scale-105 shadow-sm'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Contact Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Category & Collection */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E51A24] bg-red-50 px-3 py-1 rounded-full">
                {product.category} • {product.collectionType}
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="flex text-amber-500">
                  {'★'.repeat(Math.round(product.rating))}
                </div>
                <span className="font-bold text-stone-800">{product.rating}</span>
                <span className="text-stone-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-stone-900 leading-snug">
                {product.name}
              </h2>
            </div>

            {/* Price Box - Price on Request */}
            <div className="bg-red-50/60 p-4 rounded-2xl border border-red-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 font-semibold uppercase block">
                  Showroom Pricing
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-[#E51A24]">
                  Price On Request (Best Weaver Rates)
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                  ✓ Available at Tel Gali, Atarra showroom
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Fabric:</span>
                <span className="font-bold text-stone-900 text-right">{product.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Workmanship:</span>
                <span className="font-bold text-stone-900 text-right">{product.work}</span>
              </div>
              {product.length && (
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Length & Blouse:</span>
                  <span className="font-bold text-stone-900 text-right">{product.length}</span>
                </div>
              )}
              {product.sizesAvailable && (
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Sizes Available:</span>
                  <span className="font-bold text-[#E51A24] text-right">
                    {product.sizesAvailable.join(', ')}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Wash Care:</span>
                <span className="font-bold text-stone-900 text-right">{product.washCare}</span>
              </div>
            </div>

            {/* Customization Services available */}
            <div>
              <span className="text-xs font-bold text-stone-800 block mb-1.5 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-[#E51A24]" />
                <span>Available Customization Options:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.customizationAvailable.map((opt, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-red-50 text-[#E51A24] border border-red-200 px-2.5 py-1 rounded-lg font-medium"
                  >
                    ✓ {opt}
                  </span>
                ))}
              </div>
              <a
                href="#size-customization-guide"
                onClick={onClose}
                className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-[#E51A24] font-semibold mt-2 underline"
              >
                <Ruler className="w-3 h-3" />
                <span>View Full Size & Measurement Guide</span>
              </a>
            </div>

          </div>

          {/* Action Buttons: Contact Us & WhatsApp */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry(product);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#E51A24] hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-500/25 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Us for Quote</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </button>
            </div>

            {/* Call Direct */}
            <div className="flex items-center justify-between text-xs text-stone-500 px-1">
              <span>Showroom Helpline:</span>
              <a
                href="tel:9455212218"
                className="font-bold text-stone-800 hover:text-[#E51A24]"
              >
                📞 9455212218 / 7607254842
              </a>
            </div>

            {/* Trust Assurances */}
            <div className="pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-[10px] text-stone-500">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#E51A24]" />
                <span>100% Genuine Fabric</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#E51A24]" />
                <span>Local & Pan-India Dispatch</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Sparkles className="w-4 h-4 text-[#E51A24]" />
                <span>Custom Alterations</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
