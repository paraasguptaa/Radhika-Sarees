import React, { useState, useMemo } from 'react';
import { ProductItem, MainCategory, CollectionFilter } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface CatalogSectionProps {
  products: ProductItem[];
  searchQuery: string;
  wishlistIds: string[];
  onToggleWishlist: (product: ProductItem) => void;
  onOpenInquiry: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
}

const CATEGORIES: MainCategory[] = [
  'All',
  'Sarees',
  'Lehengas',
  'Mens Wear',
  'Coat Suits & Blazers',
  'Sherwani & Indo-Western',
  'Ladies Wear',
  'Kids Wear',
];

const COLLECTIONS: (CollectionFilter)[] = [
  'All',
  'New Arrivals',
  'Bridal Wear',
  'Festive Collection',
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  searchQuery,
  wishlistIds,
  onToggleWishlist,
  onOpenInquiry,
  onQuickView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>('All');
  const [selectedCollection, setSelectedCollection] = useState<CollectionFilter>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'reviews'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Main Category filter
        if (selectedCategory !== 'All') {
          if (selectedCategory === 'Mens Wear') {
            const isMens =
              p.category === 'Mens Wear' ||
              p.category === 'Coat Suits & Blazers' ||
              p.category === 'Sherwani & Indo-Western';
            if (!isMens) return false;
          } else if (p.category !== selectedCategory) {
            return false;
          }
        }

        // Collection Filter
        if (selectedCollection !== 'All' && p.collectionType !== selectedCollection) {
          return false;
        }

        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          const matchColor = p.color.toLowerCase().includes(q);
          const matchCollection = p.collectionType.toLowerCase().includes(q);
          return matchName || matchCategory || matchFabric || matchColor || matchCollection;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedCollection, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-16 sm:py-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-[#E51A24] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Family & Bridal Wardrobe</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Explore All Collections
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Radhika Sarees offers premium collections for the entire family: Sarees, Bridal Lehengas, Mens Coat Suits, Groom Sherwanis, Blazers, Ladies Suits, and Kids Festive Wear.
          </p>
        </div>

        {/* Main Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#E51A24] text-white shadow-md shadow-red-500/20'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-red-300 hover:text-[#E51A24]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub-Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-red-100/80 shadow-xs mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Occasion / Collection Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-stone-500 shrink-0">Collection:</span>
              {COLLECTIONS.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(col)}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                    selectedCollection === col
                      ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#E51A24]" />
                <span className="font-semibold hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#E51A24]"
                >
                  <option value="featured">Featured First</option>
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>

              <div className="text-xs font-bold text-stone-500 hidden md:block">
                Showing <strong>{filteredProducts.length}</strong> items
              </div>
            </div>

          </div>
        </div>

        {/* Search Notice */}
        {searchQuery && (
          <div className="mb-6 text-sm text-stone-600">
            Search results for <strong className="text-[#E51A24]">"{searchQuery}"</strong> ({filteredProducts.length} items found)
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onOpenInquiry={onOpenInquiry}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300 p-8 max-w-md mx-auto">
            <p className="text-stone-500 text-sm mb-4">
              No outfits found matching your selected filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedCollection('All');
              }}
              className="px-5 py-2.5 bg-[#E51A24] text-white text-xs font-bold rounded-full hover:bg-red-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
