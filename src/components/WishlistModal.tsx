import React from 'react';
import { ProductItem } from '../types';
import { X, Heart, Trash2, Phone, MessageCircle } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: ProductItem[];
  onRemoveFromWishlist: (product: ProductItem) => void;
  onOpenInquiry: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveFromWishlist,
  onOpenInquiry,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-red-100 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-red-100 flex items-center justify-between bg-red-50/60">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#E51A24] fill-[#E51A24]" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              Saved Outfits & Wishlist
            </h3>
            <span className="text-xs text-stone-500 font-semibold">
              ({wishlistedProducts.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-stone-200 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs">
              <Heart className="w-12 h-12 mx-auto text-stone-200 mb-2" />
              <p className="font-bold text-sm text-stone-800">
                Your Wishlist is Empty
              </p>
              <p className="mt-1">
                Click the heart icon on any saree, suit, or sherwani to save it here for quick inquiry.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-stone-200 hover:border-red-200 bg-white gap-3"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  onClick={() => {
                    onQuickView(p);
                    onClose();
                  }}
                  className="w-16 h-20 object-cover object-top rounded-xl shrink-0 cursor-pointer"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-[#E51A24] font-bold uppercase">
                    {p.category} • {p.collectionType}
                  </span>
                  <h4
                    onClick={() => {
                      onQuickView(p);
                      onClose();
                    }}
                    className="font-serif font-bold text-xs text-stone-900 truncate hover:text-[#E51A24] cursor-pointer"
                  >
                    {p.name}
                  </h4>
                  <div className="text-xs font-bold text-[#E51A24] mt-1">
                    Contact For Best Price
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenInquiry(p);
                    }}
                    className="p-2.5 bg-red-50 text-[#E51A24] hover:bg-[#E51A24] hover:text-white rounded-xl text-xs font-bold transition-colors"
                    title="Inquire About This"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(p)}
                    className="p-2.5 text-stone-400 hover:text-red-600 rounded-xl transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
