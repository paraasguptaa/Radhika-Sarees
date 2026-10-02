import React from 'react';
import { ProductItem } from '../types';
import { Star, Heart, Eye, MessageCircle, Phone } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  isWishlisted: boolean;
  onToggleWishlist: (product: ProductItem) => void;
  onOpenInquiry: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenInquiry,
  onQuickView,
}) => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hello Radhika Sarees! I am interested in inquiring about:\n*${product.name}*\nCategory: ${product.category}\nFabric: ${product.fabric}\nPlease let me know the price and availability at your Tel Gali, Atarra store.`;
    window.open(`https://wa.me/919455212218?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-red-100/70 hover:border-red-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Tag */}
        {product.tag && (
          <span className="absolute top-2.5 left-2.5 bg-[#E51A24] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            {product.tag}
          </span>
        )}

        {/* Collection Pill */}
        <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
          {product.collectionType}
        </span>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-white text-stone-900 rounded-full hover:bg-[#E51A24] hover:text-white transition-all shadow-md transform hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute bottom-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isWishlisted
              ? 'bg-[#E51A24] text-white'
              : 'bg-white/90 text-stone-700 hover:text-[#E51A24]'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Fabric Tag Overlay */}
        <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
          {product.fabric.split(' ')[0]} {product.fabric.split(' ')[1] || ''}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 text-[11px] text-stone-500 mb-1">
            <span className="font-bold text-[#E51A24] uppercase tracking-wide">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-stone-800">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif font-bold text-stone-900 text-sm sm:text-base leading-snug group-hover:text-[#E51A24] transition-colors line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price Removed - Replaced with Contact for Price and Contact Buttons */}
        <div className="pt-2 border-t border-stone-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500 font-medium">Price:</span>
            <span className="text-[#E51A24] font-bold uppercase tracking-wider text-[11px]">
              Contact For Best Price
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenInquiry(product);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2 bg-red-50 hover:bg-[#E51A24] text-[#E51A24] hover:text-white rounded-xl text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-1 py-2 px-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-xl text-xs font-bold transition-colors"
              title="Inquire on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
