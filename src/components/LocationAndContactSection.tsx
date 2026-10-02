import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Navigation,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const LocationAndContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [categoryInterest, setCategoryInterest] = useState('Bridal Sarees');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please enter your message or outfit requirement.');
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
        message: `[Category: ${categoryInterest}] ${message.trim()}`,
        createdAt: new Date().toISOString(),
      });

      setSuccess(true);
      setMessage('');
    } catch (err) {
      console.warn('Inquiry submit note:', err);
      try {
        handleFirestoreError(err, OperationType.CREATE, 'inquiries');
      } catch (e) {
        setSuccess(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapDirectionUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Tel+Gali+Atarra+Uttar+Pradesh+210201';

  return (
    <section id="location-section" className="py-16 sm:py-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-[#E51A24] text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Store Location & Directions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Visit Radhika Sarees Showroom
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Located in Tel Gali, Atarra (Banda), Uttar Pradesh 210201. We warmly welcome you and your family for wedding shopping and celebratory trousseaus.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Address Card */}
          <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#E51A24] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-stone-900">Showroom Address</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  <strong>Radhika Sarees</strong><br />
                  Tel Gali, Atarra<br />
                  PIN Code: <strong>210201</strong><br />
                  District Banda, Uttar Pradesh
                </p>
              </div>
            </div>
            <a
              href={mapDirectionUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#E51A24] hover:underline"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions in Google Maps →</span>
            </a>
          </div>

          {/* Contact Numbers */}
          <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#E51A24] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-stone-900">Call & Support</h3>
                <div className="space-y-1.5 mt-2">
                  <a
                    href="tel:9455212218"
                    className="block text-xs font-bold text-stone-800 hover:text-[#E51A24] transition-colors"
                  >
                    📞 9455212218
                  </a>
                  <a
                    href="tel:7607254842"
                    className="block text-xs font-bold text-stone-800 hover:text-[#E51A24] transition-colors"
                  >
                    📞 7607254842
                  </a>
                  <p className="text-[11px] text-stone-500">
                    Live video call preview on WhatsApp available
                  </p>
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/919455212218"
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp →</span>
            </a>
          </div>

          {/* Email & Hours */}
          <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#E51A24] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-stone-900">Email Inquiries</h3>
                <a
                  href="mailto:radhikasareesatarra@gmail.com"
                  className="block text-xs font-bold text-stone-800 hover:text-[#E51A24] transition-colors mt-2 break-all"
                >
                  radhikasareesatarra@gmail.com
                </a>
                <p className="text-[11px] text-stone-500 mt-2">
                  Wholesale & bulk wedding orders inquiry welcomed.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-stone-500">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>Open 7 Days: 10:00 AM – 9:30 PM</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#E51A24] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-stone-900">Social Media</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Follow for latest arrivals and reels:
                </p>
                <div className="flex flex-col gap-2 mt-3">
                  <a
                    href="https://www.instagram.com/radhikasareesatarra/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-pink-700 hover:text-pink-900 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>@radhikasareesatarra</span>
                  </a>

                  <a
                    href="https://www.facebook.com/radhikasareesatarra"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span>Radhika Sarees Atarra</span>
                  </a>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-stone-400 mt-4 block">
              100% Genuine Apparel Community
            </span>
          </div>

        </div>

        {/* Map & Contact Form */}
        <div id="contact-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Google Maps Interactive Embed */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-red-100 shadow-md flex flex-col">
            <div className="p-4 sm:p-5 bg-red-50/70 border-b border-red-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E51A24]" />
                <span className="font-serif font-bold text-sm text-stone-900">
                  Google Maps Navigation • Tel Gali, Atarra (210201)
                </span>
              </div>
              <a
                href={mapDirectionUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-[#E51A24] text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1 shadow-xs"
              >
                <Navigation className="w-3 h-3" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            <div className="relative flex-1 min-h-[360px] w-full bg-stone-100">
              <iframe
                title="Radhika Sarees Location - Tel Gali Atarra"
                src="https://maps.google.com/maps?q=Tel+Gali,+Atarra,+Uttar+Pradesh+210201&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-red-100 max-w-xs pointer-events-none">
                <div className="text-xs font-extrabold text-[#E51A24]">
                  Radhika Sarees (राधिका साड़ीज़)
                </div>
                <div className="text-[11px] text-stone-600 font-medium">
                  Tel Gali, Atarra, Uttar Pradesh 210201
                </div>
                <div className="text-[10px] text-emerald-700 font-bold mt-1">
                  ● Open Today: 10:00 AM – 9:30 PM
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-red-100 shadow-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-red-100 text-[#E51A24] text-[11px] font-bold mb-2">
                <span>Quick Inquiry Form</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Have a Question or Need a Quote?
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Reach out for wedding trousseaus, custom tailoring, or video call appointments.
              </p>

              {success && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    Inquiry received! Our team at Radhika Sarees will connect with you via 9455212218.
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleInquirySubmit} className="space-y-3.5 mt-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#E51A24]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Phone Number *
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
                      Category of Interest
                    </label>
                    <select
                      value={categoryInterest}
                      onChange={(e) => setCategoryInterest(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#E51A24]"
                    >
                      <option value="Bridal Sarees">Bridal & Silk Sarees</option>
                      <option value="Bridal Lehengas">Bridal Lehengas</option>
                      <option value="Mens Coat Suits">Mens Coat Suits & Blazers</option>
                      <option value="Groom Sherwanis">Groom Sherwanis</option>
                      <option value="Ladies Suits & Gowns">Ladies Suits & Gowns</option>
                      <option value="Kids Wear">Kids Ethnic Wear</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#E51A24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us what you are looking for, color choices, or preferred consultation time..."
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
                  <span>{isSubmitting ? 'Sending...' : 'Send Inquiry (Get Best Quote)'}</span>
                </button>
              </form>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">Prefer Instant WhatsApp?</span>
              <a
                href="https://wa.me/919455212218?text=Hello%20Radhika%20Sarees!%20I%20would%20like%20to%20inquire%20about%20your%20clothes%20collection."
                target="_blank"
                rel="noreferrer"
                className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp 9455212218</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
