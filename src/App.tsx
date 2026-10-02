import React, { useState, useEffect } from 'react';
import { ProductItem } from './types';
import { ALL_PRODUCTS } from './data/products';
import {
  auth,
  onAuthStateChanged,
  loginWithGoogle,
  logoutUser,
  User,
} from './firebase';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FeaturedCollections } from './components/FeaturedCollections';
import { TestimonialSlider } from './components/TestimonialSlider';
import { CatalogSection } from './components/CatalogSection';
import { SizeCustomizationGuide } from './components/SizeCustomizationGuide';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ContactInquiryModal } from './components/ContactInquiryModal';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationAndContactSection } from './components/LocationAndContactSection';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [products] = useState<ProductItem[]>(ALL_PRODUCTS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('radhika_wishlist');
      return saved ? JSON.parse(saved) : ['saree-01', 'saree-02', 'mens-01'];
    } catch {
      return ['saree-01', 'saree-02', 'mens-01'];
    }
  });

  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [inquiryProduct, setInquiryProduct] = useState<ProductItem | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Sync Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Sync Wishlist
  useEffect(() => {
    localStorage.setItem('radhika_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.warn('Google sign-in closed or failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleToggleWishlist = (product: ProductItem) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleOpenInquiry = (product: ProductItem | null = null) => {
    setInquiryProduct(product);
    setIsInquiryModalOpen(true);
  };

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] selection:bg-[#E51A24] selection:text-white pb-16 sm:pb-0">
      
      {/* Navbar with English Navigation & Contact Hotline */}
      <Navbar
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenContactModal={() => handleOpenInquiry(null)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner
          onExploreFeatured={() => {
            const el = document.getElementById('featured-collections');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreAllClothes={() => {
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenContact={() => handleOpenInquiry(null)}
        />

        {/* Featured Saree Collections: 'New Arrivals', 'Bridal Wear', 'Festive Collection' */}
        <FeaturedCollections
          products={products}
          onOpenInquiry={handleOpenInquiry}
          onQuickView={(p) => setSelectedProduct(p)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* Rotating Customer Testimonial Slider with Reviewer Initials */}
        <TestimonialSlider />

        {/* Complete Catalog: Mens Wear, Ladies Wear, Kids Wear, Sarees, Lehengas, Coat Suits, Sherwani, Blazers */}
        <CatalogSection
          products={products}
          searchQuery={searchQuery}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onOpenInquiry={handleOpenInquiry}
          onQuickView={(p) => setSelectedProduct(p)}
        />

        {/* Size & Customization Guide with Downloadable PDF Size Chart */}
        <SizeCustomizationGuide />

        {/* Real-time Customer Reviews & Feedback */}
        <ReviewsSection user={user} onLoginRequest={handleLogin} />

        {/* Store Location in Tel Gali Atarra, Interactive Google Maps & Contact Form */}
        <LocationAndContactSection />
      </main>

      {/* Footer in English */}
      <Footer />

      {/* Floating WhatsApp and Mobile Quick Bar */}
      <FloatingWhatsApp onOpenContactModal={() => handleOpenInquiry(null)} />

      {/* MODALS */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Contact Inquiry Modal */}
      <ContactInquiryModal
        product={inquiryProduct}
        isOpen={isInquiryModalOpen}
        onClose={() => {
          setIsInquiryModalOpen(false);
          setInquiryProduct(null);
        }}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onOpenInquiry={handleOpenInquiry}
        onQuickView={(p) => setSelectedProduct(p)}
      />

    </div>
  );
}
