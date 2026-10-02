import React from 'react';
import { MessageCircle, Phone, MapPin, Mail } from 'lucide-react';

interface FloatingWhatsAppProps {
  onOpenContactModal: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  onOpenContactModal,
}) => {
  return (
    <>
      {/* Floating WhatsApp Action Button for Desktop & Tablet */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-2 group">
        <span className="bg-stone-900 text-white text-xs px-3.5 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none font-medium">
          Ask on WhatsApp (9455212218)
        </span>
        <a
          href="https://wa.me/919455212218?text=Hello%20Radhika%20Sarees!%20I%20would%20like%20to%20inquire%20about%20your%20clothes%20collection."
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/30 transition-all hover:scale-110 active:scale-95 border-2 border-white"
          title="WhatsApp Radhika Sarees"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>

      {/* Bottom Sticky Action Bar for Mobile Screens in English */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-red-100 shadow-2xl px-3 py-2 flex items-center justify-between gap-2">
        <a
          href="tel:9455212218"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-stone-100 text-stone-900 font-bold text-xs rounded-xl"
        >
          <Phone className="w-3.5 h-3.5 text-[#E51A24]" />
          <span>Call Showroom</span>
        </a>

        <a
          href="https://wa.me/919455212218?text=Hello%20Radhika%20Sarees!%20I%20am%20interested%20in%20inquiring%20about%20your%20clothing%20collections."
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenContactModal}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#E51A24] text-white font-bold text-xs rounded-xl shadow-xs"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact Us</span>
        </button>
      </div>
    </>
  );
};
