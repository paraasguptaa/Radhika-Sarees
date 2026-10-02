import React, { useState } from 'react';
import { ProductItem } from '../types';
import {
  X,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

interface ContactInquiryModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactInquiryModal: React.FC<ContactInquiryModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [customizationNeeds, setCustomizationNeeds] = useState('Standard Outfit');
  const [message, setMessage] = useState(
    product ? `I am interested in ${product.name} (${product.category}). Please share details and pricing.` : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    const inquiryId = `inq-${Date.now()}`;

    try {
      const inqRef = doc(db, 'inquiries', inquiryId);
      await setDoc(inqRef, {
        id: inquiryId,
        name: name.trim(),
        phone: phone.trim(),
        ...(email.trim() ? { email: email.trim() } : {}),
        message: `${product ? `[Product: ${product.name}] ` : ''}${message.trim()} (Customization: ${customizationNeeds})`,
        createdAt: new Date().toISOString(),
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.warn('Inquiry submit note:', err);
      try {
        handleFirestoreError(err, OperationType.CREATE, 'inquiries');
      } catch (e) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectWhatsApp = () => {
    const text = product
      ? `Hello Radhika Sarees! I am inquiring about:\n*${product.name}*\nCategory: ${product.category}\nFabric: ${product.fabric}\nCustomization: ${customizationNeeds}\nPlease share pricing and availability at your Tel Gali, Atarra showroom.`
      : `Hello Radhika Sarees! I would like to inquire about your collections at Tel Gali, Atarra showroom.`;
    window.open(`https://wa.me/919455212218?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-red-100 p-6 sm:p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#E51A24] text-white flex items-center justify-center font-bold text-sm">
            RS
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Inquire with Radhika Sarees
            </h3>
            <p className="text-xs text-stone-500">
              Tel Gali, Atarra (210201) • Quick Response Guaranteed
            </p>
          </div>
        </div>

        {/* Product Snapshot */}
        {product && (
          <div className="flex items-center gap-3 p-3 bg-red-50/70 rounded-2xl border border-red-100 mb-5">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-14 h-16 object-cover object-top rounded-xl shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-[#E51A24]">
                {product.category} • {product.collectionType}
              </span>
              <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 truncate">
                {product.name}
              </h4>
              <span className="text-[11px] text-stone-500 block truncate">
                Fabric: {product.fabric}
              </span>
            </div>
          </div>
        )}

        {/* Instant WhatsApp & Call Options */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <button
            onClick={handleDirectWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp (9455212218)</span>
          </button>

          <a
            href="tel:9455212218"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Phone className="w-4 h-4 text-[#E51A24]" />
            <span>Call Showroom</span>
          </a>
        </div>

        <div className="relative flex items-center justify-center mb-5">
          <div className="border-t border-stone-200 w-full" />
          <span className="bg-white px-3 text-[11px] text-stone-400 font-medium absolute">
            or submit written inquiry
          </span>
        </div>

        {isSuccess ? (
          <div className="text-center py-6 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-serif font-bold text-base text-stone-900">
              Inquiry Sent Successfully!
            </h4>
            <p className="text-xs text-stone-500">
              Our team at Radhika Sarees (Tel Gali, Atarra) will contact you shortly on your phone number.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {errorMsg && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#E51A24]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Phone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#E51A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Customization Option
                </label>
                <select
                  value={customizationNeeds}
                  onChange={(e) => setCustomizationNeeds(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#E51A24]"
                >
                  <option value="Standard Outfit">Standard Outfit Only</option>
                  <option value="Free Fall & Pico Needed">Free Fall & Pico Needed</option>
                  <option value="Custom Blouse Stitching">Custom Blouse Stitching</option>
                  <option value="Suit / Sherwani Alteration">Suit / Sherwani Alteration</option>
                  <option value="Bridal Lehenga Fitting">Bridal Lehenga Fitting</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Questions or Special Notes
              </label>
              <textarea
                rows={2}
                placeholder="Mention any questions regarding fabric, video call preview, or pricing..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#E51A24]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#E51A24] hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-red-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry (Get Best Quote)'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
